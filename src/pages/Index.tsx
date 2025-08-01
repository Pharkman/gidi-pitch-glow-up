import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import ProductPreview from '@/components/ProductPreview';
import HowItWorks from '@/components/HowItWorks';
import WhyGidiPitch from '@/components/WhyGidiPitch';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

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
      </main>
      <Footer />
    </div>
  );
};

export default Index;
