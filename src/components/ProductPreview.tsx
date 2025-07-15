import { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import dashboardMockup from '@/assets/dashboard-mockup.jpg';
import resumeMockup from '@/assets/resume-mockup.jpg';
import heroLaptop from '@/assets/hero-laptop-mockup.jpg';

const ProductPreview = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const previews = [
    {
      title: 'Pitch Deck Editor',
      description: 'Create stunning investor presentations with our AI-powered editor',
      image: heroLaptop,
      features: ['AI Content Generation', 'Professional Templates', 'Export to PDF/PPT']
    },
    {
      title: 'Financial Dashboard',
      description: 'Build comprehensive financial models and forecasts',
      image: dashboardMockup,
      features: ['3-Year Projections', 'Revenue Modeling', 'Investor Metrics']
    },
    {
      title: 'Resume Builder',
      description: 'Craft compelling founder profiles and team bios',
      image: resumeMockup,
      features: ['Professional Templates', 'ATS Optimized', 'Multiple Formats']
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % previews.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + previews.length) % previews.length);
  };

  return (
    <section id="preview" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            See <span className="text-primary">GidiPitch</span> in Action
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our intuitive interface designed specifically for African founders. 
            Build professional investor materials without the complexity.
          </p>
        </div>

        {/* Product Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl bg-gradient-card shadow-strong">
            <div className="relative h-[500px] lg:h-[600px]">
              {previews.map((preview, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-500 transform ${
                    index === currentSlide 
                      ? 'translate-x-0 opacity-100' 
                      : index < currentSlide 
                        ? '-translate-x-full opacity-0' 
                        : 'translate-x-full opacity-0'
                  }`}
                >
                  <div className="grid lg:grid-cols-2 h-full">
                    {/* Content */}
                    <div className="flex flex-col justify-center p-8 lg:p-12">
                      <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                        {preview.title}
                      </h3>
                      <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                        {preview.description}
                      </p>

                      {/* Features List */}
                      <ul className="space-y-3 mb-8">
                        {preview.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center">
                            <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                            <span className="text-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <button
                        className="btn-hero w-[50%] flex justify-center items-center gap-2 font-semibold rounded-lg shadow-lg bg-primary text-white transition-all duration-200 hover:bg-primary/90 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 py-3 px-6 group"
                      >
                        <span>Try This Tool</span>
                        <ExternalLink className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>

                    {/* Image */}
                    <div className="relative flex items-center justify-center p-8">
                      <div className="relative">
                        <img 
                          src={preview.image} 
                          alt={preview.title}
                          className="w-full h-auto rounded-2xl shadow-medium"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-background/90 hover:bg-background rounded-full shadow-medium transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-background/90 hover:bg-background rounded-full shadow-medium transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
              {previews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-primary scale-125' 
                      : 'bg-muted-foreground/50 hover:bg-muted-foreground'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <button className="btn-ghost">
            See Full Product Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductPreview;