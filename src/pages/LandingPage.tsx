
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import InsightForm from '@/components/home/InsightForm';
import Testimonials from '@/components/home/Testimonials';
import ValuePropositions from '@/components/home/ValuePropositions';
import SecondaryCta from '@/components/home/SecondaryCta';
import { LogIn, BarChart, Heart, Target, UserCheck } from 'lucide-react';
import AugustHeroSection from '@/components/home/AugustHeroSection';

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
      <AugustHeroSection />
      
      {/* Form Section */}
      <section className="w-full max-w-6xl mx-auto px-4 pt-4 pb-16 md:pt-8 md:pb-24 text-center">
        <InsightForm industries={industries} />
      </section>

      {/* Features Section */}
      <section className="w-full py-16 px-4 bg-navy/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-navy text-center mb-4">Create Empathy For Your Clients</h2>
          <p className="text-navy/70 text-center max-w-3xl mx-auto mb-12">
            August Says helps you understand your customers on a deeper level, creating insights that drive meaningful connections and profitable relationships.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center p-6 glass-morphism rounded-xl"
            >
              <div className="bg-peach/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart size={28} className="text-navy" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">Build Empathy</h3>
              <p className="text-navy/70">
                Understand your customers' emotional needs and create deeper connections that drive loyalty.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center p-6 glass-morphism rounded-xl"
            >
              <div className="bg-peach/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart size={28} className="text-navy" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">Measure Effectiveness</h3>
              <p className="text-navy/70">
                Track key metrics and understand what's working in your customer relationships.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center p-6 glass-morphism rounded-xl"
            >
              <div className="bg-peach/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target size={28} className="text-navy" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">Increase ROI</h3>
              <p className="text-navy/70">
                Convert insights into actions that improve customer retention and maximize your marketing spend.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <Testimonials />

      {/* Value Propositions */}
      <ValuePropositions />

      {/* How It Works Section */}
      <section className="w-full py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-navy text-center mb-12">How August Says Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="flex items-start">
                  <div className="bg-peach/20 w-10 h-10 rounded-full flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                    <span className="font-bold text-navy">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy mb-2">Share Your Company Info</h3>
                    <p className="text-navy/70">Tell us about your company, industry, and specific challenges you're facing.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-peach/20 w-10 h-10 rounded-full flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                    <span className="font-bold text-navy">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy mb-2">Get AI-Generated Insights</h3>
                    <p className="text-navy/70">Our AI analyzes your data and creates personalized insights about your customers.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-peach/20 w-10 h-10 rounded-full flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                    <span className="font-bold text-navy">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy mb-2">Take Action With Confidence</h3>
                    <p className="text-navy/70">Use our interactive Empathy Canvass to make better decisions that resonate with your audience.</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-peach/10 rounded-2xl p-6 border border-navy/10"
            >
              <div className="aspect-video bg-navy/5 rounded-lg flex items-center justify-center">
                <UserCheck size={64} className="text-navy/40" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Secondary CTA */}
      <SecondaryCta />
    </div>
  );
};

export default LandingPage;
