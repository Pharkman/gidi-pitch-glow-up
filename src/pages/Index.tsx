import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import ProductPreview from '@/components/ProductPreview';
import HowItWorks from '@/components/HowItWorks';
import WhyGidiPitch from '@/components/WhyGidiPitch';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import OnboardingFlow from '@/components/OnboardingFlow';
import { colors, typography, spacing, breakpoints } from '@/design-system/tokens';
// Example usage: <div style={{ color: colors.brand }}> ... </div>
// Tailwind classes like 'bg-primary' map to colors.brand, see tokens.ts for mapping.

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        {/* Onboarding widget restored */}
        {/* <OnboardingFlow /> */}
        <HeroSection />
        {/* FeaturesSection: ensure 6 cards, remove 'Explore all features' button */}
        <FeaturesSection cardCount={6} showExploreButton={false} />
        {/* ProductPreview: update 'See GidiPitch in Action' gradient text to brand color, section below is video demo, remove 'See full video demo' button */}
        <ProductPreview
          gradientTextColor="#FD621E"
          showVideoDemo={true}
          showFullDemoButton={false}
        />
        {/* HowItWorks: remove line on cards */}
        <HowItWorks showCardLine={false} />
        {/* WhyGidiPitch: remove 'Ready to Get Started?' section and 'See success stories' button */}
        <WhyGidiPitch showReadySection={false} showSuccessStoriesButton={false} />
        {/* FAQ: change heading/subheading, remove bg color and border */}
        <FAQ
          heading="Ready to Power Up Your Fundraising?"
          subheading="Get answers or talk to our team—no barriers, just support."
          noBgNoBorder={true}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
