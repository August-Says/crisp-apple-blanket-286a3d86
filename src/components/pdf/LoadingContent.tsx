
import { motion } from 'framer-motion';
import { useLoadingAnimation } from '@/components/loading/useLoadingAnimation';

interface LoadingContentProps {
  loadingProgress: number;
}

const LoadingContent = ({ loadingProgress }: LoadingContentProps) => {
  const { pulsateAnimation, displayProgress, elapsedTime, formatTime } = useLoadingAnimation({
    progress: loadingProgress
  });

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg">
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-navy mb-2">Processing Your Content</h2>
            <p className="text-navy/70">
              We're analyzing your document to generate insights. This may take up to 90 seconds.
            </p>
          </div>
          
          <div className="w-full space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-navy/70 text-sm font-medium">
                Generating your canvas...
              </span>
              <span className="text-navy/70 text-sm font-medium">
                {formatTime(elapsedTime)}
              </span>
            </div>
            
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-navy"
                initial={{ width: '0%' }}
                animate={{ 
                  width: `${displayProgress}%`,
                  transition: { duration: 0.3 }
                }}
              />
            </div>
            
            <div className="flex justify-between items-center text-xs text-navy/60">
              <span>Extracting insights</span>
              <span>{displayProgress}%</span>
            </div>
          </div>
          
          <div className="flex justify-center">
            <motion.div
              animate={{
                scale: pulsateAnimation ? [1, 1.05, 1] : 1
              }}
              transition={{
                duration: 1.5,
                repeat: pulsateAnimation ? Infinity : 0,
                ease: "easeInOut"
              }}
              className="w-24 h-24 flex items-center justify-center rounded-full bg-navy/10"
            >
              <div className="w-16 h-16 rounded-full border-4 border-t-navy border-r-navy border-b-transparent border-l-transparent animate-spin" />
            </motion.div>
          </div>
          
          <div className="text-center text-sm text-navy/60">
            <p>Our AI is analyzing your content and identifying key insights</p>
            <p className="mt-1">Please don't refresh the page</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingContent;
