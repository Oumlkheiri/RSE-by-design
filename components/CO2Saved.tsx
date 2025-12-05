'use client';

import React from 'react';

interface CO2SavedProps {
  co2Saved: number;
}

/**
 * CO₂ savings display component with French label
 * Shows total CO₂ saved in kilograms
 */
export function CO2Saved({ co2Saved }: CO2SavedProps) {
  // Format CO₂ with 2 decimal places
  const formattedCO2 = co2Saved.toFixed(2);

  return (
    <div className="flex flex-col items-center gap-1 rounded-xl bg-gray-800/90 border border-gray-700 px-6 py-3 shadow-2xl backdrop-blur-sm">
      <span className="text-sm font-medium text-gray-400">CO₂ Économisé</span>
      <div className="flex items-center gap-1">
        <span className="text-2xl md:text-3xl font-bold text-green-400">{formattedCO2}</span>
        <span className="text-sm md:text-base font-medium text-gray-400">kg</span>
      </div>
    </div>
  );
}

