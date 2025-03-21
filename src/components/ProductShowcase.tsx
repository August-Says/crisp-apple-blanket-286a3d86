
import React, { useRef, useEffect } from 'react';

const ProductShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !productRef.current) return;
      
      const { top, height } = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollProgress = 1 - (top / (windowHeight - height * 0.5));
      
      // Control rotation based on scroll position
      if (scrollProgress >= 0 && scrollProgress <= 1) {
        const rotation = scrollProgress * 360;
        const scale = 0.8 + (scrollProgress * 0.2);
        productRef.current.style.transform = `rotate(${rotation}deg) scale(${scale})`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="specs" 
      className="relative py-32 bg-gradient-to-b from-white to-theme-peach/30 overflow-hidden"
    >
      <div className="container max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-12 md:mb-0">
            <div className="max-w-lg">
              <h2 className="text-4xl md:text-5xl font-bold text-theme-navy mb-6">Technical Brilliance</h2>
              <p className="text-xl text-theme-navy/70 mb-8">
                Revolutionary technology housed in an elegant design, pushing the boundaries of what's possible.
              </p>
              
              <div className="space-y-6">
                <Spec title="Performance" value="Next-generation architecture" />
                <Spec title="Battery" value="Up to 18 hours" />
                <Spec title="Display" value="Stunning Retina XDR display" />
                <Spec title="Memory" value="Configurable up to 64GB" />
              </div>
              
              <button className="mt-10 bg-theme-navy text-white text-sm font-medium py-3 px-6 rounded-full transition-all hover:bg-opacity-90 active:scale-95">
                Full specifications
              </button>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex justify-center">
            <div 
              ref={productRef}
              className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-gradient-to-br from-theme-peach to-white rounded-full flex items-center justify-center shadow-lg transition-transform duration-100"
            >
              <div className="w-64 h-64 md:w-80 md:h-80 bg-theme-navy rounded-3xl glass transform rotate-12 transition-all duration-300"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-theme-navy/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-10 w-48 h-48 bg-theme-navy/10 rounded-full blur-3xl"></div>
    </section>
  );
};

const Spec = ({ title, value }: { title: string; value: string }) => (
  <div className="border-b border-gray-200 pb-4">
    <div className="flex justify-between items-center">
      <span className="text-theme-navy/70 font-medium">{title}</span>
      <span className="text-theme-navy font-medium">{value}</span>
    </div>
  </div>
);

export default ProductShowcase;
