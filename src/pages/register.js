import React from "react";
import Web3 from "web3";
import { initWeb3 } from "../lib/initWeb3";

const Register = () => {
  const registerVoter = async () => {
    const { web3, accounts, contract } = await initWeb3();
    try {
      await contract.methods.registerVoter().send({ from: accounts[0] });
      alert("Registered successfully!");
    } catch (error) {
      alert("Registration failed!");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Register as a Voter</h1>
      <button onClick={registerVoter}>Register</button>
    </div>
  );
};

export default Register;
