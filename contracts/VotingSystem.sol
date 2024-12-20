// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./VotingToken.sol";
// For Remix to use 4.9.6
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.6/contracts/security/ReentrancyGuard.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.6/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VotingSystem is ReentrancyGuard, Ownable {
    VotingToken public token;

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    struct Voter {
        bool registered;
        uint tokenBalance;
        uint tokensSpent;
    }

    mapping(uint => Candidate) public candidates;
    uint public candidatesCount;
    mapping(address => Voter) public voters;

    constructor(address tokenAddress) {
        token = VotingToken(tokenAddress);
    }

    function registerVoter() public {
        require(!voters[msg.sender].registered, "Voter is already registered.");
        // Ensure that the voter is not already registered
        voters[msg.sender].registered = true;
        uint tokensToMint = 10 * 1e18;  // Define the number of tokens each voter receives upon registration

        // Mint new tokens for the voter and update their token balance
        token.mint(msg.sender, tokensToMint);
        voters[msg.sender].tokenBalance = tokensToMint; // Initialize the token balance
    }

    function addCandidate(string memory name) public onlyOwner {
        candidatesCount += 1;
        candidates[candidatesCount] = Candidate(candidatesCount, name, 0);
    }

    function transferTokens(address to, uint tokens) public {
        require(voters[msg.sender].registered, "Sender is not registered.");
        require(voters[to].registered, "Recipient is not registered.");
        require(voters[msg.sender].tokenBalance >= tokens, "Not enough tokens.");

        token.transferFrom(msg.sender, to, tokens);
        voters[msg.sender].tokenBalance -= tokens;
        voters[to].tokenBalance += tokens;
        voters[msg.sender].tokensSpent += tokens;
    }

    function vote(uint candidateId, uint tokens) public {
        require(voters[msg.sender].registered, "You must be registered to vote.");
        require(tokens > 0, "You need to vote with at least some tokens");
        require(token.balanceOf(msg.sender) >= tokens, "Not enough tokens");
        require(candidateId > 0 && candidateId <= candidatesCount, "Invalid candidate");

        token.transferFrom(msg.sender, address(this), tokens);
        candidates[candidateId].voteCount += tokens;
        voters[msg.sender].tokenBalance -= tokens;
        voters[msg.sender].tokensSpent += tokens;
    }

    function getWinner() public view returns (string memory) {
        uint highestVoteCount = 0;
        uint winningCandidateId;
        for (uint i = 1; i <= candidatesCount; i++) {
            if (candidates[i].voteCount > highestVoteCount) {
                highestVoteCount = candidates[i].voteCount;
                winningCandidateId = i;
            }
        }
        return candidates[winningCandidateId].name;
    }

    function getAllCandidates() public view returns (Candidate[] memory) {
        Candidate[] memory allCandidates = new Candidate[](candidatesCount);
        for (uint i = 1; i <= candidatesCount; i++) {
            Candidate storage candidate = candidates[i];
            allCandidates[i-1] = candidate;
        }
        return allCandidates;
    }

    function getAllVoters() public view returns (address[] memory, Voter[] memory) {
        address[] memory voterAddresses = new address[](candidatesCount);
        Voter[] memory voterDetails = new Voter[](candidatesCount);
        uint count = 0;

        // Assuming a mechanism to track all voter addresses if necessary
        for (uint i = 1; i <= candidatesCount; i++) {
            if (voters[voterAddresses[i-1]].registered) {
                voterAddresses[count] = voterAddresses[i-1];
                voterDetails[count] = voters[voterAddresses[i-1]];
                count++;
            }
        }

        return (voterAddresses, voterDetails);
    }
}