// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VotingToken is ERC20, Ownable {
    constructor() ERC20("VotingToken", "VOTE") {}

    // Mint function that allows new tokens to be created and assigned to an address
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
