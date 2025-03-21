
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-theme-peach">
      <div className="text-center px-6">
        <div className="mb-8">
          <div className="inline-block w-24 h-24 rounded-full bg-theme-navy/30 flex items-center justify-center">
            <svg className="w-12 h-12 text-theme-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
        <h1 className="text-5xl font-bold text-theme-navy mb-4">404</h1>
        <p className="text-xl text-theme-navy/70 mb-8 max-w-md mx-auto">
          We couldn't find the page you're looking for.
        </p>
        <a 
          href="/" 
          className="inline-block bg-theme-navy text-white text-sm font-medium py-3 px-6 rounded-full transition-all hover:bg-opacity-90 active:scale-95"
        >
          Return Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
