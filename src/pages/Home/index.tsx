import Navigation from "@/components/shared/Navigation";
import HeroSection from "@/pages/Home/components/HeroSection";
import FeaturesSection from "@/pages/Home/components/FeaturesSection";
import ProductPreview from "@/components/ProductPreview";
import HowItWorks from "@/components/HowItWorks";
import WhyGidiPitch from "@/components/WhyGidiPitch";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import CTASection from "@/components/CtaBanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesSection />
        {/* <ProductPreview /> */}
        {/* <HowItWorks /> */}
        <WhyGidiPitch />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
