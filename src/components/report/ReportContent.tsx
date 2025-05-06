
import { motion } from 'framer-motion';
import ExecutiveSummary from './ExecutiveSummary';
import KeyInsights from './KeyInsights';
import RecommendedActions from './RecommendedActions';
import UpgradeSection from './UpgradeSection';
import WaitlistForm from './WaitlistForm';
import { processContent } from '@/utils/contentProcessing';
import { useEffect } from 'react';
import { toast } from 'sonner';

interface ReportContentProps {
  formData: {
    companyName: string;
    industry: string;
    painPoints: string;
    webhookResponse?: any;
  };
  handleLogin: () => void;
}

const ReportContent = ({ formData, handleLogin }: ReportContentProps) => {
  // Extract content from webhook response if available
  const hasWebhookData = formData.webhookResponse && 
    (formData.webhookResponse.data || formData.webhookResponse.fallbackContent);
  
  const webhookContent = hasWebhookData ? 
    formData.webhookResponse.data || formData.webhookResponse.fallbackContent : null;

  // Add effect to show toast when content is loaded
  useEffect(() => {
    if (webhookContent) {
      // Check if this is fallback content
      const isFallback = formData.webhookResponse && formData.webhookResponse.fallbackContent;
      
      if (isFallback) {
        toast.warning("Using fallback content. Webhook didn't return usable data.");
        console.log("Using fallback content due to webhook issues.");
      } else {
        toast.success("Successfully loaded content from webhook!");
        console.log("Successfully loaded data from webhook:", webhookContent);
      }
    } else {
      toast.error("No content available to display.");
      console.log("No content available from webhook response");
    }
  }, [webhookContent]);

  console.log('Report content received webhook data:', webhookContent);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-navy mb-2">
        Customer Insight Report for {formData.companyName}
      </h1>
      <p className="text-navy/70 mb-8">Industry: {formData.industry}</p>
      
      <div className="space-y-8">
        <ExecutiveSummary 
          companyName={formData.companyName} 
          industry={formData.industry} 
          painPoints={formData.painPoints}
        />
        <KeyInsights 
          industry={formData.industry} 
          painPoints={formData.painPoints}
        />
        <RecommendedActions />
      </div>
      
      <UpgradeSection handleLogin={handleLogin} />
      <WaitlistForm />
    </motion.div>
  );
};

export default ReportContent;
