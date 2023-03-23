const hardhat = require("hardhat");

async function main() {
  const ColabToken = await hardhat.ethers.getContractFactory('ColabToken');
  const token = await ColabToken.deploy();
  await token.deployed();

  console.log("Token contract deployed to:", token.address);
  saveData(token);
}

function saveData(contract) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../src/contracts";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/Token-address.json",
    JSON.stringify({ Token: contract.address }, undefined, 2)
  );

  const contractData = hardhat.artifacts.readArtifactSync("ColabToken"); 

  fs.writeFileSync(
    contractsDir + "/Token.json",
    JSON.stringify(contractData, null, 2)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});