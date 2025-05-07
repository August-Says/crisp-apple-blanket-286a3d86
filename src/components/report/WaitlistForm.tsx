
import { useState } from 'react';
import { FormInput } from '@/components/ui/form/FormInput';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const WaitlistForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleJoinWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call to add to waitlist
    setTimeout(() => {
      toast.success('Thank you! You have been added to our waitlist.');
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="mt-8 py-8 px-6 bg-navy/5 rounded-xl border border-navy/10">
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
    </div>
  );
};

export default WaitlistForm;
