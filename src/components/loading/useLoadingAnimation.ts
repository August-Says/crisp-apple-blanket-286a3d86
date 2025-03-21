
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
    if (displayProgress >= 100) {
      return "#ffd2c8"; // peach
    } else if (displayProgress >= 85) {
      return "#ffe5e0"; // peach-light
    } else if (displayProgress >= 55) {
      return "#ffbfb0"; // peach-dark
    } else if (displayProgress >= 30) {
      return "#ffd2c8"; // peach
    } else {
      return "#ffd2c8"; // peach
    }
  };
  
  return {
    pulsateAnimation,
    displayProgress,
    elapsedTime,
    formatTime,
    getPrimaryColor
  };
};
