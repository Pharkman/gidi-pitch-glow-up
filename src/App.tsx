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
import PitchSlide from "./pages/Slides/PitchSlide";
import PeopleData from "./pages/people_temp";
import { ThemeProvider } from "./lib/context/ThemeProvider";
import PitchDeckForm from "./pages/PitchDeck/PitchDeck";
import CreatePitchDeckStepOne from "./pages/PitchDeck/component/CreatePitchDeckStepOne";
import CreatePitchDeckStepTwo from "./pages/PitchDeck/component/CreatePitchDeckStepTwo";
import CreatePitchDeckStepThree from "./pages/PitchDeck/component/CreatePitchDeckStepThree";
import CreatePitchDeckSteFour from "./pages/PitchDeck/component/CreatePitchDeckStepFour";
import CreatePitchDeckStepFive from "./pages/PitchDeck/component/CreatePitchDeckStepFive";
import Settings from "./pages/Settings/Settings";
import ChangeNameModal from "./pages/Settings/component/ChangeNameModal";
import ChangeEmailModal from "./pages/Settings/component/ChangeEmailModal";
import ChangePasswordModal from "./pages/Settings/component/ChangePasswordModal";
import DeckPage from "./pages/Slides/component/DeckPage";
import SlideSidebar from "./pages/Slides/component/SlideSidebar";
import CorrectedSlideProgress from "./pages/Slides/component/CorrectedSlideProgress";
import SlideExport from "./pages/Slides/component/SlideExport";
import SlideExporting from "./pages/Slides/component/SlideExporting";
import Resume from "./pages/Resume/Resume";
import BusModel from "./pages/BusModal/BusModel";
import Yc from "./pages/Yc/Yc";
import TokenPurchase from "./pages/Payment/CryptoPayment/TokenPurchase";
import PurchaseTokens from "./pages/Payment/paystackPayment/paystack";
import Payment from "./pages/Payment/Payment";
import AiCoach from "./pages/AiCoach/AiCoach";



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
      "/resume-generating": "Generating Resume",
      
      
    "/create-pitchdeck/step-one": "Create Pitch Deck - Step 1",
    "/create-pitchdeck/step-two": "Create Pitch Deck - Step 2",
    "/create-pitchdeck/step-three": "Create Pitch Deck - Step 3",
    "/create-pitchdeck/step-four": "Create Pitch Deck - Step 4",
    "/create-pitchdeck/step-five": "Create Pitch Deck - Step 5",

    // Slides
    "/deck": "Deck Page",
    "/pitch-slide": "Pitch Slide",
    "/slidebar": "Slide Sidebar",
    "/exportslide": "Export Slide",
    "/export-slide": "Slide Exporting", // For dynamic :deckId route
    "/correct-slide": "Corrected Slide Progress", // For dynamic :slideId route

    // Settings
    "/settings": "Settings",
    "/change-name": "Change Name",
    "/change-email": "Change Email",
    "/change-password": "Change Password",
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
        <Route path="/people" element={<PeopleData />} />
        {/* <Route path="/create-pitchdeck/step-four" element={<PitchSlide />} /> */}
        <Route path="/create-pitchdeck/step-five" element={<CreatePitchDeckStepFive />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/onboarding/about-startup" element={<AboutStartup />} />
        <Route path="/onboarding/shape-startup" element={<ShapeStartup />} />
        <Route path="/onboarding/goal_preference" element={<GoalsPreferences />} />
        <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/pitch-deck" element={<PitchDeckForm />} />
        <Route path="/create-pitchdeck/step-one" element={<CreatePitchDeckStepOne />} />
        <Route path="/create-pitchdeck/step-two" element={<CreatePitchDeckStepTwo />} />
        <Route path="/create-pitchdeck/step-three" element={<CreatePitchDeckStepThree />} />
        <Route path="/create-pitchdeck/step-four" element={<CreatePitchDeckSteFour />} />
        <Route path="/deck" element={<DeckPage />} />
        <Route path="/correct-slide/:slideId" element={<CorrectedSlideProgress />} />
        <Route path="/exportslide" element={<SlideExport />} />
        <Route path="/export-slide/:deckId" element={<SlideExporting />} />
        <Route path="/pitch-slide" element={<PitchSlide />} />
        <Route path="/slidebar" element={<SlideSidebar />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/change-name" element={<ChangeNameModal />} />
        <Route path="/change-email" element={<ChangeEmailModal />} />
        <Route path="/change-password" element={<ChangePasswordModal />} />


        <Route path="/pitch-decks" element={<ProtectedRoute><PitchDecksPage /></ProtectedRoute>} />
        <Route path="/resume-builder" element={<ProtectedRoute><ResumeBuilderPage /></ProtectedRoute>} />
        <Route path="/resume-builder-editor" element={<ProtectedRoute><ResumeEditorPage /></ProtectedRoute>} />
        <Route path="/team-members" element={<ProtectedRoute><TeamMembersPage /></ProtectedRoute>} />
        <Route path="/pitch-deck-outline" element={<ProtectedRoute><PitchDeckOutlinePage /></ProtectedRoute>} />
        <Route path="/pitch-deck-generating" element={<ProtectedRoute><PitchDeckGeneratingPage /></ProtectedRoute>} />
        <Route path="/pitch-deck-editor" element={<ProtectedRoute><PitchDeckEditorPage /></ProtectedRoute>} />
        <Route path="/resume" element={<ProtectedRoute><Resume /></ProtectedRoute>} />
        <Route path="/bus-modal" element={<ProtectedRoute><BusModel /></ProtectedRoute>} />
        <Route path="/yc" element={<ProtectedRoute><Yc /></ProtectedRoute>} />
        <Route path="/ai-coach" element={<ProtectedRoute><AiCoach /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        <Route path="/crypto-payment" element={<ProtectedRoute><TokenPurchase /></ProtectedRoute>} />
        <Route path="/paystack-payment" element={<ProtectedRoute><PurchaseTokens /></ProtectedRoute>} />
        {/* <Route path="/paystack-payment" element={<ProtectedRoute><PurchaseTokensWithPaystack /></ProtectedRoute>} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
  <ThemeProvider defaultTheme="light" storageKey="vobb-ui-theme">
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
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;