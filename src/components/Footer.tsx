
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-auto py-6 backdrop-blur-sm bg-black/10 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-navy/80 text-sm">
              © {currentYear} August Says. All rights reserved.
            </span>
          </div>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-navy/60 hover:text-navy text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-navy/60 hover:text-navy text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="text-navy/60 hover:text-navy text-sm transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
