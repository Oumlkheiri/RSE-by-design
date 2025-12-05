'use client';

import { useCallback } from 'react';
import { isCorrectSelection } from '@/lib/utils';
import type { ItemType } from '@/lib/utils';

interface UsePlayerActionsProps {
  currentItemType: ItemType | null;
  onCorrect: (itemType: ItemType) => void;
  onIncorrect: () => void;
  onMiss: () => void;
  isGameActive: boolean;
}

interface UsePlayerActionsReturn {
  handleItemClick: (selectedType: ItemType) => void;
}

/**
 * Custom hook handling player button clicks and evaluating correctness
 */
export function usePlayerActions({
  currentItemType,
  onCorrect,
  onIncorrect,
  onMiss,
  isGameActive,
}: UsePlayerActionsProps): UsePlayerActionsReturn {
  const handleItemClick = useCallback(
    (selectedType: ItemType) => {
      if (!isGameActive || currentItemType === null) {
        return;
      }

      const isCorrect = isCorrectSelection(selectedType, currentItemType);

      if (isCorrect) {
        onCorrect(currentItemType); // Pass the item type to the callback
      } else {
        onIncorrect();
      }
    },
    [currentItemType, onCorrect, onIncorrect, isGameActive]
  );

  return {
    handleItemClick,
  };
}

