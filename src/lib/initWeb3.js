import Web3 from "web3";

const tokenContractABI = require("../../artifacts/contracts/VotingToken.sol/VotingToken.json").abi;
const votingSystemABI = require("../../artifacts/contracts/VotingSystem.sol/VotingSystem.json").abi;
const VOTING_TOKEN_ADDRESS = "0xEBe127A4ECf9E63fa8443FC3d3f62DFCbC53685C";
const VOTING_SYSTEM_ADDRESS = "0x917735ebE7412A0D8b1E029FA0f1CdC6DFd7E060";

export const initWeb3 = async () => {
  let web3;
  try {
    if (window.ethereum) {
      // Use MetaMask's provider
      web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" }); // Request account access
    } else if (window.web3) {
      // Legacy dApp browsers
      web3 = new Web3(window.web3.currentProvider);
    } else {
      // Fallback to HTTP provider
      const provider = new Web3.providers.HttpProvider("https://sepolia.infura.io/v3/d22d784c785948c48ae6612ec916d028");
      web3 = new Web3(provider);
      console.log("Falling back to HTTP provider.");
    }

    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();

    if (networkId !== 11155111) { // Sepolia network ID
      console.error("Contract not deployed on current network.");
      return;
    }

    const tokenContract = new web3.eth.Contract(tokenContractABI, VOTING_TOKEN_ADDRESS);
    const votingSystemContract = new web3.eth.Contract(votingSystemABI, VOTING_SYSTEM_ADDRESS);

    return { web3, accounts, tokenContract, votingSystemContract };
  } catch (error) {
    console.error("Failed to load web3, accounts, or contracts. Check console for details.", error);
    throw new Error("Failed to load web3, accounts, or contracts.");
  }
};
