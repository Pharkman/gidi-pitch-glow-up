import { Clock, Users, Zap, Target } from 'lucide-react';
import founderPresenting from '@/assets/founder-presenting.jpg';
import TitleHeader from './TitleHeading';

const WhyGidiPitch = () => {
  const benefits = [
    {
      icon: Users,
      title: 'Built for African Founders',
      description: 'Understand the unique challenges and opportunities in African markets with culturally relevant templates and guidance.'
    },
    {
      icon: Zap,
      title: 'No Design Skills Needed',
      description: 'Professional-quality materials without hiring expensive designers or learning complex software.'
    },
    {
      icon: Clock,
      title: 'Save Hours of Manual Work',
      description: 'What used to take weeks of preparation now takes minutes with our AI-powered automation.'
    },
    {
      icon: Target,
      title: 'Pitch-Ready in Minutes',
      description: 'Get investor-ready presentations, financial models, and documents that actually win funding.'
    }
  ];

  return (
    <section id="why-gidipitch" className="py-24 bg-background">
        <div className="flex flex-col items-center mb-6 gap-5 shadow-2xl bg-white rounded-lg  w-[10%] mx-16">
        <div className="">
          <h1 className="font-medium py-3 rounded-lg md:text-[14px] text-xs text-center">
          Why Choose
          </h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="animate-fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold mb-8">
              Why Choose{' '}
              <span className="text-primary">GidiPitch</span>?
            </h2>
            
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              We built GidiPitch specifically for African entrepreneurs who need to 
              move fast and pitch smart. Stop letting great ideas wait for perfect presentations.
            </p>

            <div className="space-y-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div 
                    key={index}
                    className="flex items-start group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex-shrink-0 mr-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl flex items-center justify-center group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* <div className="mt-12">
              <button className="btn-secondary">
                See Success Stories
              </button>
            </div> */}
          </div>

          {/* Image */}
          <div className="relative animate-scale-in">
            <div className="relative z-10">
              <img 
                src={founderPresenting}
                alt="African founder presenting to investors"
                className="w-full h-auto rounded-3xl shadow-strong"
              />
              
              {/* Floating stats */}
              <div className="absolute top-8 left-8 bg-card/90 backdrop-blur-sm border border-border rounded-xl p-4 shadow-medium">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Founders Helped</div>
              </div>
              
              <div className="absolute bottom-8 right-8 bg-card/90 backdrop-blur-sm border border-border rounded-xl p-4 shadow-medium">
                <div className="text-2xl font-bold text-accent">$10M+</div>
                <div className="text-sm text-muted-foreground">Funding Raised</div>
              </div>
              
              <div className="absolute top-1/2 -right-4 bg-card/90 backdrop-blur-sm border border-border rounded-xl p-4 shadow-medium">
                <div className="text-2xl font-bold text-secondary">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>

            {/* Background effects */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-accent/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>

        {/* Bottom testimonial */}
        {/* <div className="mt-24 text-center">
          <div className="bg-gradient-card border border-border rounded-2xl p-8 max-w-4xl mx-auto shadow-soft">
            <blockquote className="text-2xl font-medium text-foreground mb-6 leading-relaxed">
              "GidiPitch helped me create a professional pitch deck in 30 minutes. 
              I raised $250K within 3 months of launching my startup."
            </blockquote>
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-full mr-4"></div>
              <div className="text-left">
                <div className="font-semibold">Amara Okafor</div>
                <div className="text-sm text-muted-foreground">Founder, TechLagos</div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default WhyGidiPitch;