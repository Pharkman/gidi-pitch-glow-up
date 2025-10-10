import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding/Onboarding";
import Dashboard from "./pages/Dashboard";
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
import ProtectedRoute from "./components/ProtectedRoute";
import Homepage from "./pages/Home";
import SignIn from "./pages/Auth/Signin";
import SignUp from "./pages/Auth/Signup";
import VerifyEmail from "./pages/Auth/VerifyEmail";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import AboutStartup from "./pages/Onboarding/component/AboutStartup";
import ShapeStartup from "./pages/Onboarding/component/ShapeStartup";
import GoalsPreferences from "./pages/Onboarding/component/GoalsPreferences";
import Waitlist from "./pages/Waitlist/Waitlist";
import { ToastContainer } from "react-toastify";
import GlobalLoader from "./components/Loader";
import { useEffect, useState } from "react";
import { useDocumentTitle } from "./hooks/use-document-title";


function AppRoutes() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [pageTitle, setPageTitle] = useState("");

  // Set page title based on current route
  useEffect(() => {
    const path = location.pathname;
    
    // Map routes to page titles
    const routeTitles: Record<string, string> = {
      "/": "Home",
      "/signin": "Sign In",
      "/signup": "Sign Up",
      "/verify-email": "Verify Email",
      "/forgot-password": "Forgot Password",
      "/auth/password/reset": "Reset Password",
      "/waitlist": "Join Waitlist",
      "/onboarding": "Onboarding",
      "/onboarding/about-startup": "About Your Startup",
      "/onboarding/shape-startup": "Shape Your Startup",
      "/onboarding/goal_preference": "Goals & Preferences",
      "/dashboard": "Dashboard",
      "/pitch-decks": "Pitch Decks",
      "/resume-builder": "Resume Builder",
      "/resume-builder-editor": "Resume Editor",
      "/team-members": "Team Members",
      "/pitch-deck-outline": "Pitch Deck Outline",
      "/pitch-deck-generating": "Generating Pitch Deck",
      "/pitch-deck-editor": "Pitch Deck Editor",
      "/resume-generating": "Generating Resume"
    };
    
    setPageTitle(routeTitles[path] || "Page Not Found");
  }, [location]);

  // Apply the document title
  useDocumentTitle(pageTitle);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800); 
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {loading && <GlobalLoader />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="auth/password/reset" element={<ResetPassword />} />
        <Route path="/waitlist" element={<Waitlist />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/onboarding/about-startup" element={<AboutStartup />} />
        <Route path="/onboarding/shape-startup" element={<ShapeStartup />} />
        <Route path="/onboarding/goal_preference" element={<GoalsPreferences />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pitch-decks" element={<PitchDecksPage />} />
        <Route path="/resume-builder" element={<ResumeBuilderPage />} />
        <Route path="/resume-builder-editor" element={<ResumeEditorPage />} />
        <Route path="/team-members" element={<TeamMembersPage />} />
        <Route path="/pitch-deck-outline" element={<PitchDeckOutlinePage />} />
        <Route path="/pitch-deck-generating" element={<PitchDeckGeneratingPage />} />
        <Route path="/pitch-deck-editor" element={<PitchDeckEditorPage />} />
        <Route path="/resume-generating" element={<ResumeGeneratingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="bg-white shadow-md rounded-lg p-3 text-sm font-semibold text-gray-800 font"
        className="text-sm font-normal font-semibold"
      />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;