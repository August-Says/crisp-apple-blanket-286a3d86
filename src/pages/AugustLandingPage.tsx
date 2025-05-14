
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowRight, ChevronRight, LogIn, Heart, Target, BarChart, Users, MessageCircle } from 'lucide-react';
import AugustLogo from '@/components/AugustLogo';

const AugustLandingPage = () => {
  const navigate = useNavigate();
  
  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-peach">
      {/* Header/Navigation */}
      <header className="w-full z-10">
        <div className="container mx-auto py-6 px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <AugustLogo className="h-12 w-auto" />
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-navy font-medium hover:text-navy-light transition-colors">Features</a>
              <a href="#testimonials" className="text-navy font-medium hover:text-navy-light transition-colors">Testimonials</a>
              <a href="#pricing" className="text-navy font-medium hover:text-navy-light transition-colors">Pricing</a>
              <Button 
                variant="outline" 
                className="border-navy text-navy hover:bg-navy hover:text-peach"
                onClick={handleLoginClick}
              >
                <LogIn className="mr-2 h-4 w-4" /> Log in
              </Button>
            </nav>
            <div className="md:hidden flex items-center">
              <Button 
                variant="ghost" 
                className="text-navy"
                onClick={handleLoginClick}
              >
                <LogIn className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex-1 pt-10 md:pt-20 pb-16"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left side: Text content */}
            <div className="lg:w-1/2">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy leading-tight mb-6"
              >
                Create <span className="text-navy/90">Empathy.</span><br />
                Build <span className="text-navy/90">Connection.</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg md:text-xl text-navy/80 mb-8 max-w-lg"
              >
                We help brands understand and connect with audiences 
                through AI-driven sentiment analysis and interactive empathy canvasses.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-wrap gap-4 mb-8"
              >
                <Button 
                  className="bg-navy hover:bg-navy-light text-peach px-6 py-6 rounded-full text-lg"
                  onClick={() => navigate('/free-report')}
                >
                  Try Our Free Empathy Report
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  className="border-navy text-navy hover:bg-navy/10 px-6 py-6 rounded-full text-lg"
                >
                  Schedule a Demo
                </Button>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex flex-wrap gap-3"
              >
                <div className="py-2 px-4 bg-peach/20 border border-navy/10 rounded-full text-navy/80 text-sm">
                  Empathy Mapping
                </div>
                <div className="py-2 px-4 bg-peach/20 border border-navy/10 rounded-full text-navy/80 text-sm">
                  Customer Insights
                </div>
                <div className="py-2 px-4 bg-peach/20 border border-navy/10 rounded-full text-navy/80 text-sm">
                  Interactive Canvass
                </div>
                <div className="py-2 px-4 bg-peach/20 border border-navy/10 rounded-full text-navy/80 text-sm">
                  AI-Driven Analysis
                </div>
              </motion.div>
            </div>

            {/* Right side: Hero image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="lg:w-1/2"
            >
              <div className="rounded-2xl overflow-hidden border-4 border-navy/10 shadow-xl">
                <AspectRatio ratio={16/9}>
                  <div className="w-full h-full bg-gradient-peach-navy flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="mb-4 flex justify-center">
                        <Heart className="h-16 w-16 text-navy/40" />
                      </div>
                      <h3 className="text-2xl font-bold text-navy mb-2">Empathy Canvas</h3>
                      <p className="text-navy/70">
                        Visualize customer emotions & needs
                      </p>
                    </div>
                  </div>
                </AspectRatio>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Featured In Section */}
      <section className="py-12 bg-navy/5" id="features">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-lg font-medium text-navy/60">Trusted by companies across industries</h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {/* Company logos would go here - using text placeholders */}
            <div className="text-navy/40 text-lg font-bold">FINANCE CO</div>
            <div className="text-navy/40 text-lg font-bold">TECH BRAND</div>
            <div className="text-navy/40 text-lg font-bold">HEALTH SYSTEMS</div>
            <div className="text-navy/40 text-lg font-bold">RETAIL GROUP</div>
            <div className="text-navy/40 text-lg font-bold">EDUCATION INC</div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">How August Says Works</h2>
            <p className="text-navy/70 max-w-2xl mx-auto">
              Our simple process helps you understand your customers on a deeper level, 
              creating insights that drive meaningful connections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white/20 p-8 rounded-xl border border-navy/10"
            >
              <div className="bg-peach/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-navy font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Share Your Info</h3>
              <p className="text-navy/70">
                Tell us about your company, industry, and the challenges you're facing with your audience.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/20 p-8 rounded-xl border border-navy/10"
            >
              <div className="bg-peach/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-navy font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Get AI Insights</h3>
              <p className="text-navy/70">
                Our AI analyzes your data to create personalized insights about your customers' emotional needs and pain points.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/20 p-8 rounded-xl border border-navy/10"
            >
              <div className="bg-peach/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-navy font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Take Action</h3>
              <p className="text-navy/70">
                Use our interactive Empathy Canvass to make better decisions that resonate with your audience.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-navy/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-navy mb-4">Create Empathy For Your Clients</h2>
            <p className="text-navy/70 max-w-2xl mx-auto">
              August Says helps you understand your customers on a deeper level, creating insights
              that drive meaningful connections and profitable relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
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
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center p-6 glass-morphism rounded-xl"
            >
              <div className="bg-peach/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart size={28} className="text-navy" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">Measure Impact</h3>
              <p className="text-navy/70">
                Track key metrics and understand what's working in your customer relationships.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
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

      {/* Testimonial Section */}
      <section className="py-20" id="testimonials">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-navy mb-4">What Our Customers Say</h2>
            <p className="text-navy/70 max-w-2xl mx-auto">
              Hear from businesses that have transformed their customer relationships with August Says.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white/30 p-8 rounded-xl border border-navy/10"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-navy/20 mr-4"></div>
                <div>
                  <h4 className="text-navy font-bold">Sarah Johnson</h4>
                  <p className="text-navy/60 text-sm">Marketing Director, Tech Inc.</p>
                </div>
              </div>
              <p className="text-navy/80 italic">
                "August Says transformed how we communicate with our customers. The empathy canvass
                revealed emotional triggers we had completely missed in our messaging."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white/30 p-8 rounded-xl border border-navy/10"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-navy/20 mr-4"></div>
                <div>
                  <h4 className="text-navy font-bold">Michael Chang</h4>
                  <p className="text-navy/60 text-sm">CEO, Health Solutions</p>
                </div>
              </div>
              <p className="text-navy/80 italic">
                "The insights we gained helped us redesign our patient communication. Our satisfaction
                scores increased by 47% within just three months of implementation."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-navy/5" id="pricing">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-navy mb-4">Simple, Transparent Pricing</h2>
            <p className="text-navy/70 max-w-2xl mx-auto">
              Choose the plan that best fits your business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white/30 p-8 rounded-xl border border-navy/10"
            >
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-navy">Starter</h3>
                <div className="mt-4 mb-6">
                  <span className="text-3xl font-bold text-navy">$49</span>
                  <span className="text-navy/60">/month</span>
                </div>
                <p className="text-navy/70 mb-6">Perfect for small businesses just getting started.</p>
                <Button 
                  className="w-full bg-navy hover:bg-navy-light text-peach"
                >
                  Get Started
                </Button>
              </div>
              <div className="border-t border-navy/10 pt-6">
                <ul className="space-y-3">
                  <li className="flex items-center text-navy/80">
                    <ChevronRight className="h-4 w-4 mr-2 text-navy/50" />
                    <span>3 Empathy Reports</span>
                  </li>
                  <li className="flex items-center text-navy/80">
                    <ChevronRight className="h-4 w-4 mr-2 text-navy/50" />
                    <span>Basic Sentiment Analysis</span>
                  </li>
                  <li className="flex items-center text-navy/80">
                    <ChevronRight className="h-4 w-4 mr-2 text-navy/50" />
                    <span>Email Support</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-navy p-8 rounded-xl border border-navy/20 transform md:-translate-y-4 shadow-lg"
            >
              <div className="absolute -top-4 left-0 right-0 flex justify-center">
                <span className="bg-navy-light text-peach text-sm py-1 px-3 rounded-full">Most Popular</span>
              </div>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-peach">Business</h3>
                <div className="mt-4 mb-6">
                  <span className="text-3xl font-bold text-peach">$149</span>
                  <span className="text-peach/70">/month</span>
                </div>
                <p className="text-peach/80 mb-6">Ideal for growing companies with multiple brands.</p>
                <Button 
                  variant="outline"
                  className="w-full border-peach text-peach hover:bg-peach hover:text-navy"
                >
                  Get Started
                </Button>
              </div>
              <div className="border-t border-peach/20 pt-6">
                <ul className="space-y-3">
                  <li className="flex items-center text-peach/90">
                    <ChevronRight className="h-4 w-4 mr-2 text-peach/60" />
                    <span>Unlimited Empathy Reports</span>
                  </li>
                  <li className="flex items-center text-peach/90">
                    <ChevronRight className="h-4 w-4 mr-2 text-peach/60" />
                    <span>Advanced Sentiment Analysis</span>
                  </li>
                  <li className="flex items-center text-peach/90">
                    <ChevronRight className="h-4 w-4 mr-2 text-peach/60" />
                    <span>Priority Support</span>
                  </li>
                  <li className="flex items-center text-peach/90">
                    <ChevronRight className="h-4 w-4 mr-2 text-peach/60" />
                    <span>Customer Journey Mapping</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/30 p-8 rounded-xl border border-navy/10"
            >
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-navy">Enterprise</h3>
                <div className="mt-4 mb-6">
                  <span className="text-3xl font-bold text-navy">Custom</span>
                </div>
                <p className="text-navy/70 mb-6">Tailored solutions for large organizations.</p>
                <Button 
                  className="w-full bg-navy hover:bg-navy-light text-peach"
                >
                  Contact Us
                </Button>
              </div>
              <div className="border-t border-navy/10 pt-6">
                <ul className="space-y-3">
                  <li className="flex items-center text-navy/80">
                    <ChevronRight className="h-4 w-4 mr-2 text-navy/50" />
                    <span>Custom Integrations</span>
                  </li>
                  <li className="flex items-center text-navy/80">
                    <ChevronRight className="h-4 w-4 mr-2 text-navy/50" />
                    <span>Dedicated Account Manager</span>
                  </li>
                  <li className="flex items-center text-navy/80">
                    <ChevronRight className="h-4 w-4 mr-2 text-navy/50" />
                    <span>24/7 Premium Support</span>
                  </li>
                  <li className="flex items-center text-navy/80">
                    <ChevronRight className="h-4 w-4 mr-2 text-navy/50" />
                    <span>Custom Reporting</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">Ready to Build Deeper Customer Connections?</h2>
              <p className="text-navy/70 mb-8 text-lg">
                Get started today with a free empathy report and see how August Says can transform your customer relationships.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  className="bg-navy hover:bg-navy-light text-peach px-6 py-6 rounded-full text-lg"
                  onClick={() => navigate('/free-report')}
                >
                  Try For Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  className="border-navy text-navy hover:bg-navy/10 px-6 py-6 rounded-full text-lg"
                >
                  Schedule a Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy/10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <AugustLogo className="h-10 w-auto mb-4" />
              <p className="text-navy/70 mb-4">
                Creating empathy-driven connections between brands and their audiences.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-navy/60 hover:text-navy">
                  <span className="sr-only">Twitter</span>
                  <Users className="h-5 w-5" />
                </a>
                <a href="#" className="text-navy/60 hover:text-navy">
                  <span className="sr-only">LinkedIn</span>
                  <MessageCircle className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-navy mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-navy/70 hover:text-navy">Features</a></li>
                <li><a href="#" className="text-navy/70 hover:text-navy">Pricing</a></li>
                <li><a href="#" className="text-navy/70 hover:text-navy">Case Studies</a></li>
                <li><a href="#" className="text-navy/70 hover:text-navy">Resources</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-navy mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-navy/70 hover:text-navy">About</a></li>
                <li><a href="#" className="text-navy/70 hover:text-navy">Team</a></li>
                <li><a href="#" className="text-navy/70 hover:text-navy">Careers</a></li>
                <li><a href="#" className="text-navy/70 hover:text-navy">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-navy mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-navy/70 hover:text-navy">Privacy Policy</a></li>
                <li><a href="#" className="text-navy/70 hover:text-navy">Terms of Service</a></li>
                <li><a href="#" className="text-navy/70 hover:text-navy">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-navy/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-navy/60 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} August Says. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-navy/60 hover:text-navy text-sm">Privacy</a>
              <a href="#" className="text-navy/60 hover:text-navy text-sm">Terms</a>
              <a href="#" className="text-navy/60 hover:text-navy text-sm">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AugustLandingPage;
