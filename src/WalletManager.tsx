import React from 'react';
import { usePrivy, useWallets } from '@privy-io/react-auth';

const WalletManager: React.FC = () => {
  const { login } = usePrivy();
  const { wallets } = useWallets();

  return (
    <div>
      <h2>Connected Wallets</h2>
      {wallets.map((wallet, index) => (
        <div key={wallet.address}>
          <p>Player {index + 1}: {wallet.address}</p>
          <button onClick={() => wallet.disconnect()}>Disconnect</button>
        </div>
      ))}
      {wallets.length < 2 && (
        <button onClick={login}>
          {wallets.length === 0 ? 'Connect Player 1 Wallet' : 'Connect Player 2 Wallet'}
        </button>
      )}
    </div>
  );
};

export default WalletManager;
