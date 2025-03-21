
import { useState } from 'react';
import { FormInput } from '@/components/ui/form/FormInput';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
  password: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const PasswordInput = ({ password, onChange, error }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="space-y-2">
      <Label htmlFor="password" className="text-navy">Password</Label>
      <div className="relative">
        <FormInput
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={onChange}
          placeholder="••••••••"
          error={error}
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
  );
};

export default PasswordInput;
