//SPDX-License-Identifier: MIT

//THIS NFT IS USE FOR GIVING OUT BADGES TO GRADUATING STUDENTS

pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721NFTBadge is ERC721Enumerable, Ownable {
    string baseURI;
    address[] public admins;
    mapping (address => bool) isAdmin;

    constructor(string memory _baseUri) ERC721("Jicks Badges", "JKSB") {
        setBaseUri(_baseUri);
        addAdmin(msg.sender);
    }

    //This mints a particular nft to a list of addresses
    function mint(address[] memory addresses, uint256 tokenId) external onlyAdmin {
        for(uint256 i = 0; i < addresses.length; i++) {
            address addr = addresses[i];
            _safeMint(addr, tokenId);
        }
    }

    function _baseURI() internal view virtual override returns(string memory) {
        return baseURI;
    }

    function setBaseUri(string memory _baseUri) public onlyOwner {
        baseURI = _baseUri;
    }

    function addAdmin(address addr) public onlyOwner {
        admins.push(addr);
        isAdmin[addr] = true;
    }

    function removeAdmin(address addr) public onlyOwner {
        isAdmin[addr] = false;
    }

    modifier onlyAdmin {
        require(isAdmin[msg.sender], "Only admin can do this");
        _;
    }
}