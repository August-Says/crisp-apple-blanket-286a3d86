
import React from 'react';
import WaitlistForm from '@/components/report/WaitlistForm';

interface UpgradeSectionProps {
  companyName: string;
}

const UpgradeSection = ({ companyName }: UpgradeSectionProps) => {
  return (
    <>
      <div className="bg-gradient-to-r from-navy/10 to-navy/20 rounded-xl p-6 text-center">
        <h2 className="text-xl font-bold text-navy mb-2">Access Full Report</h2>
        <p className="text-navy/80 mb-4">
          Get access to in-depth analysis, strategic recommendations, and the complete
          interactive empathy canvass for {companyName}.
        </p>
      </div>
      
      <WaitlistForm />
    </>
  );
};

export default UpgradeSection;
