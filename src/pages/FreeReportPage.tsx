
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoadingAnimation from '@/components/LoadingAnimation';
import FreeReportHeader from '@/components/free-report/FreeReportHeader';
import FreeReportContent from '@/components/free-report/FreeReportContent';
import { toast } from 'sonner';

const FreeReportPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  // Extract form data from location state
  const formData = location.state || {
    companyName: 'Your Company',
    industry: 'Technology',
    painPoints: 'Customer engagement',
    webhookResponse: null
  };
  
  // Log the webhook response from the state for debugging
  useEffect(() => {
    console.log('Free report page received state:', location.state);
    if (formData.webhookResponse) {
      console.log('Free report webhook response data:', formData.webhookResponse);
    } else {
      console.log('No webhook response data received for free report');
    }
    
    // Simulate loading the report
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast.success('Free report generated successfully!');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    navigate('/');
  };

  const handleLogin = () => {
    // Pass along that we came from the free report page
    navigate('/login', { state: { from: 'free-report' } });
  };

  const handleSignUp = () => {
    navigate('/signup');
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
        <LoadingAnimation message="Generating your free insights report..." />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen w-full max-w-5xl mx-auto px-4 py-8 md:py-16">
      <FreeReportHeader 
        handleBack={handleBack}
        handleLogin={handleLogin}
        handleSignUp={handleSignUp}
      />
      
      <FreeReportContent 
        formData={formData}
      />
    </div>
  );
};

export default FreeReportPage;
