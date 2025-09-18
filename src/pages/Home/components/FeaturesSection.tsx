import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import pitchDeck from "/assets/features/landing_succed4.png";
import resumeBuilder from "/assets/features/landing_succed1.png";
import applicationAssistant from "/assets/features/landing_succed2.png";
import pitchPractice from "/assets/features/landing_succed3.png";
import { useEffect, useRef } from "react";

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

  const cards = sectionRef.current.querySelectorAll(".feature-card");

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
        start: "top 85%",
        toggleActions: "play none none reverse", // keeps it smooth
      },
    }
  );
}, []);

  return (
    <section id="features" className="bg-white px-20 py-8 md:py-16 container max-sm:px-4 max-sm:py-4">
      <div className="">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="mb-2 p-1 text-sm font-medium capitalize border mx-auto text-[#5D5D5D] border-[#DBDBDB] rounded-xl bg-[#F5F5F5] w-fit px-4">
            Features
          </p>
          <h2 className="mb-4 text-3xl font-medium text-[#2D2D2D] md:text-[52px] leading-[1.2] max-sm:text-2xl">
            Everything You Need to Succeed
          </h2>
          <p className="mx-auto max-w-2xl text-[#8A8A8A] md:text-lg">
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
                <div className="mb-1 flex h-[52px ] w-[52px] items-center justify-center rounded-lg border  border-[#FFF1EC]">
                  <img
                    src={Icon}
                    alt={feature.title}
                    className="text-white h-[52px ] w-[52px]"
                  />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-[#1D1D1D]">
                  {feature.title}
                </h3>
                <p className="mb-6 text-[#777777] leading-relaxed">
                  {feature.description}
                </p>
                <a
                  href="#"
                  className="font-semibold flex items-center gap-2 text-primary text-[16px]"
                >
                  Try for free <ArrowUpRight size={18} className="font-semibold"/>
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
