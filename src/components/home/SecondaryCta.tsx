
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const SecondaryCta = () => {
  return (
    <section className="w-full py-16 bg-gradient-to-r from-navy/10 to-navy/5">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-navy mb-4">Ready for Deeper Customer Understanding?</h2>
          <p className="text-xl text-navy/70 mb-8 max-w-2xl mx-auto">
            Unlock premium features including advanced sentiment analysis, customized empathy canvasses, 
            and comprehensive customer journey mapping.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              variant="navyGradient"
              className="font-medium px-8 py-6 text-lg"
            >
              Start Free Trial
            </Button>
            <Button 
              variant="outline" 
              className="font-medium text-navy border-navy hover:bg-navy hover:text-peach transition-colors px-8 py-6 text-lg"
            >
              Schedule Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SecondaryCta;
