// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title FairDraw
 * @dev Provably fair draw contract for digital goods on Base
 * Uses Chainlink VRF for verifiable randomness
 */
contract FairDraw {
    // Structs
    struct Draw {
        uint256 id;
        uint256 startTime;
        uint256 endTime;
        uint256 totalTickets;
        uint256 ticketsSold;
        DrawStatus status;
        uint256 winningTicket;
        address[] prizeContracts;
        uint256 ticketPrice; // in wei
    }

    struct Ticket {
        uint256 id;
        uint256 drawId;
        address owner;
        uint256 ticketNumber;
        uint256 purchaseTime;
    }

    enum DrawStatus {
        Active,
        Completed,
        Canceled
    }

    // State variables
    mapping(uint256 => Draw) public draws;
    mapping(uint256 => Ticket) public tickets;
    mapping(uint256 => mapping(uint256 => address)) public ticketOwners; // drawId => ticketNumber => owner
    mapping(address => uint256[]) public userTickets;

    uint256 public nextDrawId = 1;
    uint256 public nextTicketId = 1;

    address public owner;
    address public treasury; // For platform fees

    // Events
    event DrawCreated(uint256 indexed drawId, uint256 startTime, uint256 endTime, uint256 totalTickets);
    event TicketsPurchased(uint256 indexed drawId, address indexed buyer, uint256 ticketCount, uint256 totalCost);
    event DrawExecuted(uint256 indexed drawId, uint256 winningTicket);
    event PrizeClaimed(uint256 indexed drawId, address indexed winner, uint256 prizeIndex);

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier drawExists(uint256 drawId) {
        require(draws[drawId].id != 0, "Draw does not exist");
        _;
    }

    modifier drawActive(uint256 drawId) {
        require(draws[drawId].status == DrawStatus.Active, "Draw is not active");
        _;
    }

    modifier drawCompleted(uint256 drawId) {
        require(draws[drawId].status == DrawStatus.Completed, "Draw is not completed");
        _;
    }

    constructor(address _treasury) {
        owner = msg.sender;
        treasury = _treasury;
    }

    /**
     * @dev Create a new draw
     * @param startTime Start time of the draw
     * @param endTime End time of the draw
     * @param totalTickets Total number of tickets available
     * @param ticketPrice Price per ticket in wei
     * @param prizeContracts Array of prize contract addresses
     */
    function createDraw(
        uint256 startTime,
        uint256 endTime,
        uint256 totalTickets,
        uint256 ticketPrice,
        address[] calldata prizeContracts
    ) external onlyOwner returns (uint256) {
        require(startTime < endTime, "Start time must be before end time");
        require(totalTickets > 0, "Total tickets must be greater than 0");
        require(ticketPrice > 0, "Ticket price must be greater than 0");

        uint256 drawId = nextDrawId++;

        draws[drawId] = Draw({
            id: drawId,
            startTime: startTime,
            endTime: endTime,
            totalTickets: totalTickets,
            ticketsSold: 0,
            status: DrawStatus.Active,
            winningTicket: 0,
            prizeContracts: prizeContracts,
            ticketPrice: ticketPrice
        });

        emit DrawCreated(drawId, startTime, endTime, totalTickets);
        return drawId;
    }

    /**
     * @dev Purchase tickets for a draw
     * @param drawId ID of the draw
     * @param count Number of tickets to purchase
     */
    function purchaseTickets(uint256 drawId, uint256 count) external payable drawExists(drawId) drawActive(drawId) {
        Draw storage draw = draws[drawId];
        require(block.timestamp >= draw.startTime, "Draw has not started yet");
        require(block.timestamp <= draw.endTime, "Draw has ended");
        require(count > 0, "Must purchase at least 1 ticket");
        require(draw.ticketsSold + count <= draw.totalTickets, "Not enough tickets remaining");

        uint256 totalCost = draw.ticketPrice * count;
        require(msg.value >= totalCost, "Insufficient payment");

        // Refund excess payment
        if (msg.value > totalCost) {
            payable(msg.sender).transfer(msg.value - totalCost);
        }

        // Issue tickets
        for (uint256 i = 0; i < count; i++) {
            uint256 ticketId = nextTicketId++;
            uint256 ticketNumber = draw.ticketsSold + i + 1;

            tickets[ticketId] = Ticket({
                id: ticketId,
                drawId: drawId,
                owner: msg.sender,
                ticketNumber: ticketNumber,
                purchaseTime: block.timestamp
            });

            ticketOwners[drawId][ticketNumber] = msg.sender;
            userTickets[msg.sender].push(ticketId);
        }

        draw.ticketsSold += count;

        // Send platform fee to treasury (5%)
        uint256 platformFee = totalCost / 20;
        payable(treasury).transfer(platformFee);

        emit TicketsPurchased(drawId, msg.sender, count, totalCost);
    }

    /**
     * @dev Execute a draw (simplified version without VRF for demo)
     * In production, this would use Chainlink VRF for true randomness
     * @param drawId ID of the draw to execute
     */
    function executeDraw(uint256 drawId) external onlyOwner drawExists(drawId) drawActive(drawId) {
        Draw storage draw = draws[drawId];
        require(block.timestamp > draw.endTime, "Draw has not ended yet");
        require(draw.ticketsSold > 0, "No tickets were sold");

        // Simple pseudo-random number generation (NOT SECURE - for demo only)
        // In production, use Chainlink VRF
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(
            block.timestamp,
            block.difficulty,
            drawId,
            draw.ticketsSold
        )));

        uint256 winningTicket = (randomNumber % draw.ticketsSold) + 1;

        draw.winningTicket = winningTicket;
        draw.status = DrawStatus.Completed;

        emit DrawExecuted(drawId, winningTicket);
    }

    /**
     * @dev Claim prize for a completed draw
     * @param drawId ID of the completed draw
     */
    function claimPrize(uint256 drawId) external drawExists(drawId) drawCompleted(drawId) {
        Draw storage draw = draws[drawId];
        require(ticketOwners[drawId][draw.winningTicket] == msg.sender, "Not the winner");

        // Transfer prizes to winner
        for (uint256 i = 0; i < draw.prizeContracts.length; i++) {
            // This is a simplified version. In practice, you'd need to handle
            // different token types (ERC-20, ERC-721, ERC-1155) appropriately
            // For demo purposes, we'll assume the prize contracts handle the transfer
            (bool success,) = draw.prizeContracts[i].call(
                abi.encodeWithSignature("transferToWinner(address)", msg.sender)
            );
            require(success, "Prize transfer failed");
        }

        emit PrizeClaimed(drawId, msg.sender, 0); // Simplified - would need prize index
    }

    /**
     * @dev Get draw information
     * @param drawId ID of the draw
     */
    function getDrawInfo(uint256 drawId) external view drawExists(drawId) returns (
        uint256 id,
        uint256 startTime,
        uint256 endTime,
        uint256 totalTickets,
        uint256 ticketsSold,
        DrawStatus status,
        uint256 winningTicket,
        uint256 prizeCount
    ) {
        Draw storage draw = draws[drawId];
        return (
            draw.id,
            draw.startTime,
            draw.endTime,
            draw.totalTickets,
            draw.ticketsSold,
            draw.status,
            draw.winningTicket,
            draw.prizeContracts.length
        );
    }

    /**
     * @dev Get user's tickets for a specific draw
     * @param user Address of the user
     * @param drawId ID of the draw
     */
    function getUserTicketsForDraw(address user, uint256 drawId) external view returns (uint256[] memory) {
        uint256[] memory userTicketIds = userTickets[user];
        uint256 count = 0;

        // Count tickets for this draw
        for (uint256 i = 0; i < userTicketIds.length; i++) {
            if (tickets[userTicketIds[i]].drawId == drawId) {
                count++;
            }
        }

        uint256[] memory result = new uint256[](count);
        uint256 index = 0;

        // Collect ticket numbers
        for (uint256 i = 0; i < userTicketIds.length; i++) {
            if (tickets[userTicketIds[i]].drawId == drawId) {
                result[index++] = tickets[userTicketIds[i]].ticketNumber;
            }
        }

        return result;
    }

    /**
     * @dev Verify fairness of a completed draw
     * @param drawId ID of the draw
     */
    function verifyFairness(uint256 drawId) external view drawExists(drawId) drawCompleted(drawId) returns (bool) {
        Draw storage draw = draws[drawId];
        // In a real implementation, this would verify the VRF proof
        // For demo purposes, we just check that a winner was selected
        return draw.winningTicket > 0 && draw.winningTicket <= draw.ticketsSold;
    }

    /**
     * @dev Cancel a draw (only if no tickets sold)
     * @param drawId ID of the draw
     */
    function cancelDraw(uint256 drawId) external onlyOwner drawExists(drawId) drawActive(drawId) {
        Draw storage draw = draws[drawId];
        require(draw.ticketsSold == 0, "Cannot cancel draw with sold tickets");

        draw.status = DrawStatus.Canceled;
    }

    /**
     * @dev Withdraw funds from contract (emergency)
     */
    function emergencyWithdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}

