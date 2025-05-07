
import React from 'react';
import { motion } from 'framer-motion';
import { GameImageDisplay } from '@/components/result/GameImageDisplay';

interface CanvassGameSectionProps {
  webhookData?: any;
}

const CanvassGameSection: React.FC<CanvassGameSectionProps> = ({ webhookData }) => {
  // Extract company name if available in the webhook data
  let companyName = '';
  if (Array.isArray(webhookData) && webhookData[0]?.output?.company) {
    companyName = webhookData[0].output.company;
  }
  
  // Determine which game image to show based on company name
  let gameImagePath = 'generic_this-or-that_game.gif';
  
  // If we have company info, try to find a company-specific game
  if (companyName) {
    // Convert to lowercase for case-insensitive comparison
    const companyNameLower = companyName.toLowerCase();
    
    // Check for specific companies and assign appropriate games
    // This would ideally be expanded to a proper lookup table or database
    if (companyNameLower.includes('apple')) {
      gameImagePath = 'generic_this-or-that_game.gif'; // You could have a specific Apple game image
    }
  }
  
  // Define game images with the appropriate image
  const gameImages = [
    { 
      path: gameImagePath, 
      caption: `${companyName || 'Canvass'} Game Visualization`,
      isDefault: false
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
          images={gameImages} 
          defaultImages={[]}
          useLocalImages={false} 
        />
        
        <p className="mt-4 text-sm text-navy/70 italic">
          Note: This game visualization is a simplified representation of your canvas elements.
        </p>
      </div>
    </motion.div>
  );
};

export default CanvassGameSection;
