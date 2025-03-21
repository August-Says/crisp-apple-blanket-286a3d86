
import { motion } from 'framer-motion';
import React from 'react';

interface MessageDisplayProps {
  message: string;
}

const MessageDisplay = ({ message }: MessageDisplayProps) => {
  return (
    <motion.p 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-navy text-lg font-medium text-center"
    >
      {message}
    </motion.p>
  );
};

export default MessageDisplay;
