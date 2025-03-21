
import { motion } from 'framer-motion';
import React from 'react';

interface PulseIndicatorProps {
  getPrimaryColor: () => string;
}

const PulseIndicator = ({ getPrimaryColor }: PulseIndicatorProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex space-x-4 items-center mt-4"
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.8 }}
          animate={{ 
            scale: [0.8, 1.2, 0.8],
            boxShadow: [
              `0 0 5px #20374c`,
              `0 0 15px #20374c`,
              `0 0 5px #20374c`
            ]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: "#20374c" }}
        />
      ))}
    </motion.div>
  );
};

export default PulseIndicator;
