
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/FormComponents';
import { FormInput } from '@/components/ui/form/FormInput';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { signIn, resetPassword } from '@/services/authService';
import EmailConfirmationAlert from './EmailConfirmationAlert';

type LoginErrors = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({ email: '', password: '' });
  const [emailNotConfirmed, setEmailNotConfirmed] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!password && !showResetPassword) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (showResetPassword) {
      handleResetPassword();
      return;
    }
    
    setIsLoading(true);
    setEmailNotConfirmed(false);
    
    const { user, error, emailNotConfirmed: notConfirmed } = await signIn({ email, password });
    
    if (notConfirmed) {
      setEmailNotConfirmed(true);
    } else if (user) {
      toast.success('Successfully logged in!');
      navigate('/');
    }
    
    setIsLoading(false);
  };

  const handleResetPassword = async () => {
    if (!email) {
      setErrors({ ...errors, email: 'Email is required for password reset' });
      return;
    }
    
    setResetLoading(true);
    await resetPassword(email);
    setResetLoading(false);
  };

  return (
    <div className="w-full max-w-md glass-morphism rounded-2xl p-8 shadow-xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-navy mb-2">Welcome Back</h1>
        <p className="text-navy/80">Sign in to your August Says account</p>
      </div>
      
      {emailNotConfirmed && <EmailConfirmationAlert />}
      
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
            className="bg-white/80 border-navy/20 text-navy placeholder:text-navy/50 focus-visible:ring-navy"
          />
        </div>
        
        {!showResetPassword && (
          <div className="space-y-2">
            <Label htmlFor="password" className="text-navy">Password</Label>
            <div className="relative">
              <FormInput
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                error={errors.password}
                className="bg-white/80 border-navy/20 text-navy placeholder:text-navy/50 focus-visible:ring-navy pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-navy/60 hover:text-navy"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          {!showResetPassword && (
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-navy/20 bg-white/80 text-navy focus:ring-navy"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-navy">
                Remember me
              </label>
            </div>
          )}
          
          <button 
            type="button" 
            onClick={() => setShowResetPassword(!showResetPassword)}
            className="text-sm text-navy/80 hover:text-navy"
          >
            {showResetPassword ? 'Back to sign in' : 'Forgot password?'}
          </button>
        </div>
        
        <Button
          type="submit"
          className="w-full bg-navy hover:bg-navy-light text-peach font-medium"
          disabled={isLoading || resetLoading}
        >
          {isLoading 
            ? 'Signing in...' 
            : resetLoading 
              ? 'Sending reset link...' 
              : showResetPassword 
                ? 'Send Reset Link' 
                : 'Sign in'}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <span className="text-navy/80 text-sm">
          Don't have an account?{' '}
          <a href="#" className="text-navy hover:underline">
            Contact your administrator
          </a>
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
