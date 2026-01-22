import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full bg-brand-100 rounded-full h-2 mb-6 overflow-hidden">
      <div 
        className="bg-brand-600 h-2 rounded-full transition-all duration-100 ease-linear" 
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};