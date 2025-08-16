interface Player {
  x: number;
  y: number;
  size: number;
  score: number;
  fishEaten: number;
  specialAbilityActive: boolean;
  specialAbilityEndTime: number;
  specialAbilityCooldown: number;
}

interface GameUIProps {
  player1: Player;
  player2: Player;
  onRestart: () => void;
}

export const GameUI = ({ player1, player2, onRestart }: GameUIProps) => {
  const currentTime = Date.now();
  
  // Calculate cooldown status for both players
  const player1CooldownRemaining = Math.max(0, player1.specialAbilityCooldown - currentTime);
  const player2CooldownRemaining = Math.max(0, player2.specialAbilityCooldown - currentTime);
  
  const player1AbilityTimeRemaining = Math.max(0, player1.specialAbilityEndTime - currentTime);
  const player2AbilityTimeRemaining = Math.max(0, player2.specialAbilityEndTime - currentTime);

  return (
    <>
      {/* Player 1 UI */}
      <div className="absolute top-4 left-4 z-30 text-foreground">
        <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 border border-border">
          <div className="space-y-2">
            <div className="text-lg font-bold text-orange-500">🎼 Meowzart (WASD)</div>
            <div className="text-xl font-bold">Score: {player1.score}</div>
            <div className="text-lg">Size: {Math.round(player1.size)}</div>
            <div className="text-sm text-muted-foreground">Fish eaten: {player1.fishEaten}</div>
            
            {/* Special ability status */}
            <div className="text-sm pt-2 border-t border-border">
              <div className="text-orange-400 font-semibold">♪ Charm Fish (R)</div>
              {player1.specialAbilityActive ? (
                <div className="text-green-400">
                  Active: {Math.ceil(player1AbilityTimeRemaining / 1000)}s
                </div>
              ) : player1CooldownRemaining > 0 ? (
                <div className="text-red-400">
                  Cooldown: {Math.ceil(player1CooldownRemaining / 1000)}s
                </div>
              ) : (
                <div className="text-green-400">Ready!</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Player 2 UI */}
      <div className="absolute top-4 right-4 z-30 text-foreground">
        <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 border border-border">
          <div className="space-y-2">
            <div className="text-lg font-bold text-blue-300">🧠 Meoweinstein (Arrows)</div>
            <div className="text-xl font-bold">Score: {player2.score}</div>
            <div className="text-lg">Size: {Math.round(player2.size)}</div>
            <div className="text-sm text-muted-foreground">Fish eaten: {player2.fishEaten}</div>
            
            {/* Special ability status */}
            <div className="text-sm pt-2 border-t border-border">
              <div className="text-blue-400 font-semibold">⚛️ Relatively Fishy (/)</div>
              {player2.specialAbilityActive ? (
                <div className="text-green-400">
                  Active: {Math.ceil(player2AbilityTimeRemaining / 1000)}s
                </div>
              ) : player2CooldownRemaining > 0 ? (
                <div className="text-red-400">
                  Cooldown: {Math.ceil(player2CooldownRemaining / 1000)}s
                </div>
              ) : (
                <div className="text-green-400">Ready!</div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Instructions */}
      <div className="absolute bottom-4 left-4 bg-card/60 backdrop-blur-sm rounded-lg p-3 border border-border max-w-sm">
        <div className="text-sm text-muted-foreground">
          <p>🐱🐟 Two Player Cat-Fish Game!</p>
          <p><span className="text-orange-500">Meowzart:</span> WASD keys + R for charm</p>
          <p><span className="text-blue-300">Meoweinstein:</span> Arrow keys + ? for protection</p>
          <p>Eat smaller fish to grow bigger and score points!</p>
        </div>
      </div>
      
      {/* Restart Button */}
      <div className="absolute bottom-4 right-4">
        <button
          onClick={onRestart}
          className="bg-destructive hover:bg-destructive/90 text-destructive-foreground px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl backdrop-blur-sm border border-border"
        >
          🔄 Restart Game
        </button>
      </div>
    </>
  );
};