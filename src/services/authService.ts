
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type SignInCredentials = {
  email: string;
  password: string;
};

export type SignUpCredentials = {
  email: string;
  password: string;
};

export const signIn = async ({ email, password }: SignInCredentials) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Check specifically for the email not confirmed error
      if (error.message.includes('Email not confirmed') || error.message.includes('email_not_confirmed')) {
        toast.error('Your email has not been confirmed. Please check your inbox or contact an administrator.');
        return { user: null, error, emailNotConfirmed: true };
      }
      
      toast.error(error.message);
      return { user: null, error };
    }

    return { user: data.user, error: null };
  } catch (error: any) {
    toast.error('An unexpected error occurred during sign in');
    return { user: null, error };
  }
};

export const signUp = async ({ email, password }: SignUpCredentials) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      return { user: null, error };
    }

    if (data.user?.identities?.length === 0) {
      toast.error('This email is already registered. Please use the sign in form.');
      return { user: null, error: new Error('Email already registered') };
    }

    if (!data.user?.email_confirmed_at) {
      toast.success('Registration successful! Please check your email to confirm your account.');
      return { user: data.user, needsEmailConfirmation: true, error: null };
    }

    toast.success('Registration successful!');
    return { user: data.user, error: null };
  } catch (error: any) {
    toast.error('An unexpected error occurred during registration');
    return { user: null, error };
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
      return { error };
    }
    return { error: null };
  } catch (error: any) {
    toast.error('An unexpected error occurred during sign out');
    return { error };
  }
};

export const resetPassword = async (email: string) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    
    if (error) {
      toast.error(error.message);
      return { error };
    }
    
    toast.success('Password reset email sent! Please check your inbox.');
    return { error: null };
  } catch (error: any) {
    toast.error('An unexpected error occurred during password reset');
    return { error };
  }
};
