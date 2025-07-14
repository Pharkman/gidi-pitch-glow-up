import { FileText, TrendingUp, User, Lightbulb, MessageSquare } from 'lucide-react';
import React from 'react';

interface FeaturesSectionProps {
  cardCount?: number;
  showExploreButton?: boolean;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ cardCount = 6, showExploreButton = false }) => {
  const features = [
    {
      icon: FileText,
      title: 'Pitch Deck Generator',
      description: 'Create investor-ready presentations with AI-powered content generation.'
    },
    {
      icon: TrendingUp,
      title: 'Financial Forecast Tool',
      description: 'Build comprehensive 3-year financial models with revenue projections.'
    },
    {
      icon: User,
      title: 'Resume Builder',
      description: 'Craft professional founder profiles that highlight your unique journey.'
    },
    {
      icon: Lightbulb,
      title: 'YC/Accelerator Assistant',
      description: 'Get guidance tailored for top accelerator application requirements.'
    },
    {
      icon: MessageSquare,
      title: 'AI Pitch Coach',
      description: 'Coming Soon - Get real-time feedback to perfect your pitch delivery.',
      comingSoon: true
    },
    {
      icon: FileText,
      title: 'One-Pager Generator',
      description: 'Generate concise company one-pagers for investors and partners.'
    }
  ];

  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Everything You Need to{' '}
            <span className="text-gradient-primary">Raise Funding</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stop spending weeks creating pitch materials. Our AI-powered tools help you 
            generate professional investor documents in minutes.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.slice(0, cardCount).map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className={`card-hover group relative ${feature.comingSoon ? 'opacity-75' : ''}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {feature.comingSoon && (
                  <div className="absolute top-4 right-4 bg-gradient-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                    Coming Soon
                  </div>
                )}
                
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-2xl transition-all duration-300"></div>
              </div>
            );
          })}
        </div>
        {showExploreButton && (
          <div className="text-center mt-12">
            <button className="btn-hero">Explore all features</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturesSection;