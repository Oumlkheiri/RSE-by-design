'use client';

import React, { useEffect, useRef, useCallback, useState } from 'react';
import { FallingItem } from './FallingItem';
import { TypeButton } from './TypeButton';
import { ScoreBoard } from './ScoreBoard';
import { Lives } from './Lives';
import { CO2Saved } from './CO2Saved';
import { GameOverModal } from './GameOverModal';
import { HelpButton } from './HelpButton';
import { useGameLoop } from '@/hooks/useGameLoop';
import { useFallingItem, ITEM_HEIGHT } from '@/hooks/useFallingItem';
import { usePlayerActions } from '@/hooks/usePlayerActions';
import { KEY_TO_ITEM_TYPE, getCO2Saved } from '@/lib/utils';
import type { ItemType } from '@/lib/utils';

/**
 * Main game container component
 * Orchestrates all game logic, rendering, and interactions
 */
export function GameContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const lastSpawnTimeRef = useRef<number>(Date.now() - 2000); // Initialize to allow immediate first spawn
  const SPAWN_INTERVAL = 2000; // 2 seconds between items

  const {
    gameState,
    speed,
    startGame,
    pauseGame,
    resumeGame,
    resetGame,
    incrementScore,
    addCO2Saved,
    decrementLives,
    setGameOver,
  } = useGameLoop();

  const [co2Notification, setCo2Notification] = useState<{ amount: number; visible: boolean } | null>(null);

  const {
    currentItem,
    spawnNewItem,
    updateItemPosition,
    removeItem,
    checkIfReachedBottom,
  } = useFallingItem();

  const handleMiss = useCallback(() => {
    removeItem();
    decrementLives();
  }, [removeItem, decrementLives]);

  const handleCorrect = useCallback((itemType: ItemType) => {
    // Calculate and add CO₂ savings
    const co2Amount = getCO2Saved(itemType);
    if (co2Amount > 0) {
      addCO2Saved(co2Amount);
      // Show notification
      setCo2Notification({ amount: co2Amount, visible: true });
      setTimeout(() => {
        setCo2Notification((prev) => prev ? { ...prev, visible: false } : null);
      }, 2000);
    }
    removeItem();
    incrementScore();
  }, [addCO2Saved, removeItem, incrementScore]);

  const handleIncorrect = useCallback(() => {
    removeItem();
    decrementLives();
  }, [removeItem, decrementLives]);

  const { handleItemClick } = usePlayerActions({
    currentItemType: currentItem?.type || null,
    onCorrect: handleCorrect,
    onIncorrect: handleIncorrect,
    onMiss: handleMiss,
    isGameActive: !gameState.isGameOver && !gameState.isPaused,
  });

  // Game loop - use refs to avoid dependency on currentItem
  const currentItemRef = useRef(currentItem);
  const speedRef = useRef(speed);
  
  useEffect(() => {
    currentItemRef.current = currentItem;
  }, [currentItem]);
  
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    if (gameState.isGameOver || gameState.isPaused) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const gameLoop = () => {
      const now = Date.now();
      const containerHeight = containerRef.current?.clientHeight || 600;

      // Spawn new item if enough time has passed and no item is falling
      if (
        currentItemRef.current === null &&
        now - lastSpawnTimeRef.current >= SPAWN_INTERVAL
      ) {
        spawnNewItem();
        lastSpawnTimeRef.current = now;
      }

      // Update falling item position
      if (currentItemRef.current) {
        updateItemPosition(speedRef.current, containerHeight);

        // Check if item reached bottom (missed)
        if (checkIfReachedBottom(containerHeight, ITEM_HEIGHT)) {
          handleMiss();
        }
      }

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    gameState.isGameOver,
    gameState.isPaused,
    spawnNewItem,
    updateItemPosition,
    checkIfReachedBottom,
    handleMiss,
  ]);

  // Initialize game on mount (only once) - starts paused
  const hasInitializedRef = useRef(false);
  useEffect(() => {
    if (!hasInitializedRef.current) {
      startGame(); // This sets up the game but keeps it paused
      hasInitializedRef.current = true;
    }
  }, [startGame]);

  // Keyboard shortcuts handler
  const handleItemClickRef = useRef(handleItemClick);
  useEffect(() => {
    handleItemClickRef.current = handleItemClick;
  }, [handleItemClick]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Don't handle keyboard if game is over or paused
      if (gameState.isGameOver || gameState.isPaused) {
        return;
      }

      const itemType = KEY_TO_ITEM_TYPE[event.key];
      if (itemType) {
        event.preventDefault();
        handleItemClickRef.current(itemType);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [gameState.isGameOver, gameState.isPaused]);

  // Handle game over - remove this effect as setGameOver is already called in decrementLives
  // The effect was causing unnecessary re-renders

  const handleRestart = () => {
    resetGame();
    lastSpawnTimeRef.current = Date.now() - 2000; // Allow immediate spawn on restart
  };

  const handleTogglePause = () => {
    if (gameState.isPaused) {
      resumeGame();
    } else {
      pauseGame();
    }
  };

  const itemTypes: ItemType[] = ['glass', 'plastic', 'paper', 'metal'];

  return (
<div
  className="fixed inset-0 flex h-screen w-screen flex-col items-center justify-center overflow-hidden"
  style={{
    background: `
      linear-gradient(
        to bottom,
        #0f3d2e 0%,
        #0e4b32 35%,
        #0a2a1f 100%
      )
    `,
    backgroundImage: `
      radial-gradient(circle at 20% 20%, rgba(255,255,255,0.05), transparent 60%),
      radial-gradient(circle at 80% 80%, rgba(255,255,255,0.04), transparent 70%),
      url('https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Green_leaf_icon.svg/1024px-Green_leaf_icon.svg.png')
    `,
    backgroundBlendMode: "overlay",
    backgroundSize: "cover",
    backdropFilter: "blur(2px)",
  }}
>

{/* Header with score, CO₂ saved, lives, and pause/play button */}
      <div className="absolute top-6 left-6 right-6 z-10 flex justify-between items-start">
        <div className="flex flex-col gap-3">
          <ScoreBoard score={gameState.score} />
          <CO2Saved co2Saved={gameState.co2Saved} />
        </div>
        <div className="flex flex-col items-center gap-4">
          {/* Pause/Play button */}
          <button
            onClick={handleTogglePause}
            disabled={gameState.isGameOver}
            className={`
              flex items-center justify-center gap-2 rounded-xl border-2 px-6 py-3 
              font-semibold text-white transition-all duration-200 shadow-lg
              ${gameState.isGameOver ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-105 hover:shadow-xl active:scale-95'}
            `}
            style={{
              backgroundColor: gameState.isPaused ? '#10B981' : '#EF4444',
              borderColor: gameState.isPaused ? '#10B981' : '#EF4444',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
            }}
          >
            {gameState.isPaused ? (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span className="text-sm md:text-base">Démarrer</span>
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
                <span className="text-sm md:text-base">Pause</span>
              </>
            )}
          </button>
          <Lives lives={gameState.lives} />
        </div>
      </div>

      {/* Game container - full screen */}
      <div
        ref={containerRef}
        className="relative h-full w-full overflow-hidden"
      >
        {/* Falling item */}
        {currentItem && (
          <FallingItem type={currentItem.type} position={currentItem.position} />
        )}

        {/* Bottom buttons */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-6 bg-linear-to-t from-black/90 via-gray-800/80 to-transparent p-8 pb-12">
          {itemTypes.map((type) => (
            <TypeButton
              key={type}
              type={type}
              onClick={() => handleItemClick(type)}
              isDisabled={gameState.isGameOver || gameState.isPaused}
            />
          ))}
        </div>
      </div>

      {/* CO₂ saved notification */}
      {co2Notification?.visible && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
          <div className="bg-green-500/90 backdrop-blur-sm text-white px-8 py-4 rounded-xl shadow-2xl border-2 border-green-400 animate-pulse">
            <div className="flex items-center gap-3">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              <div className="flex flex-col">
                <span className="text-sm font-medium">CO₂ Économisé!</span>
                <span className="text-2xl font-bold">+{co2Notification.amount.toFixed(2)} kg</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Game over modal */}
      {gameState.isGameOver && (
        <GameOverModal score={gameState.score} co2Saved={gameState.co2Saved} onRestart={handleRestart} />
      )}
    </div>
  );
}

