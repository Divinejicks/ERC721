//SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "hardhat/console.sol";

contract NFTMarketPlace is ERC721URIStorage, Ownable {
    uint256 public tokenIdCount;

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

    constructor() ERC721("Jicks MToken", "JKSM") {
    }

    function mint(string memory _tokenURI) external returns (uint256) {
        tokenIdCount++;
        _safeMint(msg.sender, tokenIdCount);
        _setTokenURI(tokenIdCount, _tokenURI);
        return tokenIdCount;
    }
}