
import { useFreeReport } from '@/hooks/useFreeReport';
import LoadingAnimation from '@/components/LoadingAnimation';
import FreeReportHeader from '@/components/free-report/FreeReportHeader';
import FreeReportContent from '@/components/free-report/FreeReportContent';

const FreeReportPage = () => {
  const {
    isLoading,
    formData,
    handleBack,
    handleLogin,
    handleSignUp
  } = useFreeReport();
  
  // Show loading animation while the report is being generated
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
