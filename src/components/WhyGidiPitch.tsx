
import founderPresenting from '@/assets/landing_investor.png';
import React from 'react';
import { benefits } from './dummy';
interface WhyGidiPitchProps {
  showReadySection?: boolean;
  showSuccessStoriesButton?: boolean;
}

const WhyGidiPitch: React.FC<WhyGidiPitchProps> = ({ showReadySection = false, showSuccessStoriesButton = false }) => {
  
  return (
    <section id="why-gidipitch" className="py-24 bg-[#F5F5F5]">
        <div className="flex flex-col items-center mb-6 gap-5 shadow-2xl bg-white rounded-lg  w-[10%] mx-16">
      </div>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="animate-fade-in-up">
            <h2 className="text-[52px] font-medium lg:text-5xl  mb-10">
              Why Choose <span style={{ color: '#FD621E' }}>GidiPitch</span>?
            </h2>
            <div className="space-y-6">
              {benefits.slice(0, 3).map((benefit, index) => {
                return (
                  <div 
                    key={index}
                    className="flex items-start group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex-shrink-0 mr-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300">
                        <img src={benefit.icon} alt="" className="w-6 h-6" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-[#1D1D1D] font-medium text-[27px] cursor-pointer mb-2 group-hover:text-primary transition-colors">
                        {benefit.title}
                      </h3>
                      <p className=" leading-relaxed text-[16px] text-[#777777]">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            {showSuccessStoriesButton && (
              <div className="mt-8">
                <button className="btn-hero">See success stories</button>
              </div>
            )}
            {showReadySection && (
              <div className="mt-12 p-8 bg-muted/30 rounded-2xl text-center">
                <h3 className="text-2xl font-bold mb-2">Ready to Get Started?</h3>
                <p className="text-muted-foreground mb-4">Sign up and start building your investor materials today.</p>
                <button className="btn-hero">Get Started</button>
              </div>
            )}
          </div>

          {/* Image */}
          <div className="relative z-10">
            <img 
              src={founderPresenting}
              alt="African founder presenting to investors"
              className="w-full  rounded-3xl shadow-strong"
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
>>>>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default WhyGidiPitch;