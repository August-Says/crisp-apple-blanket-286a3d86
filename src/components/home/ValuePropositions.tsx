
import { motion } from 'framer-motion';

const ValuePropositions = () => {
  return (
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
  );
};

export default ValuePropositions;
