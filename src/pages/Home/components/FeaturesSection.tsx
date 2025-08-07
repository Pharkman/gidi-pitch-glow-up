import { ArrowUpRight } from "lucide-react";
import pitchDeck from "/assets/features/pitchDeck.svg";
import resumeBuilder from "/assets/features/resumeBuilder.svg";
import applicationAssistant from "/assets/features/applicationAssistant.svg";
import pitchPractice from "/assets/features/pitchPractice.svg";

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
  return (
    <section className="bg-white px-4 py-8 md:py-16">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="mb-2 p-1 text-sm font-medium uppercase border mx-auto text-[#5D5D5D] border-[#DBDBDB] rounded-lg bg-[#F5F5F5] w-fit">
            Features
          </p>
          <h2 className="mb-4 text-3xl font-medium text-[#2D2D2D] md:text-5xl">
            Everything You Need to Succeed
          </h2>
          <p className="mx-auto max-w-2xl text-[#8A8A8A] md:text-lg">
            Our comprehensive toolkit is designed specifically for African
            founders, understanding the unique challenges and opportunities in
            your ecosystem.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="rounded-lg bg-[#F5F5F5] p-6 shadow-sm hover:shadow-md transition duration-300"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg border bg-[#FF5619] border-[#FFF1EC]">
                  <img
                    src={Icon}
                    alt={feature.title}
                    className="text-white h-6 w-6"
                  />
                </div>
                <h3 className="mb-4 text-xl font-semibold text-[#1D1D1D]">
                  {feature.title}
                </h3>
                <p className="mb-6 text-[#777777] leading-relaxed">
                  {feature.description}
                </p>
                <a
                  href="#"
                  className="font-semibold flex items-center gap-2 text-primary"
                >
                  Try for free <ArrowUpRight />
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
