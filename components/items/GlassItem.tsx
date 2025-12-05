import React from 'react';

/**
 * Glass item component - realistic glass bottle representation
 */
export function GlassItem({ size = 80 }: { size?: number }) {
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
        {/* Glass bottle body */}
        <path
          d="M20 10 L20 15 L18 20 L18 65 L22 70 L38 70 L42 65 L42 20 L40 15 L40 10 L20 10 Z"
          fill="#60A5FA"
          fillOpacity="0.3"
          stroke="#60A5FA"
          strokeWidth="2"
        />
        {/* Bottle neck */}
        <rect x="26" y="5" width="8" height="8" rx="1" fill="#60A5FA" fillOpacity="0.5" stroke="#60A5FA" strokeWidth="2" />
        {/* Bottle cap */}
        <rect x="27" y="2" width="6" height="4" rx="1" fill="#3B82F6" stroke="#2563EB" strokeWidth="1.5" />
        {/* Liquid inside */}
        <path
          d="M20 50 L20 65 L22 68 L38 68 L40 65 L40 50 Q30 48 20 50 Z"
          fill="#60A5FA"
          fillOpacity="0.6"
        />
        {/* Glass highlights */}
        <path
          d="M22 25 L22 45"
          stroke="#93C5FD"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M38 25 L38 45"
          stroke="#93C5FD"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

