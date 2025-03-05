
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MomentsPage from "./pages/MomentsPage";
import AddMomentPage from "./pages/AddMomentPage";
import MomentDetailPage from "./pages/MomentDetailPage";
import EditMomentPage from "./pages/EditMomentPage";
import AnniversaryPage from "./pages/AnniversaryPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/moments" element={<MomentsPage />} />
          <Route path="/moments/:id" element={<MomentDetailPage />} />
          <Route path="/add-moment" element={<AddMomentPage />} />
          <Route path="/edit-moment/:id" element={<EditMomentPage />} />
          <Route path="/anniversary" element={<AnniversaryPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
