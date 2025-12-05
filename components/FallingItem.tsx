'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassItem } from './items/GlassItem';
import { PlasticItem } from './items/PlasticItem';
import { PaperItem } from './items/PaperItem';
import { MetalItem } from './items/MetalItem';
import type { ItemType } from '@/lib/utils';

interface FallingItemProps {
  type: ItemType;
  position: number;
}

/**
 * Falling item component with animation
 * Renders the appropriate item type based on the type prop
 */
export function FallingItem({ type, position }: FallingItemProps) {
  const renderItem = () => {
    switch (type) {
      case 'glass':
        return <GlassItem size={80} />;
      case 'plastic':
        return <PlasticItem size={80} />;
      case 'paper':
        return <PaperItem size={80} />;
      case 'metal':
        return <MetalItem size={80} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: position }}
      transition={{ duration: 0, ease: 'linear' }}
      className="absolute left-1/2 -translate-x-1/2"
      style={{ top: 0 }}
    >
      {renderItem()}
    </motion.div>
  );
}

