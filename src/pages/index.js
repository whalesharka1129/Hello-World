import React, { useState } from 'react';
import { initWeb3 } from '../lib/initWeb3';

export default function Home() {
  const [connectedAddress, setConnectedAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const connectToMetaMask = async () => {
    try {
      const { web3, accounts } = await initWeb3();
      if (accounts.length > 0) {
        setConnectedAddress(accounts[0]);
        setIsConnected(true);
      }
    } catch (error) {
      console.error("Error connecting to MetaMask", error);
    }
  };

  return (
    <div>
      <h1>Welcome to the Voting App</h1>
      {!isConnected ?
        <button onClick={connectToMetaMask}>Connect to MetaMask</button> :
        <p>Connected as {connectedAddress}</p>
      }
    </div>
  );
}
