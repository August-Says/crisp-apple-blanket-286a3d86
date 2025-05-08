
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface FreeReportFormData {
  companyName: string;
  industry: string;
  painPoints: string;
  webhookResponse: any;
}

export const useFreeReport = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  // Extract form data from location state with defaults
  const formData = location.state || {
    companyName: 'Your Company',
    industry: 'Technology',
    painPoints: 'Customer engagement',
    webhookResponse: null
  };
  
  useEffect(() => {
    // Log webhook data for debugging
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

  return {
    isLoading,
    formData,
    handleBack,
    handleLogin,
    handleSignUp
  };
};
