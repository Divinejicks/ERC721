const { ethers } = require("hardhat");
const hre = require("hardhat");

const main = async () => {
    const ERC721NFTBadge = await ethers.getContractFactory("ERC721NFTBadge");
    const erc721NFTBadge = ERC721NFTBadge.deploy("ipfs://QmZYALePkpwo21iCAS936JyDUAwEzgFxx8kchfPh18Ec6L/");
    
    (await erc721NFTBadge).deployed();

    console.log("erc721NFTBadge deployed on ", (await erc721NFTBadge).address);

    console.log("Sleeping.......");
    await sleep(400000);

    await hre.run("verify:verify", {
        address: (await erc721NFTBadge).address,
        constructorArguments: ["ipfs://QmZYALePkpwo21iCAS936JyDUAwEzgFxx8kchfPh18Ec6L/"],
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