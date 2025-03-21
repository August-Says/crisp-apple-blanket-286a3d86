
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { HelpCircle, User, ChevronDown, Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { signOut } from '@/services/authService';
import { supabase } from '@/integrations/supabase/client';

const AugustLogo = () => (
  <svg 
    width="32" 
    height="32" 
    viewBox="0 0 600 600" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="mr-2"
  >
    <path 
      d="M289.5 122L452 500H127L289.5 122Z M442 217.5C442 294.603 379.603 357 302.5 357C225.397 357 163 294.603 163 217.5C163 140.397 225.397 78 302.5 78C379.603 78 442 140.397 442 217.5Z M127 428C127 466.66 95.6599 498 57 498C18.3401 498 -13 466.66 -13 428C-13 389.34 18.3401 358 57 358C95.6599 358 127 389.34 127 428Z" 
      fill="#20374c"
    />
  </svg>
);

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      }
    );

    // Get the current user
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    
    getUser();

    // Clean up subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const userName = user?.email?.split('@')[0] || 'User';

  return (
    <nav className="w-full backdrop-blur-md bg-white/5 border-b border-white/10 fixed top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <AugustLogo />
              <span className="text-navy font-semibold text-2xl font-display">
                August Says
              </span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex space-x-8">
                <Link to="/templates" className="text-navy/80 hover:text-navy transition-colors px-3 py-2 text-sm font-medium">
                  Templates
                </Link>
                <Link to="/clients" className="text-navy/80 hover:text-navy transition-colors px-3 py-2 text-sm font-medium">
                  Clients
                </Link>
                <Link to="/resources" className="text-navy/80 hover:text-navy transition-colors px-3 py-2 text-sm font-medium">
                  Resources
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-navy/80 hover:bg-white/10 hover:text-navy">
              <HelpCircle size={20} />
            </Button>
            <div className="relative">
              <Button 
                variant="ghost" 
                className="flex items-center text-navy/80 hover:bg-white/10 hover:text-navy"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <User size={20} className="mr-2" />
                <span>{userName}</span>
                <ChevronDown size={16} className="ml-2" />
              </Button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10 glass-morphism">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-navy/90 hover:bg-white/10">
                    Your Profile
                  </Link>
                  <Link to="/settings" className="block px-4 py-2 text-sm text-navy/90 hover:bg-white/10">
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-navy/90 hover:bg-white/10"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-navy">
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] glass-morphism">
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                      <AugustLogo />
                      <span className="text-navy font-medium text-lg">August Says</span>
                    </div>
                  </div>
                  <nav className="flex flex-col space-y-4 py-6">
                    <Link to="/templates" className="text-navy/90 hover:text-navy px-3 py-2 text-base font-medium">
                      Templates
                    </Link>
                    <Link to="/clients" className="text-navy/90 hover:text-navy px-3 py-2 text-base font-medium">
                      Clients
                    </Link>
                    <Link to="/resources" className="text-navy/90 hover:text-navy px-3 py-2 text-base font-medium">
                      Resources
                    </Link>
                  </nav>
                  <div className="mt-auto border-t border-white/10 py-4">
                    <div className="flex items-center px-3 py-2">
                      <User size={20} className="text-navy/80 mr-3" />
                      <span className="text-navy/90 font-medium">{userName}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left text-navy/90 hover:text-navy px-3 py-2 text-base"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
