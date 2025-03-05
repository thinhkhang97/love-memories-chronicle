
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import AuthGuard from "@/components/AuthGuard";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import MomentsPage from "./pages/MomentsPage";
import AddMomentPage from "./pages/AddMomentPage";
import MomentDetailPage from "./pages/MomentDetailPage";
import EditMomentPage from "./pages/EditMomentPage";
import AnniversaryPage from "./pages/AnniversaryPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/moments" element={
              <AuthGuard>
                <MomentsPage />
              </AuthGuard>
            } />
            <Route path="/moments/:id" element={
              <AuthGuard>
                <MomentDetailPage />
              </AuthGuard>
            } />
            <Route path="/add-moment" element={
              <AuthGuard>
                <AddMomentPage />
              </AuthGuard>
            } />
            <Route path="/edit-moment/:id" element={
              <AuthGuard>
                <EditMomentPage />
              </AuthGuard>
            } />
            <Route path="/anniversary" element={
              <AuthGuard>
                <AnniversaryPage />
              </AuthGuard>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
