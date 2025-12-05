'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { calculateSpeed } from '@/lib/utils';
import type { ItemType } from '@/lib/utils';

interface GameState {
  co2Saved: number;
  score: number;
  lives: number;
  isGameOver: boolean;
  isPaused: boolean;
}

interface UseGameLoopReturn {
  gameState: GameState;
  speed: number;
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  resetGame: () => void;
  incrementScore: () => void;
  addCO2Saved: (amount: number) => void;
  decrementLives: () => void;
  setGameOver: () => void;
}

const INITIAL_LIVES = 3;
const INITIAL_SCORE = 0;
const INITIAL_CO2 = 0;

/**
 * Custom hook managing the main game loop, state, and timing
 */
export function useGameLoop(): UseGameLoopReturn {
  const [gameState, setGameState] = useState<GameState>({
    score: INITIAL_SCORE,
    lives: INITIAL_LIVES,
    co2Saved: INITIAL_CO2,
    isGameOver: false,
    isPaused: true, // Start paused by default
  });

  const [speed, setSpeed] = useState(2);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Update speed based on score
  useEffect(() => {
    if (!gameState.isGameOver && !gameState.isPaused) {
      const newSpeed = calculateSpeed(gameState.score);
      setSpeed(newSpeed);
    }
  }, [gameState.score, gameState.isGameOver, gameState.isPaused]);

  const startGame = useCallback(() => {
    setGameState({
      score: INITIAL_SCORE,
      lives: INITIAL_LIVES,
      co2Saved: INITIAL_CO2,
      isGameOver: false,
      isPaused: false,
    });
    setSpeed(2);
  }, []);

  const pauseGame = useCallback(() => {
    setGameState((prev) => ({ ...prev, isPaused: true }));
  }, []);

  const resumeGame = useCallback(() => {
    setGameState((prev) => ({ ...prev, isPaused: false }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      score: INITIAL_SCORE,
      lives: INITIAL_LIVES,
      co2Saved: INITIAL_CO2,
      isGameOver: false,
      isPaused: false,
    });
    setSpeed(2);
  }, []);

  const incrementScore = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      score: prev.score + 10, // Increased from 1 to 10 for better scoring
    }));
  }, []);

  const addCO2Saved = useCallback((amount: number) => {
    if (amount > 0) {
      setGameState((prev) => ({
        ...prev,
        co2Saved: prev.co2Saved + amount,
      }));
    }
  }, []);

  const decrementLives = useCallback(() => {
    setGameState((prev) => {
      const newLives = prev.lives - 1;
      return {
        ...prev,
        lives: newLives,
        isGameOver: newLives <= 0,
      };
    });
  }, []);

  const setGameOver = useCallback(() => {
    setGameState((prev) => ({ ...prev, isGameOver: true, isPaused: true }));
  }, []);

  return {
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
  };
}

