
import React from 'react';
import { motion } from 'framer-motion';
import { GameImageDisplay } from '@/components/result/GameImageDisplay';

const CanvassGameSection: React.FC = () => {
  // Define default game images - users can upload their own later
  const defaultGameImages = [
    { 
      path: 'canvass-game-placeholder.gif', 
      caption: 'Canvass Game Visualization',
      isDefault: true
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="border-b border-navy/20 pb-6 mt-8 mb-4"
    >
      <h3 className="text-xl font-bold text-navy mb-4 tracking-wide text-left">Canvass Game</h3>
      
      <div className="text-navy/90 prose prose-sm max-w-none text-left">
        <p className="mb-4">
          Below is an interactive visualization based on your canvas content. You can use this visualization 
          to better understand the concepts and share with your team.
        </p>
        
        {/* Use the GameImageDisplay component which handles loading states */}
        <GameImageDisplay 
          images={[]} 
          defaultImages={defaultGameImages}
          useLocalImages={true} 
        />
        
        <p className="mt-4 text-sm text-navy/70 italic">
          Note: This game visualization is a simplified representation of your canvas elements.
        </p>
      </div>
    </motion.div>
  );
};

export default CanvassGameSection;
