
import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import AugustLogo from '@/components/AugustLogo';
import LoginForm from '@/components/login/LoginForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  
  const handleBackToReport = () => {
    navigate('/report');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-md mb-4">
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 text-navy/70 hover:text-navy" 
          onClick={handleBackToReport}
        >
          <ArrowLeft size={16} />
          Back to Free Report
        </Button>
      </div>
      <div className="flex justify-center mb-8">
        <AugustLogo />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default Login;
