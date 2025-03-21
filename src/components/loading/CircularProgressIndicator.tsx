
import { motion } from 'framer-motion';
import { RefreshCw, Zap } from 'lucide-react';
import React from 'react';
import { AnimatedCircularProgressBar } from '@/components/ui/animated-circular-progress-bar';

interface CircularProgressIndicatorProps {
  displayProgress: number;
  getPrimaryColor: () => string;
}

const CircularProgressIndicator = ({ 
  displayProgress, 
  getPrimaryColor 
}: CircularProgressIndicatorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative mb-6 flex items-center justify-center"
    >
      {/* Electric glow effect */}
      <motion.div 
        className="absolute inset-0 rounded-full"
        style={{ 
          boxShadow: `0 0 20px 5px ${getPrimaryColor()}`, 
          opacity: 0.4,
          filter: 'blur(10px)'
        }}
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Circular progress bar */}
      <AnimatedCircularProgressBar
        max={100}
        min={0}
        value={displayProgress}
        gaugePrimaryColor={getPrimaryColor()}
        gaugeSecondaryColor="rgba(32, 55, 76, 0.2)"
        size={160}
        strokeWidth={14}
        showValue={true}
        valueSize={42}
        valueFontWeight={700}
        valueColor="white"
      />
      
      {/* Lightning bolt sparks */}
      <motion.div 
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{ 
          y: [0, -5, 0],
          opacity: [0.7, 1, 0.7] 
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <Zap className="w-8 h-8 text-peach" />
      </motion.div>
      
      {/* Rotating flywheel in the center */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute"
        style={{ filter: 'drop-shadow(0 0 5px rgba(255,210,200,0.7))' }}
      >
        <RefreshCw className="w-10 h-10 text-peach" />
      </motion.div>
      
      {/* Percentage text highlight */}
      <motion.div
        className="absolute"
        animate={{ scale: [0.98, 1.02, 0.98] }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.div 
          className="text-4xl font-bold text-white"
          style={{ 
            textShadow: `0 0 10px ${getPrimaryColor()}, 0 0 20px ${getPrimaryColor()}` 
          }}
        >
          {displayProgress}%
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CircularProgressIndicator;
