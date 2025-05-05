
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Share2, LogIn, UserPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormInput } from '@/components/ui/form/FormInput';
import LoadingAnimation from '@/components/LoadingAnimation';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

const ReportPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Extract form data from location state
  const formData = location.state || {
    companyName: 'Your Company',
    industry: 'Technology',
    painPoints: 'Customer engagement'
  };
  
  // Simulate loading the report
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleJoinWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call to add to waitlist
    setTimeout(() => {
      toast.success('Thank you! You have been added to our waitlist.');
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
        <LoadingAnimation message="Generating your AI insights report..." />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen w-full max-w-5xl mx-auto px-4 py-8 md:py-16">
      <div className="flex justify-between items-center mb-8">
        <Button variant="ghost" className="flex items-center gap-2" onClick={handleBack}>
          <ArrowLeft size={16} />
          Back to Home
        </Button>
        
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2" onClick={handleLogin}>
            <LogIn size={16} />
            Login
          </Button>
          <Button variant="outline" className="flex items-center gap-2" onClick={handleSignUp}>
            <UserPlus size={16} />
            Sign Up
          </Button>
        </div>
      </div>
      
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
          <Card>
            <CardHeader>
              <CardTitle>Executive Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-navy/80">
              <p>
                Based on our analysis, {formData.companyName} in the {formData.industry} industry 
                is facing challenges primarily related to {formData.painPoints || 'customer engagement'}. 
                Our data suggests that implementing a more interactive customer feedback system could 
                increase engagement by 27% within 3 months.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-navy/80">
              <div>
                <h3 className="font-semibold text-navy">1. Customer Sentiment Analysis</h3>
                <p>
                  73% of your target audience expresses positive sentiment toward your brand, 
                  however, there's a notable 18% neutral segment that represents conversion opportunities.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-navy">2. Competitive Positioning</h3>
                <p>
                  Your company ranks 3rd in customer satisfaction among 7 key competitors in the {formData.industry} space, 
                  with notable advantages in product quality but opportunities for improvement in customer service response times.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-navy">3. Market Opportunity</h3>
                <p>
                  We've identified a $2.4M annual revenue opportunity by addressing the specific pain points 
                  around {formData.painPoints || 'customer engagement'} through implementing gamified feedback systems.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recommended Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-navy/80">
              <div className="flex items-start gap-4">
                <div className="bg-peach/30 text-navy font-semibold h-8 w-8 flex items-center justify-center rounded-full">1</div>
                <div>
                  <h3 className="font-semibold text-navy">Implement Interactive Feedback Channels</h3>
                  <p>Launch a gamified survey system to increase customer engagement metrics by 30% in Q3.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-peach/30 text-navy font-semibold h-8 w-8 flex items-center justify-center rounded-full">2</div>
                <div>
                  <h3 className="font-semibold text-navy">Enhance Customer Service Protocol</h3>
                  <p>Reduce response times from current 24 hours to under 6 hours to match industry leaders.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-peach/30 text-navy font-semibold h-8 w-8 flex items-center justify-center rounded-full">3</div>
                <div>
                  <h3 className="font-semibold text-navy">Targeted Messaging Strategy</h3>
                  <p>Refocus marketing materials to address the specific concerns identified in your neutral customer segment.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-navy/60 mb-4">Want a more detailed analysis with actionable insights?</p>
          <Button onClick={handleLogin} variant="navyGradient" className="px-8 py-6 text-lg">
            Upgrade to Full Report
          </Button>
        </div>
        
        {/* Waitlist signup form */}
        <div className="mt-16 py-8 px-6 bg-navy/5 rounded-xl border border-navy/10">
          <h2 className="text-2xl font-bold text-navy text-center mb-4">
            Join our Waitlist
          </h2>
          <p className="text-navy/70 text-center mb-6">
            Be the first to know when the full version of the August Says Sentiment Analysis Application is available.
          </p>
          
          <form onSubmit={handleJoinWaitlist} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <FormInput
                id="waitlist-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-grow"
              />
              <Button 
                type="submit" 
                variant="navyGradient"
                disabled={isSubmitting}
                className="whitespace-nowrap"
              >
                {isSubmitting ? 'Joining...' : 'Join Waitlist'}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ReportPage;
