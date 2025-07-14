import { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import dashboardMockup from '@/assets/dashboard-mockup.jpg';
import resumeMockup from '@/assets/resume-mockup.jpg';
import heroLaptop from '@/assets/hero-laptop-mockup.jpg';
import React from 'react';

interface ProductPreviewProps {
  gradientTextColor?: string;
  showVideoDemo?: boolean;
  showFullDemoButton?: boolean;
}

const ProductPreview: React.FC<ProductPreviewProps> = ({ gradientTextColor = '#FD621E', showVideoDemo = true, showFullDemoButton = false }) => {
  // const [currentSlide, setCurrentSlide] = useState(0); // Removed carousel state

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

  // const nextSlide = () => { // Removed carousel navigation functions
  //   setCurrentSlide((prev) => (prev + 1) % previews.length);
  // };

  // const prevSlide = () => { // Removed carousel navigation functions
  //   setCurrentSlide((prev) => (prev - 1 + previews.length) % previews.length);
  // };

  return (
    <section id="preview" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            See <span style={{ color: '#FD621E' }}>GidiPitch</span> in Action
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our intuitive interface designed specifically for African founders. 
            Build professional investor materials without the complexity.
          </p>
        </div>
        {/* Only show the demo video, no carousel */}
        <div className="text-center mt-12">
          <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg">
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="GidiPitch Product Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPreview;