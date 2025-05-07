
import { motion } from 'framer-motion';
import ExecutiveSummary from './ExecutiveSummary';
import KeyInsights from './KeyInsights';
import RecommendedActions from './RecommendedActions';
import UpgradeSection from './UpgradeSection';
import WaitlistForm from './WaitlistForm';
import { processContent } from '@/utils/contentProcessing';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { formatWebhookResponse } from '@/utils/webhookFormatter';

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
  const [formattedWebhookData, setFormattedWebhookData] = useState<string | null>(null);
  const [showRawData, setShowRawData] = useState(false);

  // Extract content from webhook response if available
  const hasWebhookData = formData.webhookResponse && 
    (typeof formData.webhookResponse === 'object' || typeof formData.webhookResponse === 'string');
  
  // Process webhook response when it's available
  useEffect(() => {
    console.log('Report content received webhook data:', formData.webhookResponse);
    
    if (hasWebhookData) {
      try {
        // Format the webhook response for display
        let formattedData: string;
        
        if (typeof formData.webhookResponse === 'string') {
          formattedData = formData.webhookResponse;
        } else {
          formattedData = formatWebhookResponse(formData.webhookResponse);
        }
        
        setFormattedWebhookData(formattedData);
        toast.success("Successfully received data from webhook!");
      } catch (error) {
        console.error('Error processing webhook response:', error);
        toast.error("Error processing webhook data");
      }
    } else {
      console.log('No content available from webhook response');
      toast.error("No webhook response data received");
    }
  }, [formData.webhookResponse]);
  
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
      
      {/* Display the webhook response data if available */}
      {formattedWebhookData && (
        <div className="mb-8 p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-navy">Webhook Response Data</h2>
            <button 
              onClick={() => setShowRawData(!showRawData)}
              className="text-sm text-navy/70 hover:text-navy underline"
            >
              {showRawData ? "Hide Raw JSON" : "Show Raw JSON"}
            </button>
          </div>
          
          {showRawData ? (
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm max-h-96">
              {JSON.stringify(formData.webhookResponse, null, 2)}
            </pre>
          ) : (
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap text-sm">
                {formattedWebhookData}
              </pre>
            </div>
          )}
        </div>
      )}
      
      <div className="space-y-8">
        <ExecutiveSummary 
          companyName={formData.companyName} 
          industry={formData.industry} 
          painPoints={formData.painPoints}
          webhookData={formData.webhookResponse}
        />
        <KeyInsights 
          industry={formData.industry} 
          painPoints={formData.painPoints}
          webhookData={formData.webhookResponse}
        />
        <RecommendedActions webhookData={formData.webhookResponse} />
      </div>
      
      <UpgradeSection handleLogin={handleLogin} />
      <WaitlistForm />
    </motion.div>
  );
};

export default ReportContent;
