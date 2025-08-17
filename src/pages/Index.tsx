import { GameArena } from '../components/GameArena';
import WalletManager from '../WalletManager';

const Index = () => {
  return (
    <div>
      <header className="p-4 bg-gray-800 text-white">
        <h1 className="text-2xl font-bold">CatFish Game</h1>
        <p>Connect two wallets to start the game.</p>
      </header>
      <main className="p-4">
        <WalletManager />
        <GameArena />
      </main>
    </div>
  );
};

export default Index;