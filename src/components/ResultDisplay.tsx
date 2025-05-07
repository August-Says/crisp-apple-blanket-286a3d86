
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import PdfExportButton from '@/components/result/PdfExportButton';
import ShareButton from '@/components/result/ShareButton';
import ContentDisplay from '@/components/result/ContentDisplay';
import { processContent, formatSectionTitle } from '@/components/result/ContentParser';
import CanvassGameSection from '@/components/result/section/CanvassGameSection';

interface ResultDisplayProps {
  result: string;
  onBack: () => void;
}

const ResultDisplay = ({ result, onBack }: ResultDisplayProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const processedSections = processContent(result);
  const [showRawJson, setShowRawJson] = useState(false);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto glass-morphism rounded-2xl p-8 md:p-10 my-8 shadow-lg overflow-y-auto"
    >
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4 md:mb-0 text-left">Your Marketing Canvas</h2>
        <div className="flex space-x-4">
          <PdfExportButton contentRef={contentRef} />
          <ShareButton contentRef={contentRef} />
        </div>
      </div>
      
      <ContentDisplay 
        sections={processedSections} 
        formatSectionTitle={formatSectionTitle}
        contentRef={contentRef}
      />
      
      {/* Add Canvass Game section after Questions */}
      <CanvassGameSection />
      
      <div className="mt-8 pt-4 border-t border-navy/20 flex justify-between items-center">
        <Button
          onClick={onBack}
          variant="outline"
          className="bg-cloudai-purple text-white hover:bg-cloudai-violetpurple border-transparent font-medium shadow-md"
        >
          Generate New Canvas
        </Button>
        
        <Button
          onClick={() => setShowRawJson(!showRawJson)}
          variant="ghost"
          className="text-navy/70 hover:text-navy hover:bg-white/10"
        >
          {showRawJson ? "Hide Raw JSON" : "Show Raw JSON"}
        </Button>
      </div>
      
      {showRawJson && (
        <div className="mt-6 p-4 bg-black/20 rounded-md">
          <h3 className="text-lg font-medium text-navy mb-2 text-left">Raw Response Data:</h3>
          <pre className="text-xs text-navy/70 overflow-auto max-h-[400px] p-2 text-left">
            {result}
          </pre>
        </div>
      )}
    </motion.div>
  );
};

export default ResultDisplay;
