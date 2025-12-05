'use client';

import React from 'react';
import { ITEM_TYPES } from '@/lib/utils';
import type { ItemType } from '@/lib/utils';

interface TypeButtonProps {
  type: ItemType;
  onClick: () => void;
  isDisabled?: boolean;
  isActive?: boolean;
}

/**
 * Button component for selecting item types
 * Displays French labels and keyboard shortcuts for each recycling type
 */
export function TypeButton({
  type,
  onClick,
  isDisabled = false,
  isActive = false,
}: TypeButtonProps) {
  const { label, color, key } = ITEM_TYPES[type];

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`
        flex flex-col items-center justify-center gap-1 rounded-xl border-2 px-6 py-4 
        md:px-8 md:py-5 font-semibold text-white transition-all duration-200 shadow-lg
        ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-110 hover:shadow-xl active:scale-95'}
        ${isActive ? 'ring-4 ring-offset-2 ring-offset-gray-900' : ''}
      `}
      style={{
        backgroundColor: color,
        borderColor: color,
        boxShadow: isActive 
          ? `0 0 0 4px ${color}40, 0 10px 25px -5px rgba(0, 0, 0, 0.5)` 
          : `0 10px 25px -5px rgba(0, 0, 0, 0.5)`,
      }}
    >
      {/* Keyboard shortcut badge - visible on all devices */}
      <span className="text-xs md:text-sm font-bold bg-white/20 px-2 py-1 rounded-md border border-white/30">
        {key}
      </span>
      <span className="text-lg md:text-xl font-bold">{label}</span>
    </button>
  );
}

