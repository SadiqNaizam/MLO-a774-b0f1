import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import DashboardPage from "./pages/DashboardPage"; // Removed import
import HouseManagementPage from "./pages/HouseManagementPage";
import EventPlannerPage from "./pages/EventPlannerPage";
import LocalGuidePage from "./pages/LocalGuidePage";
// SettingsPage import removed
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const applyTheme = () => {
      const storedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      // Apply theme from local storage or system preference
      // The SettingsPage used to handle this toggle, now it's just initial load logic.
      if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    applyTheme();

  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HouseManagementPage />} /> {/* Changed to HouseManagementPage */}
            <Route path="/house-management" element={<HouseManagementPage />} />
            <Route path="/event-planner" element={<EventPlannerPage />} />
            <Route path="/local-guide" element={<LocalGuidePage />} />
            {/* SettingsPage route removed */}
            
            {/* Placeholder routes for links in footer, can be developed later */}
            <Route path="/privacy" element={<NotFound />} /> 
            <Route path="/terms" element={<NotFound />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;