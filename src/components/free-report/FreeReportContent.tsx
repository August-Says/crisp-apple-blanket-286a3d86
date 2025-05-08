
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Briefcase } from 'lucide-react';
import CompanyOverviewSection from './CompanyOverviewSection';
import CustomerThemesSection from './CustomerThemesSection';
import EmotionalStatementsSection from './EmotionalStatementsSection';
import EmpathyCanvassSection from './EmpathyCanvassSection';
import CanvassGameSection from './CanvassGameSection';
import UpgradeSection from './UpgradeSection';

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

  // Get customer themes
  const getCustomerThemes = () => {
    if (parsedData?.length > 0 && parsedData[0]?.output?.customer_themes) {
      return parsedData[0].output.customer_themes;
    }
    return null;
  };

  // Get fallback text for customer themes
  const getCustomerThemesFallback = () => {
    return `Common themes from your customers include concerns about ${formData.painPoints} and 
            related aspects of your product or service.`;
  };

  // Get emotional statements
  const getEmotionalStatements = () => {
    if (parsedData?.length > 0 && parsedData[0]?.output?.emotional_statements) {
      return parsedData[0].output.emotional_statements;
    }
    return null;
  };

  // Get fallback text for emotional statements
  const getEmotionalStatementsFallback = () => {
    return `Your customers express emotions related to ${formData.painPoints}. Understanding these emotions
            can help you connect better with your audience.`;
  };

  // Get empathy canvass
  const getEmpathyCanvass = () => {
    if (parsedData?.length > 0 && parsedData[0]?.output?.empathy_canvass) {
      return parsedData[0].output.empathy_canvass;
    }
    return null;
  };

  // Get fallback text for empathy canvass
  const getEmpathyCanvassFallback = () => {
    return `Our AI has generated interactive questions designed to measure emotional reactions
            from your customers. Sign up to access the complete empathy canvass.`;
  };

  const companyName = getCompanyName();
  const industry = getIndustry();
  const customerObjective = getCustomerObjective();
  const customerThemes = getCustomerThemes();
  const emotionalStatements = getEmotionalStatements();
  const empathyCanvass = getEmpathyCanvass();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <h1 className="text-3xl md:text-4xl font-bold text-navy mb-2">
        FREE Insights Report for {companyName}
      </h1>
      
      {/* Company Overview Section */}
      <CompanyOverviewSection 
        companyName={companyName}
        industry={industry}
        customerObjective={customerObjective}
      />
      
      {/* Customer Themes Section */}
      <CustomerThemesSection 
        themes={customerThemes}
        fallbackText={getCustomerThemesFallback()}
      />
      
      {/* Emotional Statements */}
      <EmotionalStatementsSection 
        statements={emotionalStatements}
        fallbackText={getEmotionalStatementsFallback()}
      />
      
      {/* Empathy Canvass */}
      <EmpathyCanvassSection 
        canvass={empathyCanvass}
        fallbackText={getEmpathyCanvassFallback()}
      />
      
      {/* Canvass Game Sample */}
      <CanvassGameSection 
        companyName={companyName}
        webhookData={parsedData}
      />
      
      {/* Upgrade Note & Waitlist Form */}
      <UpgradeSection companyName={companyName} />
    </motion.div>
  );
};

export default FreeReportContent;
