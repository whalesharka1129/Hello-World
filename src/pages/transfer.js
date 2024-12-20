import React, { useState } from "react";
import { initWeb3 } from "../lib/initWeb3";

const TransferTokens = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const handleTransfer = async () => {
    const { web3, accounts, contract } = await initWeb3();
    try {
      await contract.methods.transferTokens(recipient, amount).send({ from: accounts[0] });
      alert("Tokens transferred successfully!");
    } catch (error) {
      alert("Transfer failed!");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Transfer Tokens</h1>
      <input type="text" placeholder="Recipient Address" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
      <input type="number" placeholder="Amount of Tokens" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button onClick={handleTransfer}>Transfer</button>
    </div>
  );
};

export default TransferTokens;
