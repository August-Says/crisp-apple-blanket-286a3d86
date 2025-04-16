
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { signUp } from '@/services/authService';

interface CreateUserButtonProps {
  presetEmail?: string;
  presetPassword?: string;
}

const CreateUserButton = ({ presetEmail, presetPassword }: CreateUserButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateUser = async () => {
    // For demonstration purposes only - in a real app, you would never hardcode credentials
    const email = presetEmail || 'nick@impactandagency.com';
    const password = presetPassword || 'password123';

    setIsLoading(true);
    try {
      const { user, error, needsEmailConfirmation } = await signUp({ email, password });
      
      if (user) {
        toast.success(`User ${email} created successfully${needsEmailConfirmation ? '. Please check email for confirmation.' : '!'}`);
      }
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      className="w-full mt-4 bg-white/80 text-navy hover:bg-white/90 border-navy/30"
      onClick={handleCreateUser}
      disabled={isLoading}
    >
      {isLoading ? 'Creating user...' : 'Create Demo User'}
    </Button>
  );
};

export default CreateUserButton;
