import { GameContainer } from '@/components/GameContainer';

/**
 * Recycling Reaction Game Page
 * Isolated game page - does not modify the main homepage
 */
export default function RecycleGamePage() {
  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden">
      <GameContainer />
    </div>
  );
}

