
import { Button } from '@/components/ui/button';
import { ArrowLeft, LogIn, UserPlus } from 'lucide-react';

interface FreeReportHeaderProps {
  handleBack: () => void;
  handleLogin: () => void;
  handleSignUp: () => void;
}

const FreeReportHeader = ({ handleBack, handleLogin, handleSignUp }: FreeReportHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
      <Button variant="ghost" className="flex items-center gap-2" onClick={handleBack}>
        <ArrowLeft size={16} />
        Back to Home
      </Button>
      
      <div className="flex gap-2">
        <Button variant="outline" className="flex items-center gap-2" onClick={handleLogin}>
          <LogIn size={16} />
          Login
        </Button>
        <Button variant="default" className="flex items-center gap-2 bg-navy text-white hover:bg-navy/80" onClick={handleSignUp}>
          <UserPlus size={16} />
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default FreeReportHeader;
