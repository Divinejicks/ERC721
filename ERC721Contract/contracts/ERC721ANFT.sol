//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract ERC721ANFT is ERC721A, Ownable, Pausable {
    uint256 MAX_MINTS = 20;
    uint256 MAX_SUPPLY = 500;
    uint256 public mintRate = 0.01 ether;

    string public baseURI = "ipfs://QmZ6PoHDbg7LbNJ8NDywqcg5ywpFh3YVotNzx5iD5q1TyB/";

    constructor() ERC721A("Jicks_V2", "JKSV") {}

    function mint(uint256 quantity) external payable {
        // _safeMint's second argument now takes in a quantity, not a tokenId.
        require(quantity + _numberMinted(msg.sender) <= MAX_MINTS, "Exceeded the limit");
        require(totalSupply() + quantity <= MAX_SUPPLY, "Not enough tokens left");
        if(msg.sender != owner()) {
            require(msg.value >= (mintRate * quantity), "Not enough ether sent");
        }
        _safeMint(msg.sender, quantity);
    }

    function burn(uint256 tokenId) external onlyOwner {
        _burn(tokenId, true);
    }
    
    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function withdraw() external payable onlyOwner {
        (bool sent, ) = payable(owner()).call{value: address(this).balance}("");
        require(sent, "Failed to sent ether");
    }

    function numberOwnedByr(address addr) external view returns(uint256) {
        return _numberMinted(addr);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function _startTokenId() internal view override virtual returns (uint256) {
        return 1;
    }

    function setMintRate(uint256 _mintRate) public onlyOwner {
        mintRate = _mintRate;
    }

    receive() external payable {}
    fallback() external payable {}
}