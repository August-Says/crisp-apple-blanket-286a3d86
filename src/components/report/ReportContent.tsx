
import { motion } from 'framer-motion';
import ExecutiveSummary from './ExecutiveSummary';
import KeyInsights from './KeyInsights';
import RecommendedActions from './RecommendedActions';
import UpgradeSection from './UpgradeSection';
import WaitlistForm from './WaitlistForm';
import { processContent } from '@/utils/contentProcessing';

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
