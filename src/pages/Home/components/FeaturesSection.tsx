import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import pitchDeck from "/assets/features/landing_succed4.png";
import resumeBuilder from "/assets/features/landing_succed1.png";
import applicationAssistant from "/assets/features/landing_succed2.png";
import pitchPractice from "/assets/features/landing_succed3.png";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: pitchDeck,
    title: "AI-Powered Pitch Deck Builder",
    description:
      "Answer a few smart questions — we turn them into a stunning pitch deck tailored to your startup, your slides, and your industry.",
  },
  {
    icon: resumeBuilder,
    title: "Founder Resume Builder",
    description:
      "GidPitch helps you craft a founder resume that builds trust with VCs and accelerators.",
  },
  {
    icon: applicationAssistant,
    title: "AI Application Assistant",
    description:
      "Crack one of the hardest startup applications. GidPitch guides you through YC’s exact questions, with AI writing help and examples.",
  },
  {
    icon: pitchPractice,
    title: "AI Pitch Practice",
    description:
      "Get AI-simulated investor Q&A based on your pitch. Practice answering tough questions before you're in the room.",
  },
];

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const header = sectionRef.current.querySelector(".features-header");
      const cards = sectionRef.current.querySelectorAll(".feature-card");

      // Header fade-in
      gsap.fromTo(
        header,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: header,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Cards stagger fade-in
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="bg-white px-20 py-8 md:py-16 container max-sm:px-4 max-sm:py-0 max-sm:pb-14"
    >
      <div>
        {/* Section Header */}
        <div className="mb-16 text-center features-header">
          <p className="mb-2 p-1 text-sm font-medium capitalize border mx-auto text-[#5D5D5D] border-[#DBDBDB] rounded-xl bg-[#F5F5F5] w-fit px-4 max-sm:mb-2 max-sm:hidden">
            Features
          </p>
          <h2 className="mb-4 text-3xl font-bold text-[#2D2D2D] md:text-[52px] leading-[1.2] max-sm:text-[1.4rem] ">
            Everything You Need to Succeed
          </h2>
          <p className="mx-auto max-w-2xl text-[#8A8A8A] md:text-lg font-medium">
            Our comprehensive toolkit is designed specifically for African
            founders, understanding the unique challenges and opportunities in
            your ecosystem.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 ">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="feature-card rounded-lg bg-[#F5F5F5] p-6 shadow-sm hover:shadow-md transition duration-300 container"
              >
                <div className="mb-1 flex h-[52px] w-[52px] items-center justify-center rounded-lg border border-[#FFF1EC]">
                  <img
                    src={Icon}
                    alt={feature.title}
                    className="text-white h-[52px] w-[52px]"
                  />
                </div>
                <h3 className="mb-2 text-xl font-bold text-[#1D1D1D]">
                  {feature.title}
                </h3>
                <p className="mb-6 text-[#777777] leading-relaxed font-medium">
                  {feature.description}
                </p>
                <a
                  href="#"
                  className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2 font-semibold text-white shadow-md transition-all duration-300 hover:bg-primary/90 hover:shadow-lg active:scale-95"
                >
                  <span className="relative">Try for free</span>
                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
