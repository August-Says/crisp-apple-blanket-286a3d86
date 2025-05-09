
import React from 'react';
import { List } from 'lucide-react';

interface CustomerThemesProps {
  themes: Record<string, string> | null;
  fallbackText: string;
}

const CustomerThemesSection = ({ themes, fallbackText }: CustomerThemesProps) => {
  return (
    <div className="glass-morphism rounded-xl p-6 border border-navy/10">
      <div className="flex items-center gap-2 mb-4">
        <List size={24} className="text-navy" />
        <h2 className="text-xl font-bold text-navy">Customer Themes</h2>
      </div>
      
      {themes ? (
        <div className="space-y-4">
          {Object.entries(themes).map(([key, value], index) => (
            <div key={key} className="bg-white/30 p-4 rounded-lg">
              <h3 className="font-medium text-navy mb-2">Customer Concern {index + 1}</h3>
              <p className="text-navy/80">{value}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-navy/80">{fallbackText}</p>
      )}
    </div>
  );
};

export default CustomerThemesSection;
