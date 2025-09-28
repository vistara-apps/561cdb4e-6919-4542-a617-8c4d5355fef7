# FairGazer API Documentation

## Overview

FairGazer is a Base MiniApp that provides provably fair draws for digital goods. This document outlines the APIs and integrations used in the application.

## Base Wallet API

### Purpose
Interact with the user's Base wallet for signing transactions, checking balances, and initiating transfers for ticket purchases.

### Integration
- **SDK**: `@coinbase/wallet-sdk`
- **Framework**: `wagmi` + `viem`
- **Network**: Base Mainnet

### Key Features
- Wallet connection and disconnection
- Balance checking
- Transaction signing
- Network switching to Base

### Usage Example
```typescript
import { useWallet } from '../hooks/useWallet'

function MyComponent() {
  const { address, isConnected, balance, connectWallet, disconnectWallet } = useWallet()

  // Connect to wallet
  const handleConnect = () => connectWallet('coinbaseWallet')

  // Check balance
  console.log('Balance:', balance, 'ETH')
}
```

### Endpoints
- **Connection**: Client-side wallet SDK interaction
- **Balance**: `eth_getBalance` RPC call
- **Transactions**: `eth_sendTransaction` RPC call

## Base RPC Endpoint

### Purpose
Deploy and interact with smart contracts for the draw engine and marketplace.

### Configuration
```typescript
const baseChain = {
  id: 8453,
  name: 'Base',
  network: 'base',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['https://mainnet.base.org'] },
    public: { http: ['https://mainnet.base.org'] },
  },
  blockExplorers: {
    default: { name: 'BaseScan', url: 'https://basescan.org' },
  },
}
```

### Smart Contract Integration
- **Framework**: Hardhat/Ethers.js
- **Language**: Solidity
- **Features**:
  - Provably fair random number generation
  - Ticket purchasing and management
  - Draw execution and prize distribution
  - Audit trail and transparency

### Contract Functions
```solidity
// Core contract interface
interface FairDraw {
    function purchaseTickets(uint256 drawId, uint256 count) external payable;
    function executeDraw(uint256 drawId) external;
    function claimPrize(uint256 drawId) external;
    function getDrawInfo(uint256 drawId) external view returns (Draw memory);
    function verifyFairness(uint256 drawId) external view returns (bool);
}
```

## Farcaster Identity Protocol

### Purpose
Verify user identity and potentially link Farcaster profiles for social primitives and identity verification.

### Integration
- **API**: Farcaster Hub API
- **Purpose**: Read-only operations for user profiles and casts
- **Authentication**: API key (if required)

### Endpoints
- **Base URL**: `https://api.farcaster.xyz`
- **User Profile**: `/v1/user?fid={fid}`
- **Casts**: `/v1/casts?fid={fid}`

### Usage
```typescript
// Get user profile
const profile = await fetch(`https://api.farcaster.xyz/v1/user?fid=${fid}`)

// Get user casts
const casts = await fetch(`https://api.farcaster.xyz/v1/casts?fid=${fid}`)
```

## Smart Contract Architecture

### FairDraw Contract

#### State Variables
```solidity
struct Draw {
    uint256 id;
    uint256 startTime;
    uint256 endTime;
    uint256 totalTickets;
    uint256 ticketsSold;
    uint256 status; // 0: active, 1: completed, 2: canceled
    uint256 winningTicket;
    address[] prizeContracts;
}

struct Ticket {
    uint256 id;
    uint256 drawId;
    address owner;
    uint256 ticketNumber;
    uint256 purchaseTime;
}
```

#### Key Functions
- `purchaseTickets(uint256 drawId, uint256 count)`: Buy tickets for a draw
- `executeDraw(uint256 drawId)`: Execute draw using VRF for randomness
- `claimPrize(uint256 drawId)`: Claim prize for winning ticket
- `getDrawInfo(uint256 drawId)`: Get draw details
- `verifyFairness(uint256 drawId)`: Verify draw fairness

### Marketplace Contract

#### Features
- NFT and token listings
- Prize pool management
- Redemption tracking
- Royalty distribution

## Security Considerations

### Provably Fair Implementation
1. **Random Number Generation**: Uses Chainlink VRF for verifiable randomness
2. **Commit-Reveal Scheme**: Prevents manipulation of draw outcomes
3. **On-chain Verification**: All draw results verifiable on-chain
4. **Audit Trail**: Complete history of all transactions and draws

### Wallet Security
- User controls their own keys
- Transactions require explicit user approval
- No private key storage on application side
- Secure RPC communication

## Error Handling

### Common Error Codes
- `INSUFFICIENT_FUNDS`: User doesn't have enough ETH for transaction
- `DRAW_NOT_ACTIVE`: Attempting to purchase tickets for inactive draw
- `INVALID_TICKET_COUNT`: Invalid number of tickets requested
- `DRAW_ALREADY_EXECUTED`: Draw has already been completed

### Error Response Format
```typescript
interface ApiError {
  code: string;
  message: string;
  details?: any;
}
```

## Rate Limiting

### RPC Calls
- Base RPC: 100 requests per second (may vary by provider)
- Farcaster API: Rate limited based on API key tier

### Smart Contract Interactions
- Gas-optimized functions to minimize transaction costs
- Batch operations where possible
- Efficient state management

## Deployment

### Environment Variables
```env
# Base RPC Configuration
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org

# Wallet Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id

# Farcaster API (if needed)
FARCASTER_API_KEY=your_api_key
```

### Build Process
1. Install dependencies: `npm install`
2. Build contracts: `npx hardhat compile`
3. Deploy contracts: `npx hardhat run scripts/deploy.ts --network base`
4. Build app: `npm run build`
5. Deploy to hosting platform

## Monitoring and Analytics

### Key Metrics
- Transaction success rate
- Draw participation rates
- Prize redemption rates
- User retention metrics

### Logging
- Transaction events
- Error occurrences
- User interactions
- Performance metrics

## Future Enhancements

### Planned Features
- Multi-chain support
- Advanced prize types (ERC-1155, etc.)
- Social features integration
- Mobile app companion
- Advanced analytics dashboard

### API Extensions
- Webhook notifications for draw results
- Bulk ticket purchasing
- Prize staking and delegation
- Governance voting mechanisms

