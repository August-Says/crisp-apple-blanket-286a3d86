
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
import { Progress } from '@/components/ui/progress';
import { useProgressAnimation } from '@/hooks/useProgressAnimation';

interface InsightFormProps {
  industries: Array<{ label: string; value: string }>;
}

const InsightForm = ({ industries }: InsightFormProps) => {
  const navigate = useNavigate();
  const [industry, setIndustry] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [painPoints, setPainPoints] = useState('Improving customer retention and engagement');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use the webhook hook for submission with the TEST URL
  const webhookUrl = "https://sonarai.app.n8n.cloud/webhook-test/ff546d84-5999-4dcc-88ee-8ba645810225";
  const { callWebhook, isLoading } = useWebhookSubmission({ 
    webhookUrl: webhookUrl
  });
  
  // Animated progress for the loading state
  const progress = useProgressAnimation(isLoading || isSubmitting);
  
  // Track elapsed time during submission
  const [elapsedTime, setElapsedTime] = useState(0);
  let timerInterval = null;

  const handleQuickStart = async () => {
    if (companyName && industry) {
      setIsSubmitting(true);
      setElapsedTime(0);
      
      // Start a timer to track elapsed time
      const startTime = Date.now();
      timerInterval = setInterval(() => {
        const timeElapsed = Math.floor((Date.now() - startTime) / 1000);
        setElapsedTime(timeElapsed);
      }, 1000);
      
      try {
        // Create the query parameters for the webhook URL
        const params = {
          companyName,
          industry,
          painPoints: painPoints || ''
        };
        
        toast.info(`Generating FREE report for ${companyName} in ${industry} industry...`);
        toast.info("This may take up to 2 minutes while our AI agents process your request");
        console.log(`Submitting to webhook with params:`, params);
        
        // Call the webhook using our hook and wait for the complete response
        const webhookResponse = await callWebhook(params);
        console.log(`Webhook response received:`, webhookResponse);
        
        // Navigate to the report page with form data
        navigate('/report', { 
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
        if (timerInterval) clearInterval(timerInterval);
      }
    } else {
      toast.error('Please provide both company name and industry');
    }
  };

  // Format the elapsed time for display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            {(isSubmitting || isLoading) && (
              <div className="w-full space-y-2">
                <div className="flex justify-between text-sm text-navy">
                  <span>Generating report...</span>
                  <span>{formatTime(elapsedTime)}</span>
                </div>
                <Progress value={progress} className="w-full h-2" />
                <p className="text-xs text-navy/70 text-center">
                  Please wait while our AI agents process your request (up to 2 minutes)
                </p>
              </div>
            )}
            <Button 
              onClick={handleQuickStart} 
              variant="navyGradient" 
              className="w-full font-medium"
              disabled={!industry || !companyName || isSubmitting || isLoading}
            >
              {isSubmitting || isLoading ? 'Generating...' : 'Generate My FREE Report'}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default InsightForm;
