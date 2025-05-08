
import { motion } from 'framer-motion';

const AugustHeroSection = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 pt-12 pb-8 md:pt-24 md:pb-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-6 leading-tight">
          Create <span className="text-navy/90">Empathy.</span> Build <span className="text-navy/90">Connection.</span>
        </h1>
        <p className="text-xl text-navy/80 max-w-3xl mx-auto mb-6">
          We help businesses understand and connect with their audiences through 
          AI-driven sentiment analysis and interactive empathy canvasses.
        </p>
        <p className="text-lg text-navy/70 max-w-xl mx-auto">
          Our platform transforms customer feedback into actionable insights that drive growth.
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-4 mb-8"
      >
        <div className="py-2 px-4 bg-peach/20 rounded-full text-navy font-medium text-sm">
          Empathy Mapping
        </div>
        <div className="py-2 px-4 bg-peach/20 rounded-full text-navy font-medium text-sm">
          Customer Insights
        </div>
        <div className="py-2 px-4 bg-peach/20 rounded-full text-navy font-medium text-sm">
          Interactive Canvass
        </div>
        <div className="py-2 px-4 bg-peach/20 rounded-full text-navy font-medium text-sm">
          AI-Driven Analysis
        </div>
      </motion.div>
    </section>
  );
};

export default AugustHeroSection;
