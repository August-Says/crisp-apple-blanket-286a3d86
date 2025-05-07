
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CanvassGameSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [gifSrc, setGifSrc] = useState<string | null>(null);
  
  // For now, we'll use a placeholder GIF URL
  // This would be replaced with actual content from the API response
  const placeholderGif = "https://via.placeholder.com/600x400.gif?text=Canvass+Game+Coming+Soon";

  const handleGifLoad = () => {
    setIsLoading(false);
  };

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
        
        {isLoading && (
          <div className="w-full h-64 bg-navy/5 animate-pulse rounded-lg flex items-center justify-center">
            <p className="text-navy/50">Loading game content...</p>
          </div>
        )}
        
        <div className={`relative rounded-lg overflow-hidden shadow-lg ${isLoading ? 'hidden' : 'block'}`}>
          <img
            src={gifSrc || placeholderGif}
            alt="Canvass Game Visualization"
            className="w-full"
            onLoad={handleGifLoad}
          />
        </div>
        
        <p className="mt-4 text-sm text-navy/70 italic">
          Note: This game visualization is a simplified representation of your canvas elements.
        </p>
      </div>
    </motion.div>
  );
};

export default CanvassGameSection;
