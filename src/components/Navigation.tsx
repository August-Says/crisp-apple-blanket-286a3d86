
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex items-center justify-between px-8 h-16 md:h-[64px]',
        scrolled 
          ? 'bg-theme-peach/80 backdrop-blur-lg border-b border-theme-peach/50 shadow-sm' 
          : 'bg-transparent'
      )}
    >
      <div className="flex items-center">
        <a href="/" className="font-medium text-theme-navy transition-opacity hover:opacity-70">
          Product
        </a>
      </div>
      
      <nav className="hidden md:flex items-center space-x-8">
        <NavLink href="#features">Features</NavLink>
        <NavLink href="#specs">Specs</NavLink>
        <NavLink href="#gallery">Gallery</NavLink>
        <NavLink href="#buy">Buy</NavLink>
      </nav>
      
      <div className="flex items-center">
        <button className="bg-theme-navy text-white text-sm font-medium py-2 px-4 rounded-full transition-all hover:bg-theme-navy/90 active:scale-95">
          Pre-order
        </button>
      </div>
    </header>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-sm text-theme-navy/80 transition-colors hover:text-theme-navy"
  >
    {children}
  </a>
);

export default Navigation;
