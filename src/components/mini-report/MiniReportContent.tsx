
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
  
  // Extract content from webhook response
  const webhookData = formData.webhookResponse;
  const webhookRawData = Array.isArray(webhookData) ? webhookData : null;
  
  // Process the webhook content when available
  useEffect(() => {
    console.log("MiniReportContent received webhook data:", webhookData);
    
    if (webhookData) {
      try {
        let contentToProcess = "";
        
        // Handle different response formats
        if (typeof webhookData === 'string') {
          contentToProcess = webhookData;
        } else if (Array.isArray(webhookData)) {
          contentToProcess = JSON.stringify(webhookData);
        } else if (webhookData.data) {
          contentToProcess = JSON.stringify(webhookData.data);
        } else if (webhookData.fallbackContent) {
          contentToProcess = webhookData.fallbackContent;
          toast.warning("Using simplified insights. Couldn't connect to data source.");
        }
        
        if (contentToProcess) {
          // Process the content into sections
          const sections = processContent(contentToProcess);
          setProcessedSections(sections);
          console.log("Processed sections for mini report:", sections);
          
          if (sections.length > 0) {
            toast.success("Successfully loaded mini report!");
          }
        } else {
          toast.error("No content available for mini report");
        }
      } catch (error) {
        console.error("Error processing webhook content for mini report:", error);
        toast.error("Error processing report data");
      }
    } else {
      toast.error("No webhook response available for mini report");
    }
  }, [webhookData]);
  
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
            webhookData={webhookRawData}
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
