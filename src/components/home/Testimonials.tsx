
import { motion } from 'framer-motion';

const Testimonials = () => {
  return (
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
  );
};

export default Testimonials;
