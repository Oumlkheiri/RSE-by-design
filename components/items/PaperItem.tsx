import React from 'react';

/**
 * Paper item component - realistic paper/cardboard representation
 */
export function PaperItem({ size = 80 }: { size?: number }) {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        width: size,
        height: size * 1.2,
      }}
    >
      <svg
        width={size}
        height={size * 1.2}
        viewBox="0 0 70 85"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Paper/cardboard box */}
        <path
          d="M15 10 L15 20 L12 25 L12 70 L18 78 L52 78 L58 70 L58 25 L55 20 L55 10 L15 10 Z"
          fill="#FBBF24"
          fillOpacity="0.5"
          stroke="#F59E0B"
          strokeWidth="2.5"
        />
        {/* Top flap */}
        <path
          d="M15 10 L35 5 L55 10"
          fill="#FCD34D"
          fillOpacity="0.6"
          stroke="#F59E0B"
          strokeWidth="2"
        />
        {/* Side panel */}
        {/* <path
          d="M12 25 L12 70 L18 78 L18 30 Z"
          fill="#FCD34D"
          fillOpacity="0.3"
        /> */}
        {/* Corrugated lines */}
        <path
          d="M20 30 L50 30"
          stroke="#F59E0B"
          strokeWidth="1.5"
          strokeOpacity="0.6"
        />
        <path
          d="M20 40 L50 40"
          stroke="#F59E0B"
          strokeWidth="1.5"
          strokeOpacity="0.6"
        />
        <path
          d="M20 50 L50 50"
          stroke="#F59E0B"
          strokeWidth="1.5"
          strokeOpacity="0.6"
        />
        <path
          d="M20 60 L50 60"
          stroke="#F59E0B"
          strokeWidth="1.5"
          strokeOpacity="0.6"
        />
        {/* Recycling arrows */}
        {/* <g transform="translate(35, 45)">
          <circle r="8" fill="none" stroke="#F59E0B" strokeWidth="1.5" />
          <path
            d="M-4 -4 L0 0 L-4 4"
            stroke="#F59E0B"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </g> */}
        {/* Fold lines */}
        <path
          d="M15 20 L55 20"
          stroke="#D97706"
          strokeWidth="1"
          strokeDasharray="2 2"
          strokeOpacity="0.5"
        />
      </svg>
    </div>
  );
}

