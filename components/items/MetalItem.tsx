import React from 'react';

/**
 * Metal item component - realistic aluminum can representation
 */
export function MetalItem({ size = 80 }: { size?: number }) {
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
        viewBox="0 0 55 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Can body - metallic gradient effect */}
        <ellipse cx="27.5" cy="10" rx="20" ry="4" fill="#A78BFA" fillOpacity="0.6" stroke="#8B5CF6" strokeWidth="2" />
        <rect x="7" y="10" width="41" height="60" rx="3" fill="url(#canGradient)" stroke="#8B5CF6" strokeWidth="2.5" />
        <ellipse cx="27.5" cy="70" rx="20" ry="4" fill="#7C3AED" fillOpacity="0.7" stroke="#8B5CF6" strokeWidth="2" />
        
        {/* Can top rim */}
        <ellipse cx="27.5" cy="10" rx="22" ry="5" fill="none" stroke="#6D28D9" strokeWidth="1.5" strokeOpacity="0.8" />
        
        {/* Can bottom rim */}
        <ellipse cx="27.5" cy="70" rx="22" ry="5" fill="none" stroke="#6D28D9" strokeWidth="1.5" strokeOpacity="0.8" />
        
        {/* Pull tab */}
        <path
          d="M27.5 8 L30 5 L25 5 Z"
          fill="#C4B5FD"
          stroke="#8B5CF6"
          strokeWidth="1"
        />
        <ellipse cx="27.5" cy="6" rx="3" ry="1.5" fill="#A78BFA" fillOpacity="0.5" />
        
        {/* Metallic highlights */}
        <path
          d="M10 15 L10 65"
          stroke="#C4B5FD"
          strokeWidth="1.5"
          strokeOpacity="0.6"
          strokeLinecap="round"
        />
        <path
          d="M45 15 L45 65"
          stroke="#C4B5FD"
          strokeWidth="1.5"
          strokeOpacity="0.6"
          strokeLinecap="round"
        />
        
        {/* Recycling symbol */}
        
        
        {/* Gradient definition for metallic effect */}
        <defs>
          <linearGradient id="canGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#A78BFA" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

