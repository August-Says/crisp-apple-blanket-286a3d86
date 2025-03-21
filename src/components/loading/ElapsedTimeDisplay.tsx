
import { motion } from 'framer-motion';
import React from 'react';

interface ElapsedTimeDisplayProps {
  elapsedTime: number;
  formatTime: (time: number) => string;
}

const ElapsedTimeDisplay = ({ elapsedTime, formatTime }: ElapsedTimeDisplayProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-peach/80 text-sm font-medium"
    >
      Time elapsed: {formatTime(elapsedTime)}
    </motion.div>
  );
};

export default ElapsedTimeDisplay;
