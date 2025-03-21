
import React, { useEffect, useRef } from 'react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const opacity = 1 - scrollY / 500; // Fade out as user scrolls
      const scale = 1 - scrollY / 2000; // Slight zoom out effect
      const translateY = scrollY * 0.5; // Parallax effect
      
      heroRef.current.style.opacity = `${Math.max(opacity, 0)}`;
      heroRef.current.style.transform = `scale(${Math.max(scale, 0.95)}) translateY(${translateY}px)`;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-theme-peach">
      <div 
        ref={heroRef}
        className="container max-w-7xl mx-auto px-6 py-24 flex flex-col items-center text-center transform transition-all duration-100 ease-out"
      >
        <div className="overflow-hidden">
          <span className="inline-block text-sm uppercase tracking-widest text-theme-navy font-medium mb-6 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            Introducing
          </span>
        </div>
        
        <div className="overflow-hidden mb-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-theme-navy animate-fade-up" style={{ animationDelay: '0.4s' }}>
            Product
          </h1>
        </div>
        
        <div className="overflow-hidden mb-8">
          <p className="text-xl md:text-2xl text-theme-navy/70 max-w-2xl animate-fade-up" style={{ animationDelay: '0.5s' }}>
            Designed to perfection. Engineered to inspire.
          </p>
        </div>
        
        <div className="overflow-hidden">
          <div className="animate-fade-up" style={{ animationDelay: '0.6s' }}>
            <button className="bg-theme-navy text-white text-sm font-medium py-3 px-6 rounded-full transition-all hover:bg-opacity-90 active:scale-95 mr-4">
              Learn more
            </button>
            <button className="bg-transparent text-theme-navy text-sm font-medium py-3 px-6 rounded-full transition-all hover:bg-theme-navy/5 active:scale-95">
              Watch the film
            </button>
          </div>
        </div>
        
        <div className="absolute inset-x-0 bottom-12 flex justify-center animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="w-6 h-10 border-2 border-theme-navy/30 rounded-full flex items-start justify-center">
            <div className="w-1.5 h-1.5 bg-theme-navy/50 rounded-full mt-2 animate-float"></div>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-theme-peach/70"></div>
    </section>
  );
};

export default Hero;
