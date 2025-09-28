import { ethers } from "hardhat";

async function main() {
  console.log("Deploying FairDraw contract...");

  // Get the contract factory
  const FairDraw = await ethers.getContractFactory("FairDraw");

  // Set treasury address (replace with actual treasury address)
  const treasuryAddress = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"; // Example address

  // Deploy the contract
  const fairDraw = await FairDraw.deploy(treasuryAddress);

  await fairDraw.waitForDeployment();

  const contractAddress = await fairDraw.getAddress();

  console.log("FairDraw deployed to:", contractAddress);

  // Verify contract on BaseScan (if needed)
  if (process.env.BASESCAN_API_KEY) {
    console.log("Verifying contract on BaseScan...");
    try {
      await run("verify:verify", {
        address: contractAddress,
        constructorArguments: [treasuryAddress],
      });
      console.log("Contract verified successfully");
    } catch (error) {
      console.log("Contract verification failed:", error);
    }
  }

  // Save deployment info
  const deploymentInfo = {
    contractAddress,
    treasuryAddress,
    network: network.name,
    deployer: (await ethers.getSigners())[0].address,
    deployedAt: new Date().toISOString(),
  };

  console.log("Deployment info:", deploymentInfo);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

