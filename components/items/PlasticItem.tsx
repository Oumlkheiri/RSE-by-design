import React from 'react';

/**
 * Plastic item component - realistic plastic bottle representation
 */
export function PlasticItem({ size = 80 }: { size?: number }) {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        width: size,
        height: size * 1.3,
      }}
    >
      <svg
        width={size}
        height={size * 1.3}
        viewBox="0 0 60 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Plastic bottle body */}
        <path
          d="M18 12 L18 18 L16 25 L16 68 L20 75 L40 75 L44 68 L44 25 L42 18 L42 12 L18 12 Z"
          fill="#F87171"
          fillOpacity="0.4"
          stroke="#F87171"
          strokeWidth="2.5"
        />
        {/* Bottle neck */}
        <rect x="24" y="8" width="12" height="8" rx="2" fill="#F87171" fillOpacity="0.6" stroke="#EF4444" strokeWidth="2" />
        {/* Bottle cap */}
        <rect x="26" y="4" width="8" height="5" rx="1" fill="#DC2626" stroke="#B91C1C" strokeWidth="1.5" />
        
        {/* Bottle ridges */}
        <path
          d="M20 50 L40 50"
          stroke="#FCA5A5"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
        <path
          d="M20 58 L40 58"
          stroke="#FCA5A5"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
      </svg>
    </div>
  );
}

