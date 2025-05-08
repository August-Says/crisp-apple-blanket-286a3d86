
import { motion } from 'framer-motion';
import { BarChart, BrainCircuit, Building, Briefcase } from 'lucide-react';

const ValuePropositions = () => {
  return (
    <section className="w-full py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-navy text-center mb-6">Why Choose August Says</h2>
        <p className="text-lg text-navy/70 text-center max-w-3xl mx-auto mb-12">
          We combine cutting-edge AI with proven empathy mapping techniques to create 
          meaningful insights that drive business growth.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <div className="bg-peach/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BrainCircuit size={28} className="text-navy" />
            </div>
            <h3 className="text-xl font-bold text-navy mb-2">AI-Powered Insights</h3>
            <p className="text-navy/70">
              Our advanced AI analyzes sentiment and delivers actionable insights in seconds, not days or weeks.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <div className="bg-peach/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart size={28} className="text-navy" />
            </div>
            <h3 className="text-xl font-bold text-navy mb-2">Measurable Results</h3>
            <p className="text-navy/70">
              Track ROI and customer sentiment metrics to prove the value of your marketing efforts.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <div className="bg-peach/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building size={28} className="text-navy" />
            </div>
            <h3 className="text-xl font-bold text-navy mb-2">Industry-Specific</h3>
            <p className="text-navy/70">
              Industry-specific insights that understand the unique challenges and opportunities in your sector.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center"
          >
            <div className="bg-peach/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase size={28} className="text-navy" />
            </div>
            <h3 className="text-xl font-bold text-navy mb-2">Enterprise Ready</h3>
            <p className="text-navy/70">
              Secure, scalable platform built to support businesses of all sizes from startups to Fortune 500.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ValuePropositions;
