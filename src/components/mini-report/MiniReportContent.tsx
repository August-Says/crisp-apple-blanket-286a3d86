
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import MiniInsightSummary from './MiniInsightSummary';
import { processContent } from '@/utils/contentProcessing';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Section } from '@/utils/contentProcessing/types';

interface MiniReportContentProps {
  formData: {
    companyName: string;
    industry: string;
    painPoints: string;
    webhookResponse?: any;
  };
}

const MiniReportContent = ({ formData }: MiniReportContentProps) => {
  const [processedSections, setProcessedSections] = useState<Section[]>([]);
  
  // Extract content from webhook response if available
  const hasWebhookData = formData.webhookResponse && 
    (formData.webhookResponse.data || formData.webhookResponse.fallbackContent);
  
  const webhookContent = hasWebhookData ? 
    formData.webhookResponse.data || formData.webhookResponse.fallbackContent : null;

  // Process the webhook content when available
  useEffect(() => {
    if (webhookContent) {
      try {
        // Check if this is fallback content
        const isFallback = formData.webhookResponse && formData.webhookResponse.fallbackContent;
        
        if (isFallback) {
          toast.warning("Using simplified insights. Couldn't connect to data source.");
          console.log("Using fallback content for mini report due to webhook issues.");
        } else {
          toast.success("Successfully loaded mini report!");
          console.log("Successfully loaded data for mini report:", webhookContent);
        }
        
        // Process the content into sections
        const content = typeof webhookContent === 'string' ? webhookContent : JSON.stringify(webhookContent);
        const sections = processContent(content);
        setProcessedSections(sections);
        console.log("Processed sections for mini report:", sections);
      } catch (error) {
        console.error("Error processing webhook content for mini report:", error);
        toast.error("Error processing report data");
      }
    } else {
      toast.error("No content available for mini report");
      console.log("No content available from webhook response for mini report");
    }
  }, [webhookContent]);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="text-center mb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-navy">
          Quick Insights for {formData.companyName}
        </h1>
        <p className="text-navy/70 mt-1">Industry: {formData.industry}</p>
      </div>
      
      <Card className="border-navy/10 shadow-md bg-white/70 backdrop-blur-sm">
        <CardContent className="p-5">
          <MiniInsightSummary 
            companyName={formData.companyName} 
            industry={formData.industry} 
            painPoints={formData.painPoints}
            processedSections={processedSections}
          />
        </CardContent>
      </Card>
      
      <div className="text-center mt-6 text-sm text-navy/60">
        <p>This is a simplified report. View the full report for more detailed insights and recommendations.</p>
      </div>
    </motion.div>
  );
};

export default MiniReportContent;
