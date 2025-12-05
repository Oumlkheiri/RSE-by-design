'use client';

import React from 'react';

interface ScoreBoardProps {
  score: number;
}

/**
 * Score display component with French label
 */
export function ScoreBoard({ score }: ScoreBoardProps) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl bg-gray-800/90 border border-gray-700 px-6 py-3 shadow-2xl backdrop-blur-sm">
      <span className="text-sm font-medium text-gray-400">Points</span>
      <span className="text-3xl font-bold text-white">{score}</span>
    </div>
  );
}

