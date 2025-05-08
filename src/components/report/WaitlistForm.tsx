import { useState } from 'react';
import { FormInput } from '@/components/ui/form/FormInput';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PartyPopper } from 'lucide-react';

const WaitlistForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine if we're on the free report page
  const isOnFreeReport = location.pathname === '/free-report';

  const handleJoinWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Here we would normally send the email to a backend service
      // For now we'll simulate the API call
      console.log('Email captured:', email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success animation
      setShowSuccess(true);
      
      // Store the email locally for demonstration
      localStorage.setItem('waitlistEmail', email);
      
      toast.success('Thank you! You have been added to our waitlist.');
      
      // Reset form
      setEmail('');
      setIsSubmitting(false);
      
      // Redirect to login page after displaying success for 2 seconds
      setTimeout(() => {
        navigate('/login', { 
          state: { from: isOnFreeReport ? 'free-report' : 'report' }
        });
      }, 2000);
    } catch (error) {
      console.error('Error submitting waitlist form:', error);
      toast.error('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8 py-8 px-6 bg-navy/5 rounded-xl border border-navy/10">
      {showSuccess ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-8"
        >
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              scale: [1, 1.2, 1] 
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop"
            }}
            className="mb-4 text-navy"
          >
            <PartyPopper size={64} />
          </motion.div>
          <h2 className="text-2xl font-bold text-navy text-center">
            Thank you for joining!
          </h2>
          <p className="text-navy/70 text-center mt-2">
            We're excited to have you on board. Redirecting you to login...
          </p>
        </motion.div>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-navy text-center mb-4">
            Join our Waitlist
          </h2>
          <p className="text-navy/70 text-center mb-6">
            Be the first to know when the full version of August Says Sentiment Analysis Application is available.
            Get exclusive early access and special launch pricing!
          </p>
          
          <form onSubmit={handleJoinWaitlist} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <FormInput
                id="waitlist-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-grow"
              />
              <Button 
                type="submit" 
                variant="navyGradient"
                disabled={isSubmitting}
                className="whitespace-nowrap"
              >
                {isSubmitting ? 'Joining...' : 'Join Waitlist'}
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default WaitlistForm;
