import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { HelpCircle, User, ChevronDown, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { signOut } from '@/services/authService';
import { supabase } from '@/integrations/supabase/client';

const AugustLogo = () => (
  <svg 
    className="h-12 w-auto mr-2" 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="342.114990234375 219.42776489257812 465.49493408203125 127.2662353515625" 
    width="400" 
    height="225"
  >
    <path d="M392.707 306a25.296 25.296 0 0 1-25.296 25.296A25.296 25.296 0 0 1 342.115 306a25.296 25.296 0 0 1 50.602 0m80.582 25.402h-54.192L356.4 222.807h54.307zm75.101-97.2c-19.699-19.699-51.706-19.699-71.405 0s-19.699 51.706 0 71.405zm-6.106 12.892c19.699 19.699 19.699 51.706 0 71.405s-51.706 19.699-71.405 0zm75.802 14.112h-18.403L596.688 270h-9.696l16.598-46.099h10.81L630.998 270h-9.802l-3.005-8.794Zm-2.506-7.402-6.701-19.296-6.701 19.296h13.296Zm52.81-20.399v36.605h-9.302v-4.598a11.5 11.5 0 0 1-4.694 3.706c-1.901.902-3.994 1.402-6.202 1.402s-5.405-.605-7.594-1.805-3.898-3.005-5.194-5.299c-1.306-2.4-1.901-5.194-1.901-8.4v-21.504h9.206v20.102c0 2.899.701 5.098 2.198 6.701s3.398 2.294 5.904 2.294 4.598-.806 6-2.294c1.507-1.603 2.198-3.802 2.198-6.701v-20.102h9.302Zm27.302.989c2.102 1.104 3.706 2.506 4.896 4.205v-5.194h9.302v36.797c0 3.398-.701 6.394-1.997 9.101-1.402 2.698-3.398 4.8-6.096 6.298-2.698 1.603-6 2.294-9.907 2.294s-9.504-1.2-12.797-3.6-5.194-5.702-5.606-9.907h9.206c.499 1.699 1.507 3.005 3.101 3.994s3.6 1.507 5.798 1.507 4.896-.806 6.499-2.4c1.699-1.603 2.506-3.994 2.506-7.296v-5.702a14.4 14.4 0 0 1-4.896 4.301c-2.102 1.104-4.502 1.699-7.2 1.699s-5.904-.806-8.4-2.4a15.65 15.65 0 0 1-6-6.701c-1.507-2.899-2.198-6.202-2.198-9.907s.701-6.998 2.198-9.802q2.246-4.349 6-6.605c2.506-1.507 5.405-2.294 8.496-2.294s5.098.499 7.2 1.603Zm3.6 11.501c-.902-1.603-2.102-2.794-3.6-3.706s-3.101-1.306-4.8-1.306-3.302.403-4.8 1.306c-1.507.806-2.602 2.102-3.494 3.706s-1.402 3.494-1.402 5.702.499 4.099 1.402 5.798a9.5 9.5 0 0 0 8.294 5.107c1.69 0 3.302-.403 4.8-1.306s2.698-2.102 3.6-3.706 1.306-3.494 1.306-5.798-.403-4.205-1.306-5.798m50.794-12.489v36.605h-9.302v-4.598a11.5 11.5 0 0 1-4.694 3.706c-1.901.902-3.994 1.402-6.202 1.402s-5.405-.605-7.594-1.805-3.898-3.005-5.194-5.299c-1.306-2.4-1.901-5.194-1.901-8.4v-21.504h9.206v20.102c0 2.899.701 5.098 2.198 6.701s3.398 2.294 5.904 2.294 4.598-.806 6-2.294c1.507-1.603 2.198-3.802 2.198-6.701v-20.102h9.302Zm11.808 35.501c-2.4-1.104-4.301-2.506-5.606-4.406a11.5 11.5 0 0 1-2.294-6.096h9.302c.202 1.402.902 2.602 2.102 3.494s2.698 1.402 4.502 1.402 3.101-.403 4.099-1.104q1.507-1.056 1.507-2.698c0-1.651-.605-2.102-1.805-2.698s-3.101-1.2-5.798-1.901-5.002-1.306-6.701-1.997-3.206-1.805-4.502-3.206c-1.306-1.507-1.901-3.398-1.901-5.904s.605-3.898 1.805-5.501c1.2-1.699 2.794-3.005 5.002-3.994s4.694-1.507 7.699-1.507c4.406 0 7.805 1.104 10.397 3.302s3.994 5.098 4.301 8.794h-8.794c-.106-1.507-.701-2.602-1.805-3.494s-2.506-1.306-4.301-1.306-3.005.307-3.898.902-1.402 1.507-1.402 2.602.605 2.198 1.805 2.794 3.101 1.306 5.702 1.901c2.602.701 4.8 1.306 6.499 1.997q2.554 1.056 4.502 3.302c1.306 1.507 1.901 3.398 1.901 5.798q0 3.149-1.805 5.702c-1.2 1.699-2.794 3.005-5.002 3.898s-4.694 1.402-7.594 1.402-5.702-.499-8.102-1.603Zm37.498-27.908V258.7q0 1.805.902 2.698c.605.605 1.603.806 3.005.806h4.301v7.805h-5.798q-11.702 0-11.702-11.405v-17.606h-4.406v-7.594h4.406v-9.005h9.302v9.005h8.198v7.594zm-202.301 87.207c-2.602-1.104-4.598-2.698-6.096-4.8s-2.294-4.502-2.294-7.296h9.907c.106 1.901.806 3.398 1.997 4.502s2.899 1.699 5.002 1.699 3.898-.499 5.098-1.603c1.2-.998 1.805-2.4 1.805-4.099s-.403-2.506-1.306-3.398a8.6 8.6 0 0 0-3.101-2.102 58 58 0 0 0-5.194-1.699 53 53 0 0 1-7.296-2.602q-2.851-1.354-4.8-3.898c-1.306-1.699-1.997-4.099-1.997-6.998s.701-5.098 1.997-7.104c1.402-1.997 3.302-3.6 5.702-4.694 2.506-1.104 5.299-1.603 8.4-1.603 4.8 0 8.602 1.2 11.597 3.494s4.598 5.501 4.896 9.696h-10.205a5.09 5.09 0 0 0-1.997-3.898c-1.306-.998-2.899-1.603-5.002-1.603s-3.206.499-4.301 1.402-1.603 2.294-1.603 3.994.403 2.294 1.2 3.101 1.805 1.507 3.005 1.997q1.805.749 5.098 1.805a72 72 0 0 1 7.296 2.602c1.901.902 3.494 2.198 4.896 3.994s1.997 4.099 1.997 6.902-.605 4.8-1.901 6.902-3.101 3.802-5.606 5.002c-2.506 1.306-5.405 1.901-8.794 1.901s-6.096-.499-8.698-1.603Zm29.501-27.111q2.246-4.349 6-6.605c2.506-1.507 5.405-2.294 8.496-2.294s5.098.605 7.2 1.699c1.997 1.104 3.706 2.506 4.896 4.205v-5.194h9.302v36.605h-9.302v-5.299a14.4 14.4 0 0 1-4.896 4.301c-2.102 1.104-4.502 1.699-7.2 1.699s-5.904-.806-8.4-2.4-4.502-3.802-6-6.701-2.198-6.202-2.198-9.907.701-6.998 2.198-9.802Zm25.296 4.205c-.902-1.603-2.102-2.794-3.6-3.706s-3.101-1.306-4.8-1.306-3.302.403-4.8 1.306-2.602 2.102-3.494 3.706-1.402 3.494-1.402 5.702.499 4.099 1.402 5.798a9.5 9.5 0 0 0 8.294 5.107c1.69 0 3.302-.403 4.8-1.306s2.698-2.102 3.6-3.706 1.306-3.494 1.306-5.798-.403-4.205-1.306-5.798M703.2 292.8l-22.598 53.894H670.8l7.901-18.202-14.707-35.597h10.397l9.398 25.498 9.6-25.498h9.802Zm7.594 35.501c-2.4-1.104-4.301-2.506-5.606-4.406a11.5 11.5 0 0 1-2.294-6.096h9.302c.202 1.402.902 2.602 2.102 3.494s2.698 1.402 4.502 1.402 3.101-.403 4.099-1.104 1.507-1.603 1.507-2.698-.605-2.102-1.805-2.698-3.101-1.2-5.798-1.901-5.002-1.306-6.701-1.997-3.206-1.805-4.502-3.206c-1.306-1.507-1.901-3.398-1.901-5.904s.605-3.898 1.699-5.501c1.2-1.699 2.794-3.005 5.002-3.994s4.694-1.507 7.699-1.507c4.406 0 7.805 1.104 10.397 3.302s3.994 5.098 4.301 8.794h-8.803c-.106-1.507-.701-2.602-1.805-3.494s-2.506-1.306-4.301-1.306-3.005.307-3.898.902-1.402 1.507-1.402 2.602.605 2.198 1.805 2.794 3.101 1.306 5.702 1.901c2.602.701 4.8 1.306 6.499 1.997q2.554 1.056 4.502 3.302c1.306 1.507 1.901 3.398 1.901 5.798 0 2.102-.605 3.994-1.699 5.702-1.2 1.699-2.794 3.005-5.002 3.898s-4.694 1.402-7.594 1.402-5.702-.499-8.102-1.603Z" fill="#20374c"/>
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

