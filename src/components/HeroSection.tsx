import { useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroLaptop from '@/assets/hero-laptop-mockup.jpg';
import AuthModal from './AuthModal';
import OnboardingFlow from './OnboardingFlow';
import Dashboard from './Dashboard';
import heroBanner from '@/assets/hero_dashboard.png'

const HeroSection = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleAuthSuccess = () => {
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    setShowDashboard(true);
  };

  if (showDashboard) {
    return <Dashboard />;
  }
  return (
    <section id="hero" className="relative min-h-screen flex items-center hero-bg overflow-hidden">
     
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative  mx-auto max-sm:px-4 sm:pl-6 lg:pl-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-fade-in-up mt-6">
            <h1 className="text-5xl lg:text-6xl font-bold leading-10 mb-6">
              Build Your{' '}
              <span className="text-gradient-primary leading-10">Investor Pitch</span>{' '}
              in Minutes
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground mb-8 leading-relaxed">
              GidiPitch helps African founders create pitch decks, financials, 
              and resumes with AI. Get investor-ready in minutes, not weeks.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button 
                size="lg" 
                className="group"
                onClick={() => setShowAuthModal(true)}
              >
                Try Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button variant="outline" size="lg" className="group hover:bg-primary hover:text-primary-foreground hover:border-primary">
                <Play className="mr-2 h-5 w-5" />
                See How It Works
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-col  mb-4 gap-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                No design skills needed
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                Built for African founders
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                Pitch-ready in minutes
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-scale-in">
            <div className="relative z-10">
              <img 
                src={heroBanner} 
                alt="GidiPitch Interface" 
                className="w-full h-auto rounded-2xl shadow-strong animate-float"
              />
              
              {/* Floating UI elements */}
              <div className="absolute -top-4 -left-4 bg-card border border-border rounded-lg p-3 shadow-medium">
                <div className="text-sm font-semibold text-primary">Pitch Deck</div>
                <div className="text-xs text-muted-foreground">Generated in 2 min</div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-lg p-3 shadow-medium">
                <div className="text-sm font-semibold text-primary">Financial Model</div>
                <div className="text-xs text-muted-foreground">3-year forecast</div>
              </div>
            </div>

            {/* Background glow */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-2xl scale-110"></div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Onboarding Flow */}
      <OnboardingFlow
        isOpen={showOnboarding}
        onComplete={handleOnboardingComplete}
      />
    </section>
  );
};

export default HeroSection;