import founderPresenting from '@/assets/landing_investor.png';
import React, { useEffect, useRef } from 'react';
import { benefits } from './dummy';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface WhyGidiPitchProps {
  showReadySection?: boolean;
  showSuccessStoriesButton?: boolean;
}

const WhyGidiPitch: React.FC<WhyGidiPitchProps> = ({
  showReadySection = false,
  showSuccessStoriesButton = false,
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const header = sectionRef.current.querySelector('.why-header');
      const benefitItems = sectionRef.current.querySelectorAll('.benefit-item');
      const image = sectionRef.current.querySelector('.why-image');

      // Header fade-in
      gsap.fromTo(
        header,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Benefit items stagger fade-in
      gsap.fromTo(
        benefitItems,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Image fade-in with slight zoom
      gsap.fromTo(
        image,
        { opacity: 0, scale: 0.95, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: image,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="benefits"
      ref={sectionRef}
      className="py-8 container bg-[#F5F5F5]"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="why-header">
            <h2 className="text-[52px] font-bold lg:text-5xl mb-10 max-sm:text-2xl">
              Why Choose <span style={{ color: '#3083DC' }}>GidiPitch</span>?
            </h2>
            <div className="space-y-6">
              {benefits.slice(0, 3).map((benefit, index) => {
                return (
                  <div
                    key={index}
                    className="benefit-item flex items-start group"
                  >
                    <div className="flex-shrink-0 mr-6 max-sm:mr-3">
                      <div className="rounded-xl flex items-center justify-center group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300">
                        <img
                          src={benefit.icon}
                          alt=""
                          className="w-[52px] h-[60px]"
                        />
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-[#1D1D1D] font-semibold text-[27px] cursor-pointer mb-2 group-hover:text-primary transition-colors max-sm:text-[18px]">
                        {benefit.title}
                      </h3>
                      <p className="leading-relaxed text-[16px] text-[#777777] font-medium">
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
                <p className="text-muted-foreground mb-4">
                  Sign up and start building your investor materials today.
                </p>
                <button className="btn-hero">Get Started</button>
              </div>
            )}
          </div>

          {/* Image */}
          <div className="relative z-10 why-image">
            <img
              src={founderPresenting}
              alt="African founder presenting to investors"
              className="w-full rounded-3xl shadow-strong"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyGidiPitch;
