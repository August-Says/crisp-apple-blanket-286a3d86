
import React from 'react';
import { MessageSquareHeart } from 'lucide-react';

interface CanvassQuestion {
  question: string;
  options: string[];
}

interface EmpathyCanvassProps {
  canvass: CanvassQuestion[] | null;
  fallbackText: string;
}

const EmpathyCanvassSection = ({ canvass, fallbackText }: EmpathyCanvassProps) => {
  return (
    <div className="glass-morphism rounded-xl p-6 border border-navy/10">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquareHeart size={24} className="text-navy" />
        <h2 className="text-xl font-bold text-navy">Empathy Canvass</h2>
      </div>
      
      <p className="text-navy/80 mb-4">
        The empathy canvass helps you understand the emotional responses of your customers to various aspects of your product or service.
      </p>
      
      {canvass && canvass.length > 0 ? (
        <div className="space-y-5">
          {canvass.map((item, index) => (
            <div key={index} className="bg-white/30 p-4 rounded-lg">
              <h3 className="font-medium text-navy mb-3">Question {index + 1}: {item.question}</h3>
              {item.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {item.options.map((option, optIndex) => (
                    <div key={optIndex} className="bg-white/60 p-3 rounded text-navy/80">
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-navy/80">{fallbackText}</p>
      )}
    </div>
  );
};

export default EmpathyCanvassSection;
