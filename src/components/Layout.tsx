
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Check if we're on a public page
  const isPublicPage = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/report';

  useEffect(() => {
    // Check if user is authenticated with Supabase
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setIsLoading(false);
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    // If not authenticated and not on public pages, redirect to login
    if (!isLoading && !isAuthenticated && !isPublicPage) {
      navigate('/login');
    }

    // If authenticated and on login page, redirect to pdf page
    if (!isLoading && isAuthenticated && location.pathname === '/login') {
      navigate('/pdf');
    }
  }, [isAuthenticated, location.pathname, navigate, isLoading, isPublicPage]);

  // Check if we're on the landing page
  const isLandingPage = location.pathname === '/';

  const openSupportChat = () => {
    // Production webhook URL
    window.open('https://sonarai.app.n8n.cloud/webhook/715d27f7-f730-437c-8abe-cda82e04210e/chat', '_blank');
    toast.success("Support chat opened in a new window!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-peach overflow-hidden relative">
      {/* Only show navbar when authenticated and not on landing page */}
      {isAuthenticated && !isLandingPage && <Navbar />}
      
      <main className={`flex-1 ${isAuthenticated && !isLandingPage ? 'pt-16' : ''} flex flex-col`}>
        {children}
      </main>
      
      {/* Support chat button (only show when authenticated and not on landing page) */}
      {isAuthenticated && !isLandingPage && (
        <div className="fixed bottom-6 right-6 z-40">
          <Button 
            onClick={openSupportChat}
            className="rounded-full w-14 h-14 bg-navy hover:bg-navy-light text-peach shadow-lg"
          >
            <MessageCircle size={24} />
          </Button>
        </div>
      )}
      
      {/* Only show footer when authenticated and not on landing page */}
      {isAuthenticated && !isLandingPage && <Footer />}
    </div>
  );
};

export default Layout;
