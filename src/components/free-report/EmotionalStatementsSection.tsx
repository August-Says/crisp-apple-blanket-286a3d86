
import React from 'react';
import { MessageSquare } from 'lucide-react';

interface EmotionalStatementsProps {
  statements: string[] | null;
  fallbackText: string;
}

const EmotionalStatementsSection = ({ statements, fallbackText }: EmotionalStatementsProps) => {
  return (
    <div className="glass-morphism rounded-xl p-6 border border-navy/10">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare size={24} className="text-navy" />
        <h2 className="text-xl font-bold text-navy">Emotional Statements</h2>
      </div>
      
      {statements && statements.length > 0 ? (
        <div className="space-y-3">
          {statements.map((statement, index) => (
            <div key={index} className="bg-white/30 p-4 rounded-lg italic text-navy/80 border-l-2 border-navy/30">
              "{statement}"
            </div>
          ))}
        </div>
      ) : (
        <p className="text-navy/80">{fallbackText}</p>
      )}
    </div>
  );
};

export default EmotionalStatementsSection;
