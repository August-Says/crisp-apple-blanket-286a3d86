
import React from 'react';
import { motion } from 'framer-motion';
import { MarkdownContentRenderer } from '../markdown/MarkdownContentRenderer';

interface SectionProps {
  title: string;
  content: string;
  index: number;
}

export const SectionRenderer: React.FC<SectionProps> = ({ title, content, index }) => {
  return (
    <motion.div 
      key={index}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 * index }}
      className="border-b border-navy/20 pb-6 last:border-0"
    >
      <h3 className="text-xl font-bold text-navy mb-3 tracking-wide text-left">{title}</h3>
      <div className="text-navy/90 prose prose-sm max-w-none text-left">
        <MarkdownContentRenderer content={content} />
      </div>
    </motion.div>
  );
};
