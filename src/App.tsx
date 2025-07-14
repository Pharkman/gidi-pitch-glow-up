import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Onboarding from './pages/Onboarding';
import Dashboard from './components/Dashboard';
import PitchDecksPage from './pages/PitchDecksPage';
import ResumeBuilderPage from './pages/ResumeBuilderPage';
import TeamMembersPage from './pages/TeamMembersPage';
import PitchDeckOutlinePage from './pages/PitchDeckOutlinePage';
import PitchDeckGeneratingPage from './pages/PitchDeckGeneratingPage';
import PitchDeckEditorPage from './components/PitchDeckEditor';
import ResumeGeneratingPage from './pages/ResumeGeneratingPage';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ResumeEditorPage } from './pages/ResumeBuilderPage';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SidebarProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pitch-decks" element={<PitchDecksPage />} />
            <Route path="/resume-builder" element={<ResumeBuilderPage />} />
            <Route path="/resume-builder-editor" element={<ResumeEditorPage />} />
            <Route path="/team-members" element={<TeamMembersPage />} />
            <Route path="/pitch-deck-outline" element={<PitchDeckOutlinePage />} />
            <Route path="/pitch-deck-generating" element={<PitchDeckGeneratingPage />} />
            <Route path="/pitch-deck-editor" element={<PitchDeckEditorPage />} />
            <Route path="/resume-generating" element={<ResumeGeneratingPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
