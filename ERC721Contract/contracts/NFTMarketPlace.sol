//SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";

import "hardhat/console.sol";

contract NFTMarketPlace is ERC721URIStorage, Ownable, ERC2981 {
    uint256 public tokenIdCount;

    constructor() ERC721("Jicks MToken", "JKSM") {
        setDefaultRoyalty(msg.sender, 200);
    }

    function mint(string memory _tokenURI) external returns (uint256) {
        tokenIdCount++;
        _safeMint(msg.sender, tokenIdCount);
        _setTokenURI(tokenIdCount, _tokenURI);
        return tokenIdCount;
    }

    function setDefaultRoyalty(address _receiver, uint96 _feeNumerator) public onlyOwner {
      _setDefaultRoyalty(_receiver, _feeNumerator);
    } 

    function royaltyInfo(uint256 tokenId, uint256 salePrice)
    public
    view
    override
    returns (address, uint256)
    {
        require(_exists(tokenId), "Requested royalty for non-existing token.");
        return super.royaltyInfo(tokenId, salePrice);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC2981, ERC721)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}