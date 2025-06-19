import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import DashboardPage from "./pages/DashboardPage"; // Removed import
import HouseManagementPage from "./pages/HouseManagementPage";
import EventPlannerPage from "./pages/EventPlannerPage";
import LocalGuidePage from "./pages/LocalGuidePage";
import ProfilePage from "./pages/ProfilePage"; // Added import for ProfilePage
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => {
  // useEffect for theme application has been removed as the theme is now static (black).
  // The :root styles in index.css will apply by default.

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
            <Route path="/profile" element={<ProfilePage />} /> {/* Added route for ProfilePage */}
            
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