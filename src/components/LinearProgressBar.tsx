
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LinearProgressBarProps {
  isLoading: boolean;
}

const LinearProgressBar = ({ isLoading }: LinearProgressBarProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [progressColor, setProgressColor] = useState("peach");
  const [rotation, setRotation] = useState(0);
  
  useEffect(() => {
    if (!isLoading) {
      setElapsedTime(0);
      return;
    }
    
    const intervalId = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    
    // Cycle through colors for more visual appeal
    const colorInterval = setInterval(() => {
      setProgressColor(prev => {
        const colors = ["peach", "peach-light", "peach-dark", "navy-light"];
        const currentIndex = colors.indexOf(prev);
        return colors[(currentIndex + 1) % colors.length];
      });
    }, 3000);
    
    // Add smooth rotation animation
    const rotationInterval = setInterval(() => {
      setRotation(prev => (prev + 5) % 360);
    }, 50);
    
    return () => {
      clearInterval(intervalId);
      clearInterval(colorInterval);
      clearInterval(rotationInterval);
    };
  }, [isLoading]);
  
  if (!isLoading) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = Math.min(100, elapsedTime * 2);

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative w-24 h-24 mb-6">
        {/* Outer spinning ring with gradient */}
        <div className="absolute inset-0 rounded-full border-4 border-navy/30 animate-spin-slow"></div>
        
        {/* Middle ring with slow reverse spin */}
        <div className="absolute inset-2 rounded-full border-3 border-navy/40" 
             style={{ 
               transform: `rotate(${-rotation * 0.7}deg)`,
               borderWidth: '3px',
               borderTopColor: 'rgba(32, 55, 76, 0.8)',
               borderRightColor: 'rgba(32, 55, 76, 0.4)',
               borderBottomColor: 'rgba(32, 55, 76, 0.2)',
               borderLeftColor: 'rgba(32, 55, 76, 0.6)'
             }}>
        </div>
        
        {/* Inner pulsing ring */}
        <div className="absolute inset-4 rounded-full border-2 border-navy/50 animate-pulse-subtle"></div>
        
        {/* Dynamic color spinner */}
        <div className={cn(
          "absolute inset-6 rounded-full border-4 border-t-transparent border-l-transparent animate-spin",
          {
            "border-navy": progressColor === "peach",
            "border-navy-light": progressColor === "peach-light",
            "border-navy-dark": progressColor === "peach-dark",
            "border-navy-light": progressColor === "navy-light",
          }
        )}></div>
        
        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-navy text-sm font-medium">{progressPercent}%</span>
        </div>
        
        {/* Orbiting dot */}
        <div className="absolute w-3 h-3 bg-navy rounded-full" 
             style={{ 
               left: `${12 + 10 * Math.cos(rotation * Math.PI / 180)}px`, 
               top: `${12 + 10 * Math.sin(rotation * Math.PI / 180)}px` 
             }}>
        </div>
      </div>
      
      <div className="w-full max-w-xs">
        <p className="text-navy text-lg font-medium text-center mb-4">
          Analyzing your document and generating canvas...
        </p>
        
        <div className="text-navy/80 text-sm font-medium text-center">
          <div>Processing time: {formatTime(elapsedTime)}</div>
        </div>
      </div>
    </div>
  );
};

export default LinearProgressBar;
