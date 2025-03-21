
import { Suspense } from 'react';
import AugustLogo from '@/components/AugustLogo';
import LoginForm from '@/components/login/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fade-in">
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
