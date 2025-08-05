import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import SellerDashboard from "./pages/SellerDashboard";
import UserDashboard from "./pages/UserDashboard";
import AuctionDetails from "./pages/AuctionDetails";
import UpdateAuction from "./pages/UpdateAuction";
import AuctionListing from "./pages/AuctionListing";
import SingleAuction from "./pages/SingleAuction";
import NotFound from "./pages/NotFound";
import { isAuthenticated } from "@/lib/utils";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin-dashboard/auction/:id" element={<ProtectedRoute><AuctionDetails /></ProtectedRoute>} />
          <Route path="/auction-details/:id" element={<ProtectedRoute><AuctionDetails /></ProtectedRoute>} />
          <Route path="/update-auction/:id" element={<ProtectedRoute><UpdateAuction /></ProtectedRoute>} />
          <Route path="/auction" element={<ProtectedRoute><AuctionListing /></ProtectedRoute>} />
          <Route path="/auction/:id" element={<ProtectedRoute><SingleAuction /></ProtectedRoute>} />
          <Route path="/seller-dashboard" element={<ProtectedRoute><SellerDashboard /></ProtectedRoute>} />
          <Route path="/user-dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
