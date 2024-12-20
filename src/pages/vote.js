import React, { useState } from "react";
import { initWeb3 } from "../lib/initWeb3";

const Vote = () => {
  const [candidateId, setCandidateId] = useState("");
  const [tokens, setTokens] = useState("");

  const handleVote = async () => {
    const { web3, accounts, contract } = await initWeb3();
    try {
      await contract.methods.vote(candidateId, tokens).send({ from: accounts[0] });
      alert("Vote successfully cast!");
    } catch (error) {
      alert("Voting failed!");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Vote for Candidate</h1>
      <input type="text" placeholder="Candidate ID" value={candidateId} onChange={(e) => setCandidateId(e.target.value)} />
      <input type="number" placeholder="Tokens to Vote" value={tokens} onChange={(e) => setTokens(e.target.value)} />
      <button onClick={handleVote}>Vote</button>
    </div>
  );
};

export default Vote;
