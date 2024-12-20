import React, { useState, useEffect } from "react";
import { initWeb3 } from "../lib/initWeb3";

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const loadCandidates = async () => {
      const { contract } = await initWeb3();
      try {
        const data = await contract.methods.getAllCandidates().call();
        setCandidates(data);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    loadCandidates();
  }, []);

  return (
    <div>
      <h1>Candidates List</h1>
      {candidates.map((candidate, index) => (
        <p key={index}>
          {candidate.name} - Votes: {candidate.voteCount}
        </p>
      ))}
    </div>
  );
};

export default Candidates;
