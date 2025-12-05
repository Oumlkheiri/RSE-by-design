'use client';

import React from 'react';

interface GameOverModalProps {
  score: number;
  co2Saved: number;
  onRestart: () => void;
}

/**
 * Game over modal component with French text
 * Displays final score and restart option
 */
export function GameOverModal({ score, co2Saved, onRestart }: GameOverModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
      <div className="mx-4 w-full max-w-md rounded-2xl bg-gray-800 border border-gray-700 p-8 shadow-2xl">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Jeu Terminé
          </h2>
          <div className="mb-6 space-y-3">
            <div>
              <p className="mb-1 text-sm text-gray-400">Votre score final:</p>
              <p className="text-3xl font-bold text-blue-400">{score}</p>
            </div>
            <div>
              <p className="mb-1 text-sm text-gray-400">CO₂ Économisé:</p>
              <p className="text-3xl font-bold text-green-400">{co2Saved.toFixed(2)} kg</p>
            </div>
          </div>
          <button
            onClick={onRestart}
            className="w-full rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-blue-500 active:bg-blue-700 shadow-lg"
          >
            Rejouer
          </button>
        </div>
      </div>
    </div>
  );
}

