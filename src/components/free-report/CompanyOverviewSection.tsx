
import React from 'react';
import { Building } from 'lucide-react';

interface CompanyOverviewProps {
  companyName: string;
  industry: string;
  customerObjective: string;
}

const CompanyOverviewSection = ({ companyName, industry, customerObjective }: CompanyOverviewProps) => {
  return (
    <div className="glass-morphism rounded-xl p-6 border border-navy/10">
      <div className="flex items-center gap-2 mb-4">
        <Building size={24} className="text-navy" />
        <h2 className="text-xl font-bold text-navy">Company Overview</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex items-start gap-2">
          <span className="font-medium text-navy">Company:</span>
          <span className="text-navy/80">{companyName}</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="font-medium text-navy">Industry:</span>
          <span className="text-navy/80">{industry}</span>
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="font-medium text-navy mb-2">Customer Objective:</h3>
        <p className="text-navy/80">{customerObjective}</p>
      </div>
    </div>
  );
};

export default CompanyOverviewSection;
