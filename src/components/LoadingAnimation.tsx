
import React from 'react';
import CircularProgressIndicator from '@/components/loading/CircularProgressIndicator';
import PulseIndicator from '@/components/loading/PulseIndicator';
import ElapsedTimeDisplay from '@/components/loading/ElapsedTimeDisplay';
import MessageDisplay from '@/components/loading/MessageDisplay';
import { useLoadingAnimation } from '@/components/loading/useLoadingAnimation';

interface LoadingAnimationProps {
  message?: string;
  progress?: number;
}

const LoadingAnimation = ({ 
  message = "Generating your canvas...", 
  progress 
}: LoadingAnimationProps) => {
  const {
    pulsateAnimation,
    displayProgress,
    elapsedTime,
    formatTime,
    getPrimaryColor
  } = useLoadingAnimation({ progress });
  
  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-8">
      <CircularProgressIndicator 
        displayProgress={displayProgress} 
        getPrimaryColor={getPrimaryColor} 
      />
      
      <MessageDisplay message={message} />
      
      <ElapsedTimeDisplay 
        elapsedTime={elapsedTime} 
        formatTime={formatTime} 
      />
      
      {/* Electric pulse dots - only show when not complete */}
      {pulsateAnimation && (
        <PulseIndicator getPrimaryColor={getPrimaryColor} />
      )}
    </div>
  );
};

export default LoadingAnimation;
