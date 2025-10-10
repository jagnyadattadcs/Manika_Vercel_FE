import React from 'react';

const CircularProgress = ({
  value,
  max,
  size = 120,
  strokeWidth = 3
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = ((max - value) / max) * circumference;

  return (
    <div className="relative group">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90 transition-transform duration-300 group-hover:scale-105"
      >
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          className="transition-all duration-1000 ease-in-out"
          style={{
            filter: 'drop-shadow(0 0 8px rgba(41, 254, 29, 0.35))'
          }}
        />
        
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#29fe1d" />
            <stop offset="50%" stopColor="#5fff50" />
            <stop offset="100%" stopColor="#29fe1d" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Inner Glow Effect */}
      <div 
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)',
        }}
      />
    </div>
  );
};

export default CircularProgress;