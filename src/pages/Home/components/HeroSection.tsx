import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import lgHeroImage from "/assets/lgHeroImage.svg";
import smHeroImage from "/assets/smHeroImage.svg";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      className=" w-[99%] md:w-[98%] mt-4 py-16 text-center  container"
    >
      <div className="bg-gradient-to-b from-[#FFFCFB] px-4 pt-4 to-[#FFDCCF] md:rounded-md">
        {/* Badge */}
        <p className="inline-block rounded-full  px-4 py-2 font-medium text-[#FF5619] text-[15px] mb-3 bg-[#FFF1EC] py-1 max-sm:mt-2">
          Built for African Entrepreneurs
        </p>

        {/* Main Heading */}
        <h1 className="mb-6 text-4xl font-extrabold text-[#1D1D1D] md:text-6xl max-sm:text-[1.6rem] ">
          Your Complete Startup
          <br/>
          <p className="mt-3">Toolkit for African Founders</p>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-8 max-w-xl text-lg text-[#777777] max-sm:text-base font-medium">
          GidiPitch helps African founders create pitch decks, financials, and
          resumes with AI. Get investor-ready in minutes, not weeks.
        </p>

        {/* Buttons */}
        <div className="mb-16 flex flex-col items-center justify-center gap-4 md:flex-row">
          <button className="inline-flex items-center justify-center gap-2 btn-hero py-3 w-full md:w-fit max-sm:text-[16px]">
            Try for free <ArrowRight size={18}/>
          </button>
       <button className="w-full md:w-fit rounded-lg border border-[#FF5619] font-semibold text-[#FF5619] py-3 px-6 
  transition-all duration-300 hover:bg-[#FF5619] max-sm:text-[16px] hover:text-white">
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
