
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AugustLogo from '@/components/AugustLogo';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/form/FormInput';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import PasswordInput from '@/components/login/PasswordInput';

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email: string; password: string; confirmPassword: string }>({
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const handleBackToReport = () => {
    navigate('/report');
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '', confirmPassword: '' };

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate signup process
    setTimeout(() => {
      toast.success('Account created! You can now login to access the full report.');
      navigate('/login');
    }, 1500);
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
      <div className="w-full max-w-md glass-morphism rounded-2xl p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-navy mb-2">Create an Account</h1>
          <p className="text-navy/80">Get access to the full August Says reports</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-navy">Email</Label>
            <FormInput
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="claire@augustsays.com"
              error={errors.email}
              className="bg-white/80 border-navy/20 text-navy placeholder:text-navy/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-navy">Password</Label>
            <PasswordInput 
              password={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-navy">Confirm Password</Label>
            <PasswordInput 
              password={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
              id="confirmPassword"
            />
          </div>
          
          <Button
            type="submit"
            className="w-full bg-navy hover:bg-navy-light text-peach font-medium"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <span className="text-navy/80 text-sm">
            Already have an account?{' '}
            <button 
              type="button"
              onClick={() => navigate('/login')}
              className="text-navy hover:underline"
            >
              Sign in
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
