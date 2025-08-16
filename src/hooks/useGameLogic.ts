import { useState, useEffect, useCallback, useRef } from 'react';

interface Fish {
  id: string;
  x: number;
  y: number;
  size: number;
  color: 'orange' | 'yellow' | 'purple' | 'green' | 'coral';
  speed: number;
  direction: { x: number; y: number };
}

interface GameState {
  player1: {
    x: number;
    y: number;
    size: number;
    score: number;
    fishEaten: number;
    specialAbilityActive: boolean;
    specialAbilityEndTime: number;
    specialAbilityCooldown: number;
  };
  player2: {  
    x: number;
    y: number;
    size: number;
    score: number;
    fishEaten: number;
    specialAbilityActive: boolean;
    specialAbilityEndTime: number;
    specialAbilityCooldown: number;
  };
  fish: Fish[];
}

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    player1: {
      x: 200,
      y: 300,
      size: 60,
      score: 0,
      fishEaten: 0,
      specialAbilityActive: false,
      specialAbilityEndTime: 0,
      specialAbilityCooldown: 0
    },
    player2: {
      x: 600,
      y: 300,
      size: 60,
      score: 0,
      fishEaten: 0,
      specialAbilityActive: false,
      specialAbilityEndTime: 0,
      specialAbilityCooldown: 0
    },
    fish: []
  });

  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const keysPressed = useRef<Set<string>>(new Set());

  // Keyboard controls
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'r', '/'].includes(key)) {
      keysPressed.current.add(key);
      e.preventDefault();
      
      // Handle Meowzart's special ability
      if (key === 'r') {
        setGameState(prev => {
          const currentTime = Date.now();
          // Only activate if not already active and not on cooldown
          if (!prev.player1.specialAbilityActive && currentTime >= prev.player1.specialAbilityCooldown) {
            return {
              ...prev,
              player1: {
                ...prev.player1,
                specialAbilityActive: true,
                specialAbilityEndTime: currentTime + 5000, // 5 seconds
                specialAbilityCooldown: currentTime + 15000 // 15 second cooldown
              }
            };
          }
          return prev;
        });
      }
      
      // Handle Meoweinstein's special ability
      if (key === '/') {
        setGameState(prev => {
          const currentTime = Date.now();
          // Only activate if not already active and not on cooldown
          if (!prev.player2.specialAbilityActive && currentTime >= prev.player2.specialAbilityCooldown) {
            return {
              ...prev,
              player2: {
                ...prev.player2,
                specialAbilityActive: true,
                specialAbilityEndTime: currentTime + 5000, // 5 seconds
                specialAbilityCooldown: currentTime + 15000 // 15 second cooldown
              }
            };
          }
          return prev;
        });
      }
    }
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'r', '/'].includes(key)) {
      keysPressed.current.delete(key);
      e.preventDefault();
    }
  }, []);

  // Update both players' positions based on keyboard input
  const updatePlayersPosition = useCallback(() => {
    setGameState(prev => {
      let player1X = prev.player1.x;
      let player1Y = prev.player1.y;
      let player2X = prev.player2.x;
      let player2Y = prev.player2.y;
      const speed = 6.5;

      // Player 1 controls (WASD)
      if (keysPressed.current.has('a')) player1X -= speed;
      if (keysPressed.current.has('d')) player1X += speed;
      if (keysPressed.current.has('w')) player1Y -= speed;
      if (keysPressed.current.has('s')) player1Y += speed;

      // Player 2 controls (Arrow keys)
      if (keysPressed.current.has('arrowleft')) player2X -= speed;
      if (keysPressed.current.has('arrowright')) player2X += speed;
      if (keysPressed.current.has('arrowup')) player2Y -= speed;
      if (keysPressed.current.has('arrowdown')) player2Y += speed;

      // Keep both players within bounds
      const bounds = {
        minX: 30,
        maxX: window.innerWidth - 30,
        minY: 30,
        maxY: window.innerHeight - 30
      };

      player1X = Math.max(bounds.minX, Math.min(player1X, bounds.maxX));
      player1Y = Math.max(bounds.minY, Math.min(player1Y, bounds.maxY));
      player2X = Math.max(bounds.minX, Math.min(player2X, bounds.maxX));
      player2Y = Math.max(bounds.minY, Math.min(player2Y, bounds.maxY));

      return {
        ...prev,
        player1: { ...prev.player1, x: player1X, y: player1Y },
        player2: { ...prev.player2, x: player2X, y: player2Y }
      };
    });
  }, []);

  // Generate random fish
  const generateFish = useCallback((): Fish => {
    const colors: Fish['color'][] = ['orange', 'yellow', 'purple', 'green', 'coral'];
    const size = Math.random() * 40 + 20;
    const speed = Math.random() * 2 + 0.5;
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() > 0.5 ? -50 : window.innerWidth + 50,
      y: Math.random() * (window.innerHeight - 200) + 100,
      size,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed,
      direction: { 
        x: Math.random() > 0.5 ? -speed : speed, 
        y: (Math.random() - 0.5) * 0.5 
      }
    };
  }, []);

  // Check collision between both players and fish
  const checkCollisions = useCallback(() => {
    setGameState(prev => {
      let fishEatenByPlayer1 = 0;
      let fishEatenByPlayer2 = 0;

      const newFish = prev.fish.filter(fish => {
        // Check collision with Player 1 (Meowzart)
        const dx1 = fish.x + fish.size/2 - prev.player1.x;
        const dy1 = fish.y + fish.size/2 - prev.player1.y;
        const distance1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
        const collisionRadius1 = (prev.player1.size + fish.size) / 4;
        const canEatP1 = fish.size < prev.player1.size * 0.8;
        
        // Meowzart can't eat fish if Meoweinstein's ability is active
        const isProtectedFromMeowzart = prev.player2.specialAbilityActive && Date.now() <= prev.player2.specialAbilityEndTime;
        
        if (distance1 < collisionRadius1 && canEatP1 && !isProtectedFromMeowzart) {
          fishEatenByPlayer1++;
          return false; // Fish eaten by Player 1
        }

        // Check collision with Player 2 (Meoweinstein)
        const dx2 = fish.x + fish.size/2 - prev.player2.x;
        const dy2 = fish.y + fish.size/2 - prev.player2.y;
        const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        const collisionRadius2 = (prev.player2.size + fish.size) / 4;
        const canEatP2 = fish.size < prev.player2.size * 0.8;
        
        if (distance2 < collisionRadius2 && canEatP2) {
          fishEatenByPlayer2++;
          return false; // Fish eaten by Player 2
        }

        return true; // Keep this fish
      });
      
      return {
        ...prev,
        fish: newFish,
        player1: {
          ...prev.player1,
          score: prev.player1.score + fishEatenByPlayer1 * 10,
          fishEaten: prev.player1.fishEaten + fishEatenByPlayer1,
          size: prev.player1.size + fishEatenByPlayer1 * 2
        },
        player2: {
          ...prev.player2,
          score: prev.player2.score + fishEatenByPlayer2 * 10,
          fishEaten: prev.player2.fishEaten + fishEatenByPlayer2,
          size: prev.player2.size + fishEatenByPlayer2 * 2
        }
      };
    });
  }, []);

  // Game loop
  const gameLoop = useCallback(() => {
    // Update both players' positions based on keyboard input
    updatePlayersPosition();

    setGameState(prev => {
      // Check if special abilities should end
      const currentTime = Date.now();
      const shouldEndMeowzartAbility = prev.player1.specialAbilityActive && currentTime > prev.player1.specialAbilityEndTime;
      const shouldEndMeoweinsteinAbility = prev.player2.specialAbilityActive && currentTime > prev.player2.specialAbilityEndTime;
      
      // Move existing fish
      const updatedFish = prev.fish
        .map(fish => {
          // If Meowzart's special ability is active, make nearby fish follow him
          if (prev.player1.specialAbilityActive && !shouldEndMeowzartAbility) {
            const dx = fish.x + fish.size/2 - prev.player1.x;
            const dy = fish.y + fish.size/2 - prev.player1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const attractionRadius = prev.player1.size * 2; // Twice the body length
            
            if (distance < attractionRadius) {
              // Make fish follow Meowzart at the same speed
              const angle = Math.atan2(prev.player1.y - (fish.y + fish.size/2), prev.player1.x - (fish.x + fish.size/2));
              const followSpeed = 6.5; // Same speed as player movement
              
              return {
                ...fish,
                x: fish.x + Math.cos(angle) * followSpeed,
                y: fish.y + Math.sin(angle) * followSpeed
              };
            }
          }
          
          // Normal fish movement
          return {
            ...fish,
            x: fish.x + fish.direction.x,
            y: fish.y + fish.direction.y
          };
        })
        .filter(fish => fish.x > -100 && fish.x < window.innerWidth + 100); // Remove off-screen fish

      // Add new fish periodically
      const shouldAddFish = Math.random() < 0.02 && updatedFish.length < 15;
      const newFish = shouldAddFish ? [...updatedFish, generateFish()] : updatedFish;

      return {
        ...prev,
        fish: newFish,
        player1: shouldEndMeowzartAbility ? {
          ...prev.player1,
          specialAbilityActive: false,
          specialAbilityEndTime: 0
        } : prev.player1,
        player2: shouldEndMeoweinsteinAbility ? {
          ...prev.player2,
          specialAbilityActive: false,
          specialAbilityEndTime: 0
        } : prev.player2
      };
    });

    checkCollisions();
    animationFrameRef.current = requestAnimationFrame(gameLoop);
  }, [generateFish, checkCollisions, updatePlayersPosition]);

  // Initialize game
  useEffect(() => {
    // Add initial fish
    const initialFish = Array.from({ length: 8 }, () => generateFish());
    setGameState(prev => ({ ...prev, fish: initialFish }));

    // Add keyboard event listeners
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    // Start game loop
    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [generateFish, gameLoop, handleKeyDown, handleKeyUp]);

  // Restart game function
  const restartGame = useCallback(() => {
    // Clear any pressed keys
    keysPressed.current.clear();
    
    // Generate new initial fish
    const initialFish = Array.from({ length: 8 }, () => generateFish());
    
    // Reset game state to initial values with new fish
    setGameState({
      player1: {
        x: 200,
        y: 300,
        size: 60,
        score: 0,
        fishEaten: 0,
        specialAbilityActive: false,
        specialAbilityEndTime: 0,
        specialAbilityCooldown: 0
      },
      player2: {
        x: 600,
        y: 300,
        size: 60,
        score: 0,
        fishEaten: 0,
        specialAbilityActive: false,
        specialAbilityEndTime: 0,
        specialAbilityCooldown: 0
      },
      fish: initialFish
    });
  }, [generateFish]);

  return { gameState, gameAreaRef, restartGame };
};