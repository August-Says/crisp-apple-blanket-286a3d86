
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoadingAnimation from '@/components/LoadingAnimation';
import ReportHeader from '@/components/report/ReportHeader';
import ReportContent from '@/components/report/ReportContent';
import { toast } from 'sonner';

const ReportPage = () => {
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
    console.log('Report page received state:', location.state);
    if (formData.webhookResponse) {
      console.log('Webhook response data:', formData.webhookResponse);
    } else {
      console.log('No webhook response data received');
    }
    
    // Simulate loading the report
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
  
  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
        <LoadingAnimation message="Generating your AI insights report..." />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen w-full max-w-5xl mx-auto px-4 py-8 md:py-16">
      <ReportHeader 
        handleBack={handleBack}
        handleLogin={handleLogin}
        handleSignUp={handleSignUp}
      />
      
      <ReportContent 
        formData={formData} 
        handleLogin={handleLogin} 
      />
    </div>
  );
};

export default ReportPage;
