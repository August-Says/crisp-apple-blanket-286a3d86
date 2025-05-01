
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Clipboard, CheckCircle } from 'lucide-react';
import AugustLogo from '@/components/AugustLogo';
import { FormSelect } from '@/components/ui/form/FormSelect';
import { FormInput } from '@/components/ui/form/FormInput';
import { FormTextarea } from '@/components/ui/form/FormTextarea';
import { useState } from 'react';

const industries = [
  { label: 'Healthcare', value: 'healthcare' },
  { label: 'SaaS', value: 'saas' },
  { label: 'Education', value: 'education' },
  { label: 'Retail', value: 'retail' },
  { label: 'Financial Services', value: 'finance' },
  { label: 'Manufacturing', value: 'manufacturing' }
];

const Home = () => {
  const navigate = useNavigate();
  const [industry, setIndustry] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [painPoints, setPainPoints] = useState('');

  const handleQuickStart = () => {
    if (companyName && industry) {
      navigate('/fields', { 
        state: { 
          companyName,
          industry,
          painPoints
        } 
      });
    }
  };

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

        {/* Main Feature Card */}
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="glass-morphism border-navy/10 overflow-hidden">
              <CardHeader className="pb-2">
                <div className="w-full flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-peach/20">
                    <Clipboard size={32} className="text-navy" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-navy">Start with Industry & Pain Points</CardTitle>
                <CardDescription className="text-navy/70">
                  Tell us your industry and challenges—we'll generate real-time AI insights.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4 mt-2">
                  <div className="space-y-2">
                    <label htmlFor="industry" className="text-navy font-medium">
                      Select Your Industry
                    </label>
                    <FormSelect
                      id="industry"
                      value={industry}
                      onChange={setIndustry}
                      options={industries}
                      placeholder="Choose an industry"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-navy font-medium">
                      Company Name
                    </label>
                    <FormInput
                      id="company"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Your company name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="painPoints" className="text-navy font-medium">
                      Describe Your Pain Points (Optional)
                    </label>
                    <FormTextarea
                      id="painPoints"
                      value={painPoints}
                      onChange={(e) => setPainPoints(e.target.value)}
                      placeholder="What challenges are you facing?"
                      rows={3}
                    />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleQuickStart} 
                  variant="navyGradient" 
                  className="w-full font-medium"
                  disabled={!industry || !companyName}
                >
                  Generate My Free Report
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="w-full bg-navy/5 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-navy text-center mb-12">What Our Clients Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-morphism p-6 rounded-2xl"
            >
              <p className="italic text-navy/80 mb-4">
                "August Says transformed how we gather customer feedback. The sentiment analysis provided actionable insights that led to a 30% improvement in customer satisfaction scores."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-navy/20 flex items-center justify-center text-navy font-bold">JD</div>
                <div className="ml-3">
                  <p className="font-medium text-navy">Jane Doe</p>
                  <p className="text-sm text-navy/70">CMO, TechCorp</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-morphism p-6 rounded-2xl"
            >
              <p className="italic text-navy/80 mb-4">
                "The gamified approach to surveys increased our response rate by 45%. The AI-driven insights helped us prioritize product features our customers actually wanted."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-navy/20 flex items-center justify-center text-navy font-bold">MS</div>
                <div className="ml-3">
                  <p className="font-medium text-navy">Mike Smith</p>
                  <p className="text-sm text-navy/70">Product Director, EdTech Inc</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="w-full py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-navy text-center mb-12">Why Choose August Says</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-peach/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-navy">
                  <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/>
                  <path d="m22 11.5-9.04 4.12a2 2 0 0 1-1.92 0L2 11.5"/>
                  <path d="m22 16-9.04 4.12a2 2 0 0 1-1.92 0L2 16"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">Gamified Feedback</h3>
              <p className="text-navy/70">
                Engage customers with interactive surveys that feel like games, increasing completion rates by 70%.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="bg-peach/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-navy">
                  <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/>
                  <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/>
                  <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">Instant AI Insights</h3>
              <p className="text-navy/70">
                Our advanced AI analyzes sentiment and delivers actionable insights in seconds, not days or weeks.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="bg-peach/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-navy">
                  <rect width="8" height="8" x="2" y="2" rx="1"/>
                  <path d="M14 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2"/>
                  <path d="M20 2c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2"/>
                  <path d="M10 18H3c-.6 0-1-.4-1-1V7"/>
                  <rect width="8" height="8" x="14" y="14" rx="1"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">Tailored to Your Industry</h3>
              <p className="text-navy/70">
                Industry-specific insights that understand the unique challenges and opportunities in your sector.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Secondary CTA */}
      <section className="w-full py-16 bg-gradient-to-r from-navy/10 to-navy/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-navy mb-4">Ready for Deeper Insight?</h2>
            <p className="text-xl text-navy/70 mb-8 max-w-2xl mx-auto">
              Unlock premium features including advanced sentiment analysis, competitor benchmarking, and trend forecasting.
            </p>
            <Button 
              variant="outline" 
              className="font-medium text-navy border-navy hover:bg-navy hover:text-peach transition-colors px-8 py-6 text-lg"
            >
              Upgrade to Premium
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
