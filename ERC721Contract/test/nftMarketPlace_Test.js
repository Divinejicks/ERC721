const { expect } = require("chai");
const { ethers } = require("hardhat");

const toWei = (num) => ethers.utils.parseEther(num.toString());
const fromWei = (num) => ethers.utils.formatEther(num);

describe('NFT Market place', () => {
    let deployer, addr1, addr2, addr3, nft, marketPlace;
    let URI = "Some URI";

    beforeEach(async () => {
        const NFTMarketPlace = await ethers.getContractFactory("NFTMarketPlace");
        nft = NFTMarketPlace.deploy();
        (await nft).deployed();

        const MarketPlace = await ethers.getContractFactory("MarketPlace");
        marketPlace = MarketPlace.deploy();
        (await marketPlace).deployed();
        
        [deployer, addr1, addr2, addr3] = await ethers.getSigners();
    });

    describe("Deployment", () => {
        it("It should get name and symbol", async () => {
            expect(await (await nft).name()).to.equal("Jicks MToken");
            expect(await (await nft).symbol()).to.equal("JKSM");
        });

        it("Should set receive fee account to deployer and update receive fee account", async () => {
            expect(await (await marketPlace).receiveFeeAccount()).to.equal(deployer.address);
            await ((await marketPlace).connect(deployer)).updateReceiveFeeAccount(addr1.address)
            expect(await (await marketPlace).receiveFeeAccount()).to.equal(addr1.address);
        });

        it("Should fail to update receive fee account if sender is not owner", async () => {
            await expect((await marketPlace).connect(addr1).updateReceiveFeeAccount(addr1.address))
                .to.revertedWith("Ownable: caller is not the owner");
        });

        it("should have listing fee percentage and should updagte it", async () => {
            expect(await (await marketPlace).listingFeePercentage()).to.equal(10);
            await ((await marketPlace).connect(deployer)).updateListingFeePercentage(20)
            expect(await (await marketPlace).listingFeePercentage()).to.equal(20);
        });

        it("Should fail to update listing fee percentage if sender is not owner", async () => {
            await expect((await marketPlace).connect(addr1).updateListingFeePercentage(1))
                .to.be.revertedWith("Ownable: caller is not the owner");
        });
    });

    describe("Mint NFT", () => {
        it("should mint nft", async () => {
            await (await nft).connect(addr1).mint(URI);
            expect(await (await nft).tokenIdCount()).to.equal(1);
            expect(await (await nft).tokenURI(1)).to.equal(URI);
            expect(await (await nft).balanceOf(addr1.address)).to.equal(1);

            await (await nft).connect(addr2).mint(URI);
            expect(await (await nft).tokenIdCount()).to.equal(2);
            expect(await (await nft).tokenURI(2)).to.equal(URI);
            expect(await (await nft).balanceOf(addr2.address)).to.equal(1);
        })
    })

    describe("Creating market place Item", () => {
        beforeEach(async () => {
            await (await nft).connect(addr1).mint(URI);
            await (await nft).connect(addr1).setApprovalForAll((await marketPlace).address, true); 
        });

        it("Should put NFT on marketplace and emit created item event", async () => {
            expect(await (await marketPlace).connect(addr1).createItem((await nft).address, 1))
                .to.emit(marketPlace, "CreatedItem")
                .withArgs(
                    1,
                    (await nft).address,
                    1,
                    toWei(0),
                    addr1.address,
                    false
                );

            //Check to see if the item is in the market place
            expect(await (await nft).ownerOf(1)).to.equal((await marketPlace).address);
            expect(await (await marketPlace).itemCount()).to.equal(1);

            //Get item from the Item struct and check the values
            const item = await (await marketPlace).items(1);
            expect(item.itemId).to.equal(1);
            expect(item.nft).to.equal((await nft).address);
            expect(item.tokenId).to.equal(1);
            expect(item.price).to.equal(toWei(0));
            expect(item.seller).to.equal(addr1.address);
            expect(item.sold).to.equal(false);
            expect(item.isOnSale).to.equal(false);
        });
    });

    describe("Put item on sale", () => {
        beforeEach(async () => {
            await (await nft).connect(addr1).mint(URI);
            await (await nft).connect(addr1).setApprovalForAll((await marketPlace).address, true); 
            await (await marketPlace).connect(addr1).createItem((await nft).address, 1);
        });

        it("Should put item on sale and emit Placed on sale event, Should fail if item is already on sale", async () => {

            console.log("await (await nft).ownerOf(1)", await (await nft).ownerOf(1))
            expect(await (await marketPlace).connect(addr1).putItemOnSale(1, toWei(5)))
             .to.emit(marketPlace, "PlacedItemOnSale")
             .withArgs(
                1,
                (await nft).address,
                1,
                toWei(5),
                addr1.address,
                true
             )

             expect((await (await marketPlace).items(1)).isOnSale).to.equal(true);
             //get the price
             expect((await (await marketPlace).items(1)).price).to.equal(toWei(5));
             //check for seller
             expect((await (await marketPlace).items(1)).seller).to.equal(addr1.address);

             await expect((await marketPlace).connect(addr1).putItemOnSale(1, toWei(5)))
            .to.be.revertedWith("Item is already on sale");
        } );

        it("Should fail when price is zero", async () => {
            await expect((await marketPlace).connect(addr1).putItemOnSale(1, 0))
            .to.be.revertedWith("Price must be greater than zero");
        } );

        it("Fail if seller is not the owner", async () => {
            await expect((await marketPlace).connect(addr3).putItemOnSale(1, toWei(5)))
            .to.be.revertedWith("You are not the owner");
        })
    })

    describe("Purchase market place item", () => {
        let price = 5;
        beforeEach(async () => {
            await (await nft).connect(addr1).mint(URI);
            await (await nft).connect(addr1).setApprovalForAll((await marketPlace).address, true); 
            await (await marketPlace).connect(addr1).createItem((await nft).address, 1);
            await (await marketPlace).connect(addr1).putItemOnSale(1, toWei(price));
        });

        it("Should update item as sold, send nft to buyer, pay the seller, pay listing fee to receive fee account, emit Bought event", async () => {
            const receiveFeeInitailAccountBal = await (await deployer).getBalance();
            const sellerInitialAccounBalt = await (await addr1).getBalance();

            //addr2 purchase item
            expect(await (await marketPlace).connect(addr2).purchaseItem(1, {value: toWei(price)}))
            .to.emit(marketPlace, "BoughtItem")
            .withArgs(
               1,
               (await nft).address,
               1,
               toWei(price),
               addr1.address,
               true,
               addr2.address
            );

            const receiveFeeFinalAccountBal = await (await deployer).getBalance();
            const sellerFinalAccountBal = await (await addr1).getBalance();
            
            const nintyPercent = (price*90)/100;
            expect(+fromWei(sellerFinalAccountBal)).to.equal(+nintyPercent + +fromWei(sellerInitialAccounBalt));

            const tenPercent = (price*10)/100;
            expect(+fromWei(receiveFeeFinalAccountBal)).to.equal(+tenPercent + +fromWei(receiveFeeInitailAccountBal));

            //checking the owner
            expect(await (await nft).ownerOf(1)).to.equal(addr2.address);
            //Checking is item is sold
            expect((await (await marketPlace).items(1)).sold).to.equal(true);
        });

        it("Should fail when id does not exist, price not enough, item already sold, item is not on sale", async () => {
            //try purchasing item with wrong id
            await expect((await marketPlace).connect(addr2).purchaseItem(3, {value: toWei(price)}))
            .to.be.revertedWith("Item id does not exist");
            //wrong id
            await expect((await marketPlace).connect(addr2).purchaseItem(0, {value: toWei(price)}))
            .to.be.revertedWith("Item id does not exist");
            //purchasing item with not enough ether
            await expect((await marketPlace).connect(addr2).purchaseItem(1, {value: toWei(2)}))
            .to.be.revertedWith("Not enough ether");
            //addr1 purchases item 1
            await (await marketPlace).connect(addr1).purchaseItem(1, {value: toWei(price)})
            //addr2 tries to purchase item 1 which is already purchased
            await expect((await marketPlace).connect(addr2).purchaseItem(1, {value: toWei(price)}))
            .to.be.revertedWith("Item already sold");

            //Create a second NFT
            await (await nft).connect(addr1).mint(URI);
            //Addr1 creates item 2
            await (await marketPlace).connect(addr1).createItem((await nft).address, 2);
            //addr2 tries purchasing the item when it is not yet on sale
            await expect((await marketPlace).connect(addr2).purchaseItem(2, {value: toWei(price)}))
            .to.be.revertedWith("Item is not yet on sale");
        })
    })
})