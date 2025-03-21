
import { AlertCircle } from 'lucide-react';

const EmailConfirmationAlert = () => {
  return (
    <div className="mb-6 p-3 bg-amber-500/20 border border-amber-500/40 rounded-lg flex items-start">
      <AlertCircle className="text-amber-500 mr-2 mt-0.5 flex-shrink-0" size={18} />
      <p className="text-amber-100 text-sm">
        Your email hasn't been confirmed yet. Please check your inbox for a confirmation email or contact your administrator. You can also try resetting your password using the "Forgot password?" link below.
      </p>
    </div>
  );
};

export default EmailConfirmationAlert;
