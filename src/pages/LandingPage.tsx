
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import InsightForm from '@/components/home/InsightForm';
import Testimonials from '@/components/home/Testimonials';
import ValuePropositions from '@/components/home/ValuePropositions';
import SecondaryCta from '@/components/home/SecondaryCta';
import { LogIn } from 'lucide-react';

const industries = [
  { label: 'Healthcare', value: 'healthcare' },
  { label: 'SaaS', value: 'saas' },
  { label: 'Education', value: 'education' },
  { label: 'Retail', value: 'retail' },
  { label: 'Financial Services', value: 'finance' },
  { label: 'Manufacturing', value: 'manufacturing' }
];

const LandingPage = () => {
  const navigate = useNavigate();
  
  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center w-full animate-fade-in">
      {/* Login Button */}
      <div className="w-full flex justify-end px-6 py-4">
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 text-navy hover:bg-white/10"
          onClick={handleLoginClick}
        >
          <LogIn size={18} />
          <span>Login</span>
        </Button>
      </div>

      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto px-4 pt-4 pb-16 md:pt-8 md:pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-6 leading-tight">
            Unlock Genuine Customer Insights Through Interactive Sentiment Analysis
          </h1>
          <p className="text-xl text-navy/80 max-w-3xl mx-auto">
            Engage your audience with gamified surveys and receive instant AI-driven sentiment reports tailored to your industry.
          </p>
        </motion.div>
        <InsightForm industries={industries} />
      </section>

      {/* Social Proof Section */}
      <Testimonials />

      {/* Value Propositions */}
      <ValuePropositions />

      {/* Secondary CTA */}
      <SecondaryCta />
    </div>
  );
};

export default LandingPage;
