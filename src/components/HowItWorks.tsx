import { FileInput, Settings, Sparkles, Download } from 'lucide-react';

const HowItWorks = () => {
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
          {/* Connecting Line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary to-accent transform -translate-y-1/2"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
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
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center mt-8 mb-4">
                      <div className="w-0.5 h-8 bg-gradient-to-b from-primary to-accent"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-card border border-border rounded-2xl p-8 max-w-2xl mx-auto shadow-soft">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join hundreds of African founders who've already built their pitch materials with GidiPitch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-hero">
                Start Building Now
              </button>
              <button className="btn-ghost">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;