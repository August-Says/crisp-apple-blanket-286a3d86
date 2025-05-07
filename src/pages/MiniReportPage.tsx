
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoadingAnimation from '@/components/LoadingAnimation';
import MiniReportHeader from '@/components/mini-report/MiniReportHeader';
import MiniReportContent from '@/components/mini-report/MiniReportContent';
import { toast } from 'sonner';

const MiniReportPage = () => {
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
    console.log('Mini report page received state:', location.state);
    if (formData.webhookResponse) {
      console.log('Mini report webhook response data:', formData.webhookResponse);
    } else {
      console.log('No webhook response data received for mini report');
    }
    
    // Simulate loading the report
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    navigate('/');
  };

  const handleViewFullReport = () => {
    // Navigate to full report with the same form data
    navigate('/report', { state: formData });
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
        <LoadingAnimation message="Generating your mini insights report..." />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen w-full max-w-4xl mx-auto px-4 py-6 md:py-12">
      <MiniReportHeader 
        handleBack={handleBack}
        handleViewFullReport={handleViewFullReport}
      />
      
      <MiniReportContent 
        formData={formData}
      />
    </div>
  );
};

export default MiniReportPage;
