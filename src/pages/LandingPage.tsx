
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import InsightForm from '@/components/home/InsightForm';
import Testimonials from '@/components/home/Testimonials';
import ValuePropositions from '@/components/home/ValuePropositions';
import SecondaryCta from '@/components/home/SecondaryCta';

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

  return (
    <div className="flex flex-col items-center w-full animate-fade-in">
      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto px-4 pt-8 pb-16 md:pt-16 md:pb-24 text-center">
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
