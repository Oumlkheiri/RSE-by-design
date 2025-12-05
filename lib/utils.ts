/**
 * Game utility functions for the Recycling Reaction Game
 */

// Item types in the game
export type ItemType = 'glass' | 'plastic' | 'paper' | 'metal';

// Item type configuration with French labels, keyboard shortcuts, and CO₂ savings (in grams)
export const ITEM_TYPES: Record<ItemType, { label: string; color: string; key: string; co2Saved: number }> = {
  glass: { label: 'Verre', color: '#60A5FA', key: 'V', co2Saved: 0.3 }, // 0.3 kg CO₂ per glass bottle
  plastic: { label: 'Plastique', color: '#F87171', key: 'L', co2Saved: 0.15 }, // 0.15 kg CO₂ per plastic bottle
  paper: { label: 'Papier', color: '#FBBF24', key: 'P', co2Saved: 0.8 }, // 0.8 kg CO₂ per kg of paper
  metal: { label: 'Métal', color: '#A78BFA', key: 'M', co2Saved: 0.5 }, // 0.5 kg CO₂ per aluminum can
};

/**
 * Gets the CO₂ savings for a specific item type
 * @param itemType - The type of item being recycled
 * @returns CO₂ saved in kilograms
 */
export function getCO2Saved(itemType: ItemType): number {
  return ITEM_TYPES[itemType].co2Saved;
}

// Keyboard shortcut to item type mapping
export const KEY_TO_ITEM_TYPE: Record<string, ItemType> = {
  v: 'glass',
  V: 'glass',
  l: 'plastic',
  L: 'plastic',
  p: 'paper',
  P: 'paper',
  m: 'metal',
  M: 'metal',
};

/**
 * Generates a random item type
 */
export function generateRandomItemType(): ItemType {
  const types: ItemType[] = ['glass', 'plastic', 'paper', 'metal'];
  return types[Math.floor(Math.random() * types.length)];
}

/**
 * Calculates the falling speed based on the current score
 * Speed increases gradually as score increases
 * @param score - Current game score
 * @returns Speed in pixels per frame (higher = faster)
 */
export function calculateSpeed(score: number): number {
  // Base speed: 2 pixels per frame
  // Increases by 0.1 for every 10 points
  const baseSpeed = 2;
  const speedIncrease = Math.floor(score / 10) * 0.1;
  const maxSpeed = 8; // Cap the maximum speed
  return Math.min(baseSpeed + speedIncrease, maxSpeed);
}

/**
 * Checks if an item has reached the bottom of the screen
 * @param itemPosition - Current Y position of the item
 * @param containerHeight - Height of the game container
 * @param itemHeight - Height of the item
 * @returns True if item has reached or passed the bottom
 */
export function hasReachedBottom(
  itemPosition: number,
  containerHeight: number,
  itemHeight: number
): boolean {
  return itemPosition + itemHeight >= containerHeight;
}

/**
 * Evaluates if the player's selection matches the falling item
 * @param selectedType - The type the player clicked
 * @param itemType - The type of the falling item
 * @returns True if the selection is correct
 */
export function isCorrectSelection(
  selectedType: ItemType,
  itemType: ItemType
): boolean {
  return selectedType === itemType;
}

/**
 * Calculates the time before an item reaches the bottom
 * Used for timing animations and game difficulty
 * @param currentPosition - Current Y position
 * @param containerHeight - Height of the game container
 * @param itemHeight - Height of the item
 * @param speed - Current falling speed
 * @returns Time in milliseconds until item reaches bottom
 */
export function calculateTimeToBottom(
  currentPosition: number,
  containerHeight: number,
  itemHeight: number,
  speed: number
): number {
  const distanceRemaining = containerHeight - (currentPosition + itemHeight);
  // Assuming 60 FPS, convert frames to milliseconds
  const framesRemaining = distanceRemaining / speed;
  return (framesRemaining / 60) * 1000;
}

