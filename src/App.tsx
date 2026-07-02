import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import ProtectedRoute from "@/components/ProtectedRoute";
import CabinetLayout from "@/components/cabinet/CabinetLayout";
import Index from "./pages/Index.tsx";
import DesignSystem from "./pages/DesignSystem.tsx";
import NotFound from "./pages/NotFound.tsx";
import Login from "./pages/Login.tsx";
import CabinetRequests from "./pages/CabinetRequests.tsx";
import CabinetChat from "./pages/CabinetChat.tsx";
import CabinetDocuments from "./pages/CabinetDocuments.tsx";
import CabinetPayments from "./pages/CabinetPayments.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/design-system" element={<DesignSystem />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/cabinet"
              element={
                <ProtectedRoute>
                  <CabinetLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<CabinetRequests />} />
              <Route path="chat/:id" element={<CabinetChat />} />
              <Route path="documents" element={<CabinetDocuments />} />
              <Route path="payments" element={<CabinetPayments />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
