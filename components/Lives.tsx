'use client';

import React from 'react';

interface LivesProps {
  lives: number;
}

/**
 * Lives display component with French label
 * Shows icons for remaining lives
 */
export function Lives({ lives }: LivesProps) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl bg-gray-800/90 border border-gray-700 px-6 py-3 shadow-2xl backdrop-blur-sm">
      <span className="text-sm font-medium text-gray-400">Vies</span>
      <div className="flex gap-1">
        {Array.from({ length: 3 }).map((_, index) => (
          <svg
            key={index}
            width="24"
            height="24"
            viewBox="0 0 512 512"
            fill={index < lives ? '#07b549' : '#374151'}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M431.58,32.35a5.93,5.93,0,0,0-6.53-2.24C248.25,82.58,138,157.69,97.48,253.36c-33.9,80-6.33,145.74-.61,157.86-14.52,39.23-17.47,63.67-17.54,64.32a6,6,0,0,0,5.3,6.57l.63,0a6,6,0,0,0,5.93-5.33c.07-.62,2.88-23.4,16.33-60.17,9.37.62,18.63,1.09,27.57,1.09C265.81,417.73,349,352,365.16,234.05,382,111.18,431.13,40,431.62,39.26A6,6,0,0,0,431.58,32.35ZM353.36,232.44C330.81,396.69,183.25,409.08,111.93,405.1c26.47-66.66,85.64-171,216.14-274.67a6,6,0,0,0-7.42-9.35C192.08,223.25,131.48,326.46,103.24,395a190.72,190.72,0,0,1,5.22-137C146.41,168.49,249,97.25,413.31,46.13,398,72.66,366.49,136.72,353.36,232.44Z" />
          </svg>
        ))}
      </div>
    </div>
  );
}

