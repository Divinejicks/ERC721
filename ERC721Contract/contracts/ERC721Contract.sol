//SPDX-License-Identifier: MIT

//THIS CONTRACT IS USED WHEN DOING A HID AND REVEAL NFTS

pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721Contract is ERC721Enumerable, Ownable {
    using Strings for uint256;

    string baseURI;
    string public baseExtension = ".json";
    uint256 public price = 0.01 ether;
    bool public paused = true;
    bool public revealed = false;
    uint256 public maxSupply = 100; 
    uint256 public maxMintNumber = 2;
    string public nonRevealedUri;

    // Check out my ERC721-A to see how to mint more than one NFTs

    constructor(string memory _baseUri, string memory _notRevealedUri) ERC721("Jicks", "JKS") {
        setBaseUri(_baseUri);
        setNonRevealedUri(_notRevealedUri);
    }

    function _baseURI() internal view virtual override returns(string memory) {
        return baseURI;
    }

    function mint(uint256 quantity) public payable onlyWhenNotPaused {
        uint256 supply = totalSupply();
        require(quantity > 0, "Quantity to mint cannot be 0");
        require(quantity <= maxMintNumber, "Cannot mint more than allowed");
        require(supply + quantity < maxSupply, "Maximum number of Jicks Token mint");

        if(msg.sender != owner()) {
             require(msg.value >= price * quantity, "Not enough Ether");
        }

        for(uint256 i = 1; i <= quantity; i++ ) {
            _safeMint(msg.sender, supply + i);
        }
    }

    function tokenURI(uint256 tokenId) public view virtual override returns(string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        if(revealed == false) {
            return nonRevealedUri;
        }

        string  memory currentBaseUri = _baseURI();
        return bytes(currentBaseUri).length > 0 
            ? string(abi.encodePacked(currentBaseUri, tokenId.toString(), baseExtension))
            : "";
    }

    function pause(bool _value) external onlyOwner {
        paused = _value;
    }

    function reveal() external onlyOwner {
        revealed = true;
    }

    function setBaseUri(string memory _baseUri) public onlyOwner {
        baseURI = _baseUri;
    }

    function setNonRevealedUri(string memory _nonRevealedUri) public onlyOwner {
        nonRevealedUri = _nonRevealedUri;
    }

    function setPrice(uint256 amount) external onlyOwner {
        price = amount;
    }

    function setMaxMintNumber(uint256 number) external onlyOwner {
        maxMintNumber = number;
    }

    function withdraw() external onlyOwner {
        address _owner = owner();
        uint256 amount = address(this).balance;
        (bool sent,) = _owner.call{value: amount}("");
        require(sent, "Failed to send ether");
    }

    modifier onlyWhenNotPaused {
        require(!paused, "Contract is paused");
        _;
    }

    receive() external payable {}
    fallback() external payable {}
}