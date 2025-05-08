
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import WaitlistForm from '@/components/report/WaitlistForm';
import CanvassGameSample from '@/components/report/CanvassGameSample';
import { Company, Industry, MessageSquare, MessageSquareHeart, List, Image, Play } from 'lucide-react';

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
  
  // Helper function to get the company name from either the parsed data or formData
  const getCompanyName = () => {
    if (parsedData && parsedData[0]?.output?.company) {
      return parsedData[0].output.company;
    }
    return formData.companyName;
  };

  // Helper function to get the industry from either the parsed data or formData
  const getIndustry = () => {
    if (parsedData && parsedData[0]?.output?.industry) {
      return parsedData[0].output.industry;
    }
    return formData.industry;
  };
  
  // Helper function to create a customer objective from pain points
  const getCustomerObjective = () => {
    if (parsedData && parsedData[0]?.output?.customer_themes) {
      const themes = parsedData[0].output.customer_themes;
      return `${getCompanyName()} customers are experiencing issues related to pricing, perceived value, and alignment with their values. Addressing these concerns could improve customer satisfaction and retention.`;
    }
    return `Based on your input about "${formData.painPoints}", we've analyzed potential customer pain points.`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <h1 className="text-3xl md:text-4xl font-bold text-navy mb-2">
        FREE Insights Report for {getCompanyName()}
      </h1>
      
      {/* Company and Industry Section */}
      <div className="glass-morphism rounded-xl p-6 border border-navy/10">
        <div className="flex items-center gap-2 mb-4">
          <Company size={24} className="text-navy" />
          <h2 className="text-xl font-bold text-navy">Company Overview</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-start gap-2">
            <span className="font-medium text-navy">Company:</span>
            <span className="text-navy/80">{getCompanyName()}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-medium text-navy">Industry:</span>
            <span className="text-navy/80">{getIndustry()}</span>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="font-medium text-navy mb-2">Customer Objective:</h3>
          <p className="text-navy/80">{getCustomerObjective()}</p>
        </div>
      </div>
      
      {/* Customer Themes Section */}
      <div className="glass-morphism rounded-xl p-6 border border-navy/10">
        <div className="flex items-center gap-2 mb-4">
          <List size={24} className="text-navy" />
          <h2 className="text-xl font-bold text-navy">Customer Themes</h2>
        </div>
        
        {parsedData?.length > 0 && parsedData[0]?.output?.customer_themes ? (
          <div className="space-y-4">
            {Object.entries(parsedData[0].output.customer_themes).map(([key, value]: [string, any], index: number) => (
              <div key={key} className="bg-white/30 p-4 rounded-lg">
                <h3 className="font-medium text-navy mb-2">Pain Point {index + 1}</h3>
                <p className="text-navy/80">{value}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-navy/80">
            Common themes from your customers include concerns about {formData.painPoints} and 
            related aspects of your product or service.
          </p>
        )}
      </div>
      
      {/* Emotional Statements */}
      <div className="glass-morphism rounded-xl p-6 border border-navy/10">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare size={24} className="text-navy" />
          <h2 className="text-xl font-bold text-navy">Emotional Statements</h2>
        </div>
        
        {parsedData?.length > 0 && parsedData[0]?.output?.emotional_statements ? (
          <div className="space-y-3">
            {parsedData[0].output.emotional_statements.map((statement: string, index: number) => (
              <div key={index} className="bg-white/30 p-4 rounded-lg italic text-navy/80 border-l-2 border-navy/30">
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
      
      {/* Empathy Canvass */}
      <div className="glass-morphism rounded-xl p-6 border border-navy/10">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquareHeart size={24} className="text-navy" />
          <h2 className="text-xl font-bold text-navy">Empathy Canvass</h2>
        </div>
        
        <p className="text-navy/80 mb-4">
          The empathy canvass helps you understand the emotional responses of your customers to various aspects of your product or service.
        </p>
        
        {parsedData?.length > 0 && parsedData[0]?.output?.empathy_canvass ? (
          <div className="space-y-5">
            {parsedData[0].output.empathy_canvass.map((item: any, index: number) => (
              <div key={index} className="bg-white/30 p-4 rounded-lg">
                <h3 className="font-medium text-navy mb-3">Question {index + 1}: {item.question}</h3>
                {item.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {item.options.map((option: string, optIndex: number) => (
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
          <p className="text-navy/80">
            Our AI has generated interactive questions designed to measure emotional reactions
            from your customers. Sign up to access the complete empathy canvass.
          </p>
        )}
      </div>
      
      {/* Canvass Game Sample */}
      <div className="glass-morphism rounded-xl p-6 border border-navy/10">
        <div className="flex items-center gap-2 mb-4">
          <Play size={24} className="text-navy" />
          <h2 className="text-xl font-bold text-navy">Canvass Game Sample</h2>
        </div>
        
        <p className="text-navy/80 mb-4">
          Here's a sample of how your empathy canvass can be turned into an interactive game for gathering customer insights.
        </p>
        
        <CanvassGameSample 
          companyName={getCompanyName()}
          webhookData={parsedData}
        />
      </div>
      
      {/* Upgrade Note */}
      <div className="bg-gradient-to-r from-navy/10 to-navy/20 rounded-xl p-6 text-center">
        <h2 className="text-xl font-bold text-navy mb-2">Access Full Report</h2>
        <p className="text-navy/80 mb-4">
          Get access to in-depth analysis, strategic recommendations, and the complete
          interactive empathy canvass for {getCompanyName()}.
        </p>
      </div>
      
      {/* Waitlist Form */}
      <WaitlistForm />
    </motion.div>
  );
};

export default FreeReportContent;
