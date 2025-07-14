import { FileInput, Settings, Sparkles, Download } from 'lucide-react';
import React from 'react';

interface HowItWorksProps {
  showCardLine?: boolean;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ showCardLine = false }) => {
  const steps = [
    {
      icon: FileInput,
      number: '01',
      title: 'Input Your Startup Info',
      description: 'Share basic details about your startup, vision, and goals through our simple form.'
    },
    {
      icon: Settings,
      number: '02', 
      title: 'Select Tools & Templates',
      description: 'Choose from pitch decks, financial models, resumes, or accelerator applications.'
    },
    {
      icon: Sparkles,
      number: '03',
      title: 'Get AI-Generated Results',
      description: 'Our AI creates professional, investor-ready materials tailored to your startup.'
    },
    {
      icon: Download,
      number: '04',
      title: 'Edit, Export & Pitch',
      description: 'Customize the output, export in multiple formats, and start pitching to investors.'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            How <span className="text-gradient-primary">GidiPitch</span> Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From startup idea to investor-ready materials in just 4 simple steps. 
            No design experience required.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Steps Grid - no connecting line */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div 
                  key={index}
                  className="relative text-center group"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Step Number */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-full flex items-center justify-center shadow-medium group-hover:shadow-strong transition-all duration-300 group-hover:scale-110">
                      <Icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-background border-2 border-primary rounded-full flex items-center justify-center text-sm font-bold text-primary">
                      {step.number}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>

                  {/* Connecting Arrow - Mobile */}
                  {showCardLine && index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center mt-8 mb-4">
                      <div className="w-0.5 h-8 bg-gradient-to-b from-primary to-accent"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;