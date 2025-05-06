
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LogIn, UserPlus } from 'lucide-react';

interface ReportHeaderProps {
  handleBack: () => void;
  handleLogin: () => void;
  handleSignUp: () => void;
}

const ReportHeader = ({ handleBack, handleLogin, handleSignUp }: ReportHeaderProps) => {
  return (
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
  );
};

export default ReportHeader;
