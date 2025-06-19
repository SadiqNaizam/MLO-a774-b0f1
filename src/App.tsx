import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import HouseManagementPage from "./pages/HouseManagementPage";
import EventPlannerPage from "./pages/EventPlannerPage";
import LocalGuidePage from "./pages/LocalGuidePage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/house-management" element={<HouseManagementPage />} />
          <Route path="/event-planner" element={<EventPlannerPage />} />
          <Route path="/local-guide" element={<LocalGuidePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          
          {/* Placeholder routes for links in footer, can be developed later */}
          <Route path="/privacy" element={<NotFound />} /> 
          <Route path="/terms" element={<NotFound />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;