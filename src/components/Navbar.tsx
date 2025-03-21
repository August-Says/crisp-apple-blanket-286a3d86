
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { HelpCircle, User, ChevronDown, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { signOut } from '@/services/authService';
import { supabase } from '@/integrations/supabase/client';

const AugustLogo = () => (
  <svg 
    className="h-10 mr-2" 
    xmlns="http://www.w3.org/2000/svg" 
    version="1.1" 
    viewBox="0 0 1920 1080"
  >
    <defs>
      <style>
        {`.st0 {
          fill: #ffd2c8;
        }
        .st1 {
          fill: #20374c;
        }`}
      </style>
    </defs>
    <g>
      <g>
        <circle className="st1" cx="367.4" cy="306" r="25.3"/>
        <polygon className="st1" points="473.3 331.4 419.1 331.4 356.4 222.8 410.7 222.8 473.3 331.4"/>
        <path className="st1" d="M548.4,234.2c-19.7-19.7-51.7-19.7-71.4,0-19.7,19.7-19.7,51.7,0,71.4l71.4-71.4Z"/>
        <path className="st1" d="M542.3,247.1c19.7,19.7,19.7,51.7,0,71.4-19.7,19.7-51.7,19.7-71.4,0l71.4-71.4Z"/>
      </g>
      <g>
        <path className="st1" d="M618.1,261.2h-18.4l-3,8.8h-9.7l16.6-46.1h10.8l16.6,46.1h-9.8l-3-8.8ZM615.6,253.8l-6.7-19.3-6.7,19.3h13.3Z"/>
        <path className="st1" d="M668.4,233.4v36.6h-9.3v-4.6c-1.2,1.6-2.7,2.8-4.7,3.7-1.9.9-4,1.4-6.2,1.4s-5.4-.6-7.6-1.8c-2.2-1.2-3.9-3-5.2-5.3-1.3-2.4-1.9-5.2-1.9-8.4v-21.5h9.2v20.1c0,2.9.7,5.1,2.2,6.7,1.5,1.6,3.4,2.3,5.9,2.3s4.6-.8,6-2.3c1.5-1.6,2.2-3.8,2.2-6.7v-20.1h9.3Z"/>
        <path className="st1" d="M695.7,234.4c2.1,1.1,3.7,2.5,4.9,4.2v-5.2h9.3v36.8c0,3.4-.7,6.4-2,9.1-1.4,2.7-3.4,4.8-6.1,6.3-2.7,1.6-6,2.3-9.9,2.3s-9.5-1.2-12.8-3.6c-3.3-2.4-5.2-5.7-5.6-9.9h9.2c.5,1.7,1.5,3,3.1,4,1.6,1,3.6,1.5,5.8,1.5s4.9-.8,6.5-2.4c1.7-1.6,2.5-4,2.5-7.3v-5.7c-1.2,1.7-2.8,3.1-4.9,4.3-2.1,1.1-4.5,1.7-7.2,1.7s-5.9-.8-8.4-2.4c-2.6-1.6-4.6-3.8-6-6.7-1.5-2.9-2.2-6.2-2.2-9.9s.7-7,2.2-9.8c1.5-2.9,3.5-5.1,6-6.6,2.5-1.5,5.4-2.3,8.5-2.3s5.1.5,7.2,1.6ZM699.3,245.9c-.9-1.6-2.1-2.8-3.6-3.7-1.5-.9-3.1-1.3-4.8-1.3s-3.3.4-4.8,1.3c-1.5.8-2.6,2.1-3.5,3.7-.9,1.6-1.4,3.5-1.4,5.7s.5,4.1,1.4,5.8c.9,1.7,2.1,2.9,3.6,3.8,1.5.9,3,1.3,4.7,1.3s3.3-.4,4.8-1.3c1.5-.9,2.7-2.1,3.6-3.7.9-1.6,1.3-3.5,1.3-5.8s-.4-4.2-1.3-5.8Z"/>
        <path className="st1" d="M750.1,233.4v36.6h-9.3v-4.6c-1.2,1.6-2.7,2.8-4.7,3.7-1.9.9-4,1.4-6.2,1.4s-5.4-.6-7.6-1.8c-2.2-1.2-3.9-3-5.2-5.3-1.3-2.4-1.9-5.2-1.9-8.4v-21.5h9.2v20.1c0,2.9.7,5.1,2.2,6.7,1.5,1.6,3.4,2.3,5.9,2.3s4.6-.8,6-2.3c1.5-1.6,2.2-3.8,2.2-6.7v-20.1h9.3Z"/>
        <path className="st1" d="M761.9,268.9c-2.4-1.1-4.3-2.5-5.6-4.4-1.4-1.8-2.1-3.9-2.3-6.1h9.3c.2,1.4.9,2.6,2.1,3.5,1.2.9,2.7,1.4,4.5,1.4s3.1-.4,4.1-1.1c1-.7,1.5-1.6,1.5-2.7s-.6-2.1-1.8-2.7c-1.2-.6-3.1-1.2-5.8-1.9-2.7-.7-5-1.3-6.7-2-1.7-.7-3.2-1.8-4.5-3.2-1.3-1.5-1.9-3.4-1.9-5.9s.6-3.9,1.8-5.5c1.2-1.7,2.8-3,5-4,2.2-1,4.7-1.5,7.7-1.5,4.4,0,7.8,1.1,10.4,3.3,2.6,2.2,4,5.1,4.3,8.8h-8.8c-.1-1.5-.7-2.6-1.8-3.5-1.1-.9-2.5-1.3-4.3-1.3s-3,.3-3.9.9c-.9.6-1.4,1.5-1.4,2.6s.6,2.2,1.8,2.8c1.2.6,3.1,1.3,5.7,1.9,2.6.7,4.8,1.3,6.5,2,1.7.7,3.2,1.8,4.5,3.3,1.3,1.5,1.9,3.4,1.9,5.8,0,2.1-.6,4-1.8,5.7-1.2,1.7-2.8,3-5,3.9s-4.7,1.4-7.6,1.4-5.7-.5-8.1-1.6Z"/>
        <path className="st1" d="M799.4,241v17.7c0,1.2.3,2.1.9,2.7.6.6,1.6.8,3,.8h4.3v7.8h-5.8c-7.8,0-11.7-3.8-11.7-11.4v-17.6h-4.4v-7.6h4.4v-9h9.3v9h8.2v7.6h-8.2Z"/>
        <path className="st1" d="M597.1,328.2c-2.6-1.1-4.6-2.7-6.1-4.8-1.5-2.1-2.3-4.5-2.3-7.3h9.9c.1,1.9.8,3.4,2,4.5,1.2,1.1,2.9,1.7,5,1.7s3.9-.5,5.1-1.6c1.2-1,1.8-2.4,1.8-4.1s-.4-2.5-1.3-3.4c-.8-.9-1.9-1.6-3.1-2.1-1.3-.5-3-1.1-5.2-1.7-3-.9-5.4-1.7-7.3-2.6-1.9-.9-3.5-2.2-4.8-3.9-1.3-1.7-2-4.1-2-7s.7-5.1,2-7.1c1.4-2,3.3-3.6,5.7-4.7,2.5-1.1,5.3-1.6,8.4-1.6,4.8,0,8.6,1.2,11.6,3.5,3,2.3,4.6,5.5,4.9,9.7h-10.2c0-1.6-.8-2.9-2-3.9-1.3-1-2.9-1.6-5-1.6s-3.2.5-4.3,1.4c-1.1.9-1.6,2.3-1.6,4s.4,2.3,1.2,3.1c.8.8,1.8,1.5,3,2,1.2.5,2.9,1.1,5.1,1.8,3,.9,5.4,1.8,7.3,2.6,1.9.9,3.5,2.2,4.9,4,1.4,1.8,2,4.1,2,6.9s-.6,4.8-1.9,6.9c-1.3,2.1-3.1,3.8-5.6,5-2.5,1.3-5.4,1.9-8.8,1.9s-6.1-.5-8.7-1.6Z"/>
        <path className="st1" d="M626.6,301.1c1.5-2.9,3.5-5.1,6-6.6,2.5-1.5,5.4-2.3,8.5-2.3s5.1.6,7.2,1.7c2,1.1,3.7,2.5,4.9,4.2v-5.2h9.3v36.6h-9.3v-5.3c-1.2,1.7-2.8,3.1-4.9,4.3-2.1,1.1-4.5,1.7-7.2,1.7s-5.9-.8-8.4-2.4c-2.5-1.6-4.5-3.8-6-6.7-1.5-2.9-2.2-6.2-2.2-9.9s.7-7,2.2-9.8ZM651.9,305.3c-.9-1.6-2.1-2.8-3.6-3.7-1.5-.9-3.1-1.3-4.8-1.3s-3.3.4-4.8,1.3-2.6,2.1-3.5,3.7c-.9,1.6-1.4,3.5-1.4,5.7s.5,4.1,1.4,5.8c.9,1.7,2.1,2.9,3.6,3.8,1.5.9,3,1.3,4.7,1.3s3.3-.4,4.8-1.3c1.5-.9,2.7-2.1,3.6-3.7.9-1.6,1.3-3.5,1.3-5.8s-.4-4.2-1.3-5.8Z"/>
        <path className="st1" d="M703.2,292.8l-22.6,53.9h-9.8l7.9-18.2-14.7-35.6h10.4l9.4,25.5,9.6-25.5h9.8Z"/>
        <path className="st1" d="M710.8,328.3c-2.4-1.1-4.3-2.5-5.6-4.4-1.4-1.8-2.1-3.9-2.3-6.1h9.3c.2,1.4.9,2.6,2.1,3.5,1.2.9,2.7,1.4,4.5,1.4s3.1-.4,4.1-1.1,1.5-1.6,1.5-2.7-.6-2.1-1.8-2.7c-1.2-.6-3.1-1.2-5.8-1.9-2.7-.7-5-1.3-6.7-2-1.7-.7-3.2-1.8-4.5-3.2-1.3-1.5-1.9-3.4-1.9-5.9s.6-3.9,1.7-5.5c1.2-1.7,2.8-3,5-4,2.2-1,4.7-1.5,7.7-1.5,4.4,0,7.8,1.1,10.4,3.3s4,5.1,4.3,8.8h-8.8c-.1-1.5-.7-2.6-1.8-3.5-1.1-.9-2.5-1.3-4.3-1.3s-3,.3-3.9.9c-.9.6-1.4,1.5-1.4,2.6s.6,2.2,1.8,2.8c1.2.6,3.1,1.3,5.7,1.9,2.6.7,4.8,1.3,6.5,2,1.7.7,3.2,1.8,4.5,3.3,1.3,1.5,1.9,3.4,1.9,5.8,0,2.1-.6,4-1.7,5.7-1.2,1.7-2.8,3-5,3.9-2.2.9-4.7,1.4-7.6,1.4s-5.7-.5-8.1-1.6Z"/>
      </g>
    </g>
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
