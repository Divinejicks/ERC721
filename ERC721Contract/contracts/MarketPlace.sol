//SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

import "hardhat/console.sol";

contract MarketPlace is ReentrancyGuard, Ownable, IERC721Receiver {
    address payable public receiveFeeAccount;
    uint8 public listingFeePercentage = 10;
    uint256 public itemCount;

    struct Item {
        uint256 itemId;
        IERC721 nft;
        uint256 tokenId;
        uint256 price;
        address payable seller;
        bool sold;
        bool isOnSale;  
    }

    //itemId => Item
    mapping(uint256 => Item) public items;

    event CreatedItem(
        uint256 itemId,
        address indexed nft,
        uint256 tokenId,
        uint256 price,
        address indexed seller,
        bool indexed isOnSale
    ); 

    event BoughtItem(
        uint256 itemId,
        address indexed nft,
        uint256 tokenId,
        uint256 price,
        address indexed seller,
        bool isOnSale,
        address indexed buyer
    );

    event PlacedItemOnSale(
        uint256 itemId,
        address indexed nft,
        uint256 tokenId,
        uint256 price,
        address indexed seller,
        bool indexed isOnSale
    );

    constructor(){
        receiveFeeAccount = payable(msg.sender);
    }

    function createItem(IERC721 _nft, uint256 _tokenId, uint256 _price) external nonReentrant {
        require(_price > 0, "Price must be greater than zero");
        itemCount++;
        _nft.safeTransferFrom(msg.sender, address(this), _tokenId);

        items[itemCount] = Item(
            itemCount,
            _nft,
            _tokenId,
            _price,
            payable(msg.sender),
            false,
            false
        );

        emit CreatedItem(itemCount, address(_nft), _tokenId, _price, msg.sender, false);
    }

    function putItemOnSale(uint256 _itemId) external nonReentrant {
        Item storage _item = items[_itemId];
        require(!_item.isOnSale, "Item is already on sale");
        require(_item.seller == msg.sender, "You are not the owner");

        _item.isOnSale = true;
        emit PlacedItemOnSale(_itemId, address(_item.nft), _item.tokenId, _item.price,_item.seller, true);
    }

    function purchaseItem(uint256 _itemId) external payable nonReentrant {
        Item storage item = items[_itemId];
        require(_itemId > 0 && _itemId <= itemCount, "Item id does not exist");
        require(msg.value >= item.price, "Not enough ether");
        require(!item.sold, "Item already sold");
        require(item.isOnSale, "Item is not yet on sale");

        uint256 amountToSeller = (item.price*90)/100;
        uint256 amountToFeeAccount = (item.price*10)/100;

        (bool sentToSeller, ) = item.seller.call{value: amountToSeller}("");
        require(sentToSeller, "Failed to send ether to seller");
        (bool sendFeeAccount,) = receiveFeeAccount.call{value: amountToFeeAccount}("");
        require(sendFeeAccount, "Failed to send ether to fee account");

        item.sold = true;
        item.isOnSale = false;
        item.nft.safeTransferFrom(address(this), msg.sender, item.tokenId);
        item.seller = payable(msg.sender);
        emit BoughtItem(_itemId, address(item.nft), item.tokenId, item.price,item.seller, false, msg.sender);
    }

    function updateReceiveFeeAccount(address _address) external onlyOwner {
        receiveFeeAccount = payable(_address);
    } 

    function updateListingFeePercentage(uint8 _percent) external onlyOwner {
        listingFeePercentage = _percent;
    }

    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) public pure override returns (bytes4) {
        return this.onERC721Received.selector;
    }
}