
// import Navigation from '@/components/Navigation';
// import HeroSection from '@/components/HeroSection';
// import FeaturesSection from '@/components/FeaturesSection';
import ProductPreview from '@/components/ProductPreview';
import HowItWorks from '@/components/HowItWorks';
import WhyGidiPitch from '@/components/WhyGidiPitch';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import CTASection from '@/components/CtaBanner';
import HeroSection from './Home/components/HeroSection';
import { Navigation } from 'lucide-react';
import FeaturesSection from './Home/components/FeaturesSection';


const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesSection />
        {/* <ProductPreview /> */}
        <HowItWorks />
        <WhyGidiPitch />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
