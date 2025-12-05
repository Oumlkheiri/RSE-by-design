'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { generateRandomItemType, hasReachedBottom } from '@/lib/utils';
import type { ItemType } from '@/lib/utils';

interface FallingItem {
  id: string;
  type: ItemType;
  position: number;
}

interface UseFallingItemReturn {
  currentItem: FallingItem | null;
  spawnNewItem: () => void;
  updateItemPosition: (speed: number, containerHeight: number) => void;
  removeItem: () => void;
  checkIfReachedBottom: (containerHeight: number, itemHeight: number) => boolean;
}

export const ITEM_HEIGHT = 104; // Height of falling items in pixels (80 * 1.3 for larger items)

/**
 * Custom hook managing the falling item state and movement
 * Ensures only one item falls at a time
 */
export function useFallingItem(): UseFallingItemReturn {
  const [currentItem, setCurrentItem] = useState<FallingItem | null>(null);
  const positionRef = useRef<number>(0);
  const currentItemRef = useRef<FallingItem | null>(null);
  const updateIntervalRef = useRef<number | undefined>(undefined);
  const UPDATE_THROTTLE = 16; // Update state every ~16ms (60fps)

  // Keep ref in sync with state
  useEffect(() => {
    currentItemRef.current = currentItem;
  }, [currentItem]);

  // Separate effect to update position state periodically using requestAnimationFrame
  useEffect(() => {
    if (currentItem === null) {
      if (updateIntervalRef.current) {
        cancelAnimationFrame(updateIntervalRef.current);
        updateIntervalRef.current = undefined;
      }
      return;
    }

    let lastUpdateTime = Date.now();
    
    // Update position state periodically for rendering
    const updatePosition = () => {
      const now = Date.now();
      if (now - lastUpdateTime >= UPDATE_THROTTLE) {
        if (currentItemRef.current !== null) {
          setCurrentItem((prev) => {
            if (!prev) return null;
            return {
              ...prev,
              position: positionRef.current,
            };
          });
        }
        lastUpdateTime = now;
      }
      
      if (currentItemRef.current !== null) {
        updateIntervalRef.current = requestAnimationFrame(updatePosition);
      }
    };

    updateIntervalRef.current = requestAnimationFrame(updatePosition);

    return () => {
      if (updateIntervalRef.current) {
        cancelAnimationFrame(updateIntervalRef.current);
      }
    };
  }, [currentItem?.id]); // Only restart when item changes

  // Spawn a new item at the top of the screen
  const spawnNewItem = useCallback(() => {
    if (currentItemRef.current !== null) {
      // Don't spawn if there's already an item falling
      return;
    }

    const newItem: FallingItem = {
      id: `item-${Date.now()}-${Math.random()}`,
      type: generateRandomItemType(),
      position: 0,
    };

    setCurrentItem(newItem);
    positionRef.current = 0;
  }, []);

  // Update the item's position based on speed (only updates ref, not state)
  const updateItemPosition = useCallback(
    (speed: number, containerHeight: number) => {
      if (currentItemRef.current === null) return;
      positionRef.current += speed;
    },
    []
  );

  // Remove the current item
  const removeItem = useCallback(() => {
    setCurrentItem(null);
    positionRef.current = 0;
    currentItemRef.current = null;
    if (updateIntervalRef.current) {
      clearInterval(updateIntervalRef.current);
      updateIntervalRef.current = undefined;
    }
  }, []);

  // Check if item has reached the bottom
  const checkIfReachedBottom = useCallback(
    (containerHeight: number, itemHeight: number): boolean => {
      if (currentItemRef.current === null) return false;
      return hasReachedBottom(
        positionRef.current,
        containerHeight,
        itemHeight
      );
    },
    []
  );

  return {
    currentItem,
    spawnNewItem,
    updateItemPosition,
    removeItem,
    checkIfReachedBottom,
  };
}

