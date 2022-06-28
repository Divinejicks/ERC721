const { ethers } = require("hardhat");
const hre = require("hardhat");

const main = async () => {
    const MarketPlace = await ethers.getContractFactory("MarketPlace");
    const marketPlace = MarketPlace.deploy();
    
    (await marketPlace).deployed();

    console.log("marketPlace deployed on ", (await marketPlace).address);

    // console.log("Sleeping.......");
    // await sleep(400000);

    // await hre.run("verify:verify", {
    //     address: (await nftMarketPlace).address,
    //     constructorArguments: [],
    // });
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