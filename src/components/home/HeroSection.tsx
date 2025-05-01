
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
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
  );
};

export default HeroSection;
