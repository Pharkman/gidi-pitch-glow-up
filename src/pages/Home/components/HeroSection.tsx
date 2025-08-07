import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import lgHeroImage from "/assets/lgHeroImage.svg";
import smHeroImage from "/assets/smHeroImage.svg";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      className="mx-auto w-[95%] md:w-[98%] mt-4 py-16 text-center"
    >
      <div className="bg-gradient-to-b from-[#FFFCFB] px-4 pt-4 to-[#FFDCCF] md:rounded-md">
        {/* Badge */}
        <p className="inline-block rounded-full px-4 py-2 font-medium text-[#FF5619]">
          Built for African Entrepreneurs
        </p>

        {/* Main Heading */}
        <h1 className="mb-6 text-4xl font-semibold text-[#1D1D1D] md:text-6xl">
          Your Complete Startup
          <br />
          Toolkit for African Founders
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-8 max-w-xl text-lg text-[#777777]">
          GidiPitch helps African founders create pitch decks, financials, and
          resumes with AI. Get investor-ready in minutes, not weeks.
        </p>

        {/* Buttons */}
        <div className="mb-16 flex flex-col items-center justify-center gap-4 md:flex-row">
          <button className="inline-flex items-center justify-center gap-2 btn-hero py-3 w-full md:w-fit">
            Try for free <ArrowRight />
          </button>
          <button className="w-full md:w-fit rounded-lg border border-[#FF5619] font-semibold text-[#FF5619] py-3 px-6">
            Watch Demo
          </button>
        </div>

        {/* Hero Image */}
        <div className="flex justify-center">
          <img
            src={lgHeroImage}
            alt="founder and his team"
            className="hidden md:block"
          />
          <img
            src={smHeroImage}
            alt="a founder"
            className="block md:hidden w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
