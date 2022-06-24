const { ethers } = require("hardhat");
const hre = require("hardhat");

const main = async () => {
    const ERC721Contract = await ethers.getContractFactory("ERC721Contract");
    const erc721Contract = ERC721Contract.deploy("ipfs://Qmd5B3KpkDG9sb8pyarzapHJWMZh1VNdMzURHheRQpt6Dt/", 
        "ipfs://QmYpQbzZtVu4ZGmjJiZYg2rgbXnQEGKSJj7F4M7a4oxCNG/hidden.json");
    
    (await erc721Contract).deployed();

    console.log("ERC721Contract deployed on ", (await erc721Contract).address);

    console.log("Sleeping.......");
    await sleep(400000);

    await hre.run("verify:verify", {
        address: (await erc721Contract).address,
        constructorArguments: ["ipfs://Qmd5B3KpkDG9sb8pyarzapHJWMZh1VNdMzURHheRQpt6Dt/", 
        "ipfs://QmYpQbzZtVu4ZGmjJiZYg2rgbXnQEGKSJj7F4M7a4oxCNG/hidden.json"],
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