
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import FieldsForm from "./pages/FieldsForm";
import PdfUpload from "./pages/PdfUpload";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import ReportPage from "./pages/ReportPage";
import MiniReportPage from "./pages/MiniReportPage";

// Import the framer-motion package
import { AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

const App = () => {
  // Handle authentication persistence (basic example)
  useEffect(() => {
    // If this were a real app, we would check if the token is valid
    // For now, we'll just use localStorage as a simple example
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      localStorage.setItem('isAuthenticated', 'false');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-right" closeButton />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Layout>
              <Routes>
                {/* Set the LandingPage as the default route */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/report" element={<ReportPage />} />
                <Route path="/mini-report" element={<MiniReportPage />} />
                <Route path="/home" element={<Home />} />
                <Route path="/fields" element={<FieldsForm />} />
                <Route path="/pdf" element={<PdfUpload />} />
                {/* Redirect any other paths to the landing page */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
