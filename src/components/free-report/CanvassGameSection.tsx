
import React from 'react';
import { Play } from 'lucide-react';
import CanvassGameSample from '@/components/report/CanvassGameSample';

interface CanvassGameSectionProps {
  companyName: string;
  webhookData: any;
}

const CanvassGameSection = ({ companyName, webhookData }: CanvassGameSectionProps) => {
  return (
    <div className="glass-morphism rounded-xl p-6 border border-navy/10">
      <div className="flex items-center gap-2 mb-4">
        <Play size={24} className="text-navy" />
        <h2 className="text-xl font-bold text-navy">Canvass Game Sample</h2>
      </div>
      
      <p className="text-navy/80 mb-4">
        Here's a sample of how your empathy canvass can be turned into an interactive game for gathering customer insights.
      </p>
      
      <CanvassGameSample 
        companyName={companyName}
        webhookData={webhookData}
      />
    </div>
  );
};

export default CanvassGameSection;
