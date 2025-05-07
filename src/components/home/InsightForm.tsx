
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FormSelect } from '@/components/ui/form/FormSelect';
import { FormInput } from '@/components/ui/form/FormInput';
import { FormTextarea } from '@/components/ui/form/FormTextarea';
import { Clipboard } from 'lucide-react';
import { toast } from 'sonner';
import { useWebhookSubmission } from '@/hooks/useWebhookSubmission';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface InsightFormProps {
  industries: Array<{ label: string; value: string }>;
}

const InsightForm = ({ industries }: InsightFormProps) => {
  const navigate = useNavigate();
  const [industry, setIndustry] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [painPoints, setPainPoints] = useState('Improving customer retention and engagement');
  const [reportType, setReportType] = useState('mini');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use the webhook hook for submission
  const { callWebhook, isLoading } = useWebhookSubmission();

  const handleQuickStart = async () => {
    if (companyName && industry) {
      setIsSubmitting(true);
      
      try {
        // Create the query parameters for the webhook URL
        const params = {
          companyName,
          industry,
          painPoints: painPoints || ''
        };
        
        const reportTypeText = reportType === 'mini' ? 'mini report' : 'full report';
        toast.info(`Generating ${reportTypeText} for ${companyName} in ${industry} industry...`);
        console.log(`Submitting to webhook for ${reportTypeText} with params:`, params);
        
        // Call the webhook using our hook
        const webhookResponse = await callWebhook(params);
        console.log(`Webhook response received for ${reportTypeText}:`, webhookResponse);
        
        // Navigate to the appropriate report page with form data
        const targetRoute = reportType === 'mini' ? '/mini-report' : '/report';
        navigate(targetRoute, { 
          state: { 
            companyName,
            industry,
            painPoints,
            webhookResponse
          } 
        });
        
      } catch (error) {
        console.error('Error submitting data to webhook:', error);
        toast.error('There was an error generating your report. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast.error('Please provide both company name and industry');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="glass-morphism border-navy/10 overflow-hidden">
          <CardHeader className="pb-2">
            <div className="w-full flex justify-center mb-4">
              <div className="p-4 rounded-full bg-peach/20">
                <Clipboard size={32} className="text-navy" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-navy">Start with Industry & Pain Points</CardTitle>
            <CardDescription className="text-navy/70">
              Tell us your industry and challenges—we'll generate real-time AI insights.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4 mt-2">
              <div className="space-y-2">
                <label htmlFor="industry" className="text-navy font-medium">
                  Select Your Industry
                </label>
                <FormSelect
                  id="industry"
                  value={industry}
                  onChange={setIndustry}
                  options={industries}
                  placeholder="Choose an industry"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="company" className="text-navy font-medium">
                  Company Name
                </label>
                <FormInput
                  id="company"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Your company name"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="painPoints" className="text-navy font-medium">
                  Describe Your Pain Points (Optional)
                </label>
                <FormTextarea
                  id="painPoints"
                  value={painPoints}
                  onChange={(e) => setPainPoints(e.target.value)}
                  placeholder="What challenges are you facing?"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2 pt-2">
                <label className="text-navy font-medium">
                  Report Type
                </label>
                <Tabs 
                  defaultValue="mini" 
                  value={reportType} 
                  onValueChange={setReportType}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="mini">Quick Mini Report</TabsTrigger>
                    <TabsTrigger value="full">Full Report</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleQuickStart} 
              variant="navyGradient" 
              className="w-full font-medium"
              disabled={!industry || !companyName || isSubmitting || isLoading}
            >
              {isSubmitting || isLoading ? 'Generating...' : `Generate My ${reportType === 'mini' ? 'Quick' : 'Free'} Report`}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default InsightForm;
