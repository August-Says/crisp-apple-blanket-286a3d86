// src/components/LinearProgressBar.tsx

import React from 'react';

interface LinearProgressBarProps {
  progress: number;
}

const LinearProgressBar: React.FC<LinearProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div className="bg-navy h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default LinearProgressBar;
