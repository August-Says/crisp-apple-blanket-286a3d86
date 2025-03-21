import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { HelpCircle, User, ChevronDown, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { signOut } from '@/services/authService';
import { supabase } from '@/integrations/supabase/client';

const AugustLogo = () => (
  <svg 
    width="40" 
    height="40" 
    viewBox="0 0 66 66" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="mr-2"
  >
    <path 
      d="M31.6797 0.283203C38.0703 0.283203 43.1016 2.54688 46.7734 7.07422C50.4922 11.6016 52.3516 17.625 52.3516 25.1445C52.3516 32.7109 50.4922 38.7578 46.7734 43.2852C43.1016 47.8125 38.0703 50.0762 31.6797 50.0762C25.2891 50.0762 20.2344 47.8125 16.5156 43.2852C12.8438 38.7578 11.0078 32.7109 11.0078 25.1445C11.0078 17.625 12.8438 11.6016 16.5156 7.07422C20.2344 2.54688 25.2891 0.283203 31.6797 0.283203ZM31.6797 39.8145C34.4219 39.8145 36.4688 38.4336 37.8203 35.6719C39.1719 32.9102 39.8477 29.2617 39.8477 24.7266C39.8477 20.1914 39.1719 16.543 37.8203 13.7812C36.4688 11.0195 34.4219 9.63867 31.6797 9.63867C28.9375 9.63867 26.8906 11.0195 25.5391 13.7812C24.1875 16.543 23.5117 20.1914 23.5117 24.7266C23.5117 29.2617 24.1875 32.9102 25.5391 35.6719C26.8906 38.4336 28.9375 39.8145 31.6797 39.8145Z" 
      fill="#20374C"
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
