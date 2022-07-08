const { ethers } = require("hardhat");
const hre = require("hardhat");

const main = async () => {
    const NFTMarketPlace = await ethers.getContractFactory("NFTMarketPlace");
    const nftMarketPlace = NFTMarketPlace.deploy();
    
    (await nftMarketPlace).deployed();

    console.log("nftMarketPlace deployed on ", (await nftMarketPlace).address);

    console.log("Sleeping.......");
    await sleep(400000);

    await hre.run("verify:verify", {
        address: (await nftMarketPlace).address,
        constructorArguments: [],
    });
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

main()
.then(() => process.exit(0))
.catch(error => {
    console.log(error);
    process.exit(1);
})