
import { useNavigate } from 'react-router-dom';
import HeroSection from '@/components/home/HeroSection';
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

const Home = () => {
  return (
    <div className="flex flex-col items-center w-full animate-fade-in">
      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto px-4 pt-8 pb-16 md:pt-16 md:pb-24 text-center">
        <HeroSection />
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

export default Home;
