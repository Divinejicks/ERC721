const { ethers } = require("hardhat");
const hre = require("hardhat");

const main = async () => {
    const ERC721ANFT = await ethers.getContractFactory("ERC721ANFT");
    const erc721ANFT = ERC721ANFT.deploy();
    
    (await erc721ANFT).deployed();

    console.log("erc721ANFT deployed on ", (await erc721ANFT).address);

    console.log("Sleeping.......");
    await sleep(400000);

    await hre.run("verify:verify", {
        address: (await erc721ANFT).address,
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