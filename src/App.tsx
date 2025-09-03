import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./components/Dashboard";
import PitchDecksPage from "./pages/PitchDecksPage";
import ResumeBuilderPage from "./pages/ResumeBuilderPage";
import TeamMembersPage from "./pages/TeamMembersPage";
import PitchDeckOutlinePage from "./pages/PitchDeckOutlinePage";
import PitchDeckGeneratingPage from "./pages/PitchDeckGeneratingPage";
import PitchDeckEditorPage from "./components/PitchDeckEditor";
import ResumeGeneratingPage from "./pages/ResumeGeneratingPage";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ResumeEditorPage } from "./pages/ResumeBuilderPage";
import { Input } from "@/components/ui/input";
import CompleteProfile from "./pages/CompleteProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import Homepage from "./pages/Home";
import SignIn from "./pages/Auth/Signin";
import SignUp from "./pages/Auth/Signup";
import VerifyEmail from "./pages/Auth/VerifyEmail";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route
            path="/dashboard"
            element={
              // <ProtectedRoute>
              <Dashboard />
              // </ProtectedRoute>
            }
          />
          // <Route path="/pitch-decks" element={<PitchDecksPage />} />
          // <Route path="/resume-builder" element={<ResumeBuilderPage />} />
          //{" "}
          <Route path="/resume-builder-editor" element={<ResumeEditorPage />} />
          // <Route path="/team-members" element={<TeamMembersPage />} />
          //{" "}
          <Route
            path="/pitch-deck-outline"
            element={<PitchDeckOutlinePage />}
          />
          //{" "}
          <Route
            path="/pitch-deck-generating"
            element={<PitchDeckGeneratingPage />}
          />
          //{" "}
          <Route path="/pitch-deck-editor" element={<PitchDeckEditorPage />} />
          //{" "}
          <Route path="/resume-generating" element={<ResumeGeneratingPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;