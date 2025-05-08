
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import WaitlistForm from '@/components/report/WaitlistForm';

interface FreeReportContentProps {
  formData: {
    companyName: string;
    industry: string;
    painPoints: string;
    webhookResponse?: any;
  };
}

const FreeReportContent = ({ formData }: FreeReportContentProps) => {
  const [parsedData, setParsedData] = useState<any>(null);
  
  useEffect(() => {
    // Parse webhook response when available
    if (formData.webhookResponse) {
      try {
        // Handle both string and object responses
        const data = typeof formData.webhookResponse === 'string' 
          ? JSON.parse(formData.webhookResponse) 
          : formData.webhookResponse;
        
        setParsedData(data);
        console.log('Parsed free report data:', data);
      } catch (error) {
        console.error('Error parsing free report data:', error);
      }
    }
  }, [formData.webhookResponse]);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <h1 className="text-3xl md:text-4xl font-bold text-navy mb-2">
        FREE Insights Report for {formData.companyName}
      </h1>
      <p className="text-navy/70 mb-8">Industry: {formData.industry}</p>
      
      {/* Company and Industry Section */}
      <div className="glass-morphism rounded-xl p-6 border border-navy/10">
        <h2 className="text-xl font-bold text-navy mb-4">Company Overview</h2>
        <p className="text-navy/80 mb-4">
          {formData.companyName} is operating in the {formData.industry} industry and facing challenges
          related to {formData.painPoints}.
        </p>
      </div>
      
      {/* Customer Themes Section */}
      <div className="glass-morphism rounded-xl p-6 border border-navy/10">
        <h2 className="text-xl font-bold text-navy mb-4">Customer Themes</h2>
        {parsedData?.customer_themes ? (
          <ul className="space-y-2">
            {Object.entries(parsedData.customer_themes).map(([key, value]: [string, any]) => (
              <li key={key} className="flex items-start">
                <span className="text-navy font-medium mr-2">•</span>
                <span className="text-navy/80">{value}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-navy/80">
            Common themes from your customers include concerns about {formData.painPoints} and 
            related aspects of your product or service.
          </p>
        )}
      </div>
      
      {/* Emotional Statements */}
      <div className="glass-morphism rounded-xl p-6 border border-navy/10">
        <h2 className="text-xl font-bold text-navy mb-4">Emotional Statements</h2>
        {parsedData?.emotional_statements ? (
          <div className="space-y-3">
            {parsedData.emotional_statements.map((statement: string, index: number) => (
              <div key={index} className="italic text-navy/80 border-l-2 border-navy/30 pl-4">
                "{statement}"
              </div>
            ))}
          </div>
        ) : (
          <p className="text-navy/80">
            Your customers express emotions related to {formData.painPoints}. Understanding these emotions
            can help you connect better with your audience.
          </p>
        )}
      </div>
      
      {/* Empathy Canvass Preview */}
      <div className="glass-morphism rounded-xl p-6 border border-navy/10">
        <h2 className="text-xl font-bold text-navy mb-4">Empathy Canvass Preview</h2>
        {parsedData?.empathy_canvass && parsedData.empathy_canvass.length > 0 ? (
          <div className="space-y-4">
            <p className="text-navy/80 mb-4">
              Here's a preview of the empathy canvass questions we've generated for your audience:
            </p>
            {parsedData.empathy_canvass.slice(0, 2).map((item: any, index: number) => (
              <div key={index} className="bg-white/40 p-4 rounded-lg">
                <h3 className="font-medium text-navy mb-2">Question {index + 1}: {item.question}</h3>
                {item.options && (
                  <div className="grid grid-cols-2 gap-2">
                    {item.options.slice(0, 4).map((option: string, optIndex: number) => (
                      <div key={optIndex} className="bg-white/60 p-2 rounded text-sm text-navy/80">
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4 text-center">
              <p className="text-navy/70 text-sm mb-2">
                Sign up to access the full empathy canvass with all questions and deeper insights
              </p>
            </div>
          </div>
        ) : (
          <p className="text-navy/80">
            Our AI has generated interactive questions designed to measure emotional reactions
            from your customers. Sign up to access the complete empathy canvass.
          </p>
        )}
      </div>
      
      {/* Upgrade Note */}
      <div className="bg-gradient-to-r from-navy/10 to-navy/20 rounded-xl p-6 text-center">
        <h2 className="text-xl font-bold text-navy mb-2">Access Full Report</h2>
        <p className="text-navy/80 mb-4">
          Get access to in-depth analysis, strategic recommendations, and the complete
          interactive empathy canvass for {formData.companyName}.
        </p>
      </div>
      
      {/* Waitlist Form */}
      <WaitlistForm />
    </motion.div>
  );
};

export default FreeReportContent;
