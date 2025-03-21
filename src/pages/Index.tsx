
import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import ProductShowcase from '@/components/ProductShowcase';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Initialize scroll position at top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      <Navigation />
      <main>
        <Hero />
        <Features />
        <ProductShowcase />
        
        {/* Gallery Section */}
        <section id="gallery" className="py-24 bg-white">
          <div className="container max-w-7xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-apple-black mb-16 text-center">Gallery</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div 
                  key={item}
                  className="aspect-square bg-apple-silver/30 rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                >
                  <div className="w-full h-full bg-gradient-to-br from-apple-silver to-white flex items-center justify-center">
                    <div className={`w-2/3 h-2/3 rounded-2xl bg-apple-blue/10 transform rotate-${(item * 15) % 45}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call-to-Action Section */}
        <section id="buy" className="relative py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-apple-blue/20 to-apple-blue/10"></div>
          
          <div className="container max-w-7xl mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-apple-black mb-6">Ready to Experience?</h2>
              <p className="text-xl text-apple-gray mb-10">
                Begin your journey with our revolutionary product. Pre-order today and be among the first to experience the future.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="bg-apple-blue text-white text-sm font-medium py-4 px-8 rounded-full transition-all hover:bg-opacity-90 active:scale-95">
                  Pre-order now
                </button>
                <button className="bg-white text-apple-black text-sm font-medium py-4 px-8 rounded-full shadow-md transition-all hover:shadow-lg active:scale-95">
                  Learn more
                </button>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-apple-blue/10 rounded-full blur-3xl"></div>
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-apple-blue/10 rounded-full blur-3xl"></div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
