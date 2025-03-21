
import { useState, useEffect } from 'react';

export interface UseLoadingAnimationOptions {
  progress?: number;
}

export const useLoadingAnimation = ({ progress }: UseLoadingAnimationOptions) => {
  const [pulsateAnimation, setPulsateAnimation] = useState<boolean>(true);
  const [displayProgress, setDisplayProgress] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  
  // Format the elapsed time as mm:ss
  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Update the display progress
  useEffect(() => {
    if (progress !== undefined) {
      setDisplayProgress(Math.min(Math.round(progress), 100));
      
      if (progress >= 100) {
        setPulsateAnimation(false);
      }
    }
  }, [progress]);
  
  // Determine primary color based on progress
  const getPrimaryColor = () => {
    return "#20374c"; // Always return navy
  };
  
  return {
    pulsateAnimation,
    displayProgress,
    elapsedTime,
    formatTime,
    getPrimaryColor
  };
};
