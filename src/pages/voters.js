import React, { useState, useEffect } from "react";
import { initWeb3 } from "../lib/initWeb3";

const Voters = () => {
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    const loadVoters = async () => {
      const { contract } = await initWeb3();
      try {
        const data = await contract.methods.getAllVoters().call();
        setVoters(data);
      } catch (error) {
        console.error("Error fetching voters:", error);
      }
    };

    loadVoters();
  }, []);

  return (
    <div>
      <h1>Voters List</h1>
      {voters.map((voter, index) => (
        <p key={index}>
          Address: {voter.address} - Balance: {voter.tokenBalance} - Tokens Spent: {voter.tokensSpent}
        </p>
      ))}
    </div>
  );
};

export default Voters;
