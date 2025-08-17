import { CatFish } from './CatFish';
import { Fish } from './Fish';
import { Bubble } from './Bubble';
import { GameUI } from './GameUI';
import { SpecialEffects } from './SpecialEffects';
import Jellyfish from './Jellyfish';
import { useGameLogic } from '../hooks/useGameLogic';

export const GameArena = () => {
  const { gameState, gameAreaRef, restartGame } = useGameLogic();

  // Generate bubbles
  const bubbles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * window.innerWidth,
    y: window.innerHeight + Math.random() * 200,
    size: Math.random() * 20 + 10,
    delay: Math.random() * 4
  }));

  return (
    <div 
      ref={gameAreaRef}
      className="relative w-screen h-screen overflow-hidden bg-gradient-to-b from-ocean-surface via-ocean-mid to-ocean-deep"
      tabIndex={0}
    >
      {/* Ocean gradient background layers */}
      <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/80 via-transparent to-ocean-light/40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-ocean-light/20 via-transparent to-ocean-light/20 pointer-events-none" />
      
      {/* Animated bubbles */}
      {bubbles.map(bubble => (
        <Bubble 
          key={bubble.id}
          x={bubble.x}
          y={bubble.y}
          size={bubble.size}
          delay={bubble.delay}
        />
      ))}

      {/* Swimming fish */}
      {gameState.fish.map(fish => (
        <Fish
          key={fish.id}
          id={fish.id}
          x={fish.x}
          y={fish.y}
          size={fish.size}
          color={fish.color}
          speed={fish.speed}
        />
      ))}

      {/* Jellyfish - appears every minute */}
      {gameState.jellyfish && gameState.jellyfish.isActive && (
        <Jellyfish 
          x={gameState.jellyfish.x + gameState.jellyfish.size/2}
          y={gameState.jellyfish.y + gameState.jellyfish.size/2}
          size={gameState.jellyfish.size}
        />
      )}

      {/* Player 1 catfish */}
      <CatFish 
        x={gameState.player1.x}
        y={gameState.player1.y}
        size={gameState.player1.size}
        variant="orange"
      />

      {/* Player 2 catfish */}
      <CatFish 
        x={gameState.player2.x}
        y={gameState.player2.y}
        size={gameState.player2.size}
        variant="siamese"
      />

      {/* Special Effects */}
      <SpecialEffects 
        meowzartActive={gameState.player1.specialAbilityActive}
        meowzartX={gameState.player1.x}
        meowzartY={gameState.player1.y}
        meowzartSize={gameState.player1.size}
        meoweinsteinActive={gameState.player2.specialAbilityActive}
        fish={gameState.fish}
      />

      {/* Game UI */}
      <GameUI 
        player1={gameState.player1}
        player2={gameState.player2}
        onRestart={restartGame}
      />

      {/* Ocean floor decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-ocean-deep to-transparent">
        <div className="absolute bottom-2 left-1/4 w-16 h-8 bg-ocean-light rounded-full opacity-60"></div>
        <div className="absolute bottom-1 right-1/3 w-12 h-6 bg-ocean-light rounded-full opacity-40"></div>
        <div className="absolute bottom-3 left-1/2 w-8 h-4 bg-ocean-surface rounded-full opacity-50"></div>
      </div>
    </div>
  );
};