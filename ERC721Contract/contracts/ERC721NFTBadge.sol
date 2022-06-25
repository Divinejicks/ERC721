//SPDX-License-Identifier: MIT

//THIS NFT IS USE FOR GIVING OUT BADGES TO GRADUATING STUDENTS

pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract ERC721NFTBadge is ERC1155, Ownable, Pausable, ERC1155Supply {
    address[] public admins;
    mapping (address => bool) isAdmin;
    uint256 public price = 0.01 ether;
    string public name = "NFT Badge";

    constructor() ERC1155("https://gateway.pinata.cloud/ipfs/QmWWqSDGcqwxyDxyT8JwXN4kNgxCQ8g4iUSW39y3CCnJGf/{id}.json") {
        addAdmin(msg.sender);
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function pause() public onlyAdmin {
        _pause();
    }

    function unpause() public onlyAdmin {
        _unpause();
    }

    function setPrice(uint256 _price) external onlyAdmin {
        price = _price;
    }

    function uri(uint256 tokenId) override public pure returns(string memory) {
        return string(
            abi.encodePacked(
                "https://gateway.pinata.cloud/ipfs/QmWWqSDGcqwxyDxyT8JwXN4kNgxCQ8g4iUSW39y3CCnJGf/",
                Strings.toString(tokenId),
                ".json"
            )
        );
    }

    //This mints a particular nft to a list of addresses
    function sendBadge(address[] memory addresses, uint256 tokenId) external onlyAdmin {
        for(uint256 i = 0; i < addresses.length; i++) {
            address addr = addresses[i];
            _mint(addr, tokenId,1,"");
        }
    }

    function mintBadge(uint256 tokenId, uint256 amount) external payable whenNotPaused {
        require(msg.value >= price*amount, "Not enough Ether");
        _mint(msg.sender,tokenId,amount,"");
    }

    function addAdmin(address addr) public onlyOwner {
        admins.push(addr);
        isAdmin[addr] = true;
    }

    function removeAdmin(address addr) public onlyOwner {
        isAdmin[addr] = false;
    }

    //This function is needed for ERC1155Supply to work
    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        whenNotPaused
        override(ERC1155, ERC1155Supply)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    modifier onlyAdmin {
        require(isAdmin[msg.sender], "Only admin can do this");
        _;
    }

    function withdraw() external onlyOwner {
        (bool sent, ) = owner().call{value: address(this).balance}("");
        require(sent, "Failed to withdraw");
    }

    receive() external payable {}
    fallback() external payable {}
}