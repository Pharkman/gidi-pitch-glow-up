"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import lgHeroImage from "/assets/lgHeroImage.svg";
import smHeroImage from "/assets/smHeroImage.svg";
import { useEffect, useState } from "react";

const HeroSection = () => {

  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Your Complete Startup";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 80); // typing speed
    return () => clearInterval(interval);
  }, []);


  return (
    <section
      id="hero"
      className=" w-[99%] md:w-[98%] mt-4 py-16 text-center  container"
    >
      <div className="bg-gradient-to-b from-[#F0F7FF] px-4 pt-4 to-[#85BEFC] md:rounded-2xl">
        {/* Badge */}
        <p className="inline-block rounded-full mt-5  px-4 py-2 font-medium text-primary text-[15px] mb-3 bg-[#E2F6FF] py-1 max-sm:mt-2">
          Built for African Entrepreneurs
        </p>

        {/* Main Heading */}
        <motion.h1
          className="mb-4 text-4xl font-extrabold text-[#1D1D1D] md:text-6xl max-sm:text-[1.65rem]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {displayedText}
          <br />
          <motion.p
            className="mt-3 max-sm:mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Toolkit for African Founders
          </motion.p>
        </motion.h1>

        {/* Subtitle */}
        <p className="mx-auto mb-8 max-w-xl text-lg text-[#777777] max-sm:text-base font-medium">
          GidiPitch helps African founders create pitch decks, financials, and
          resumes with AI. Get investor-ready in minutes, not weeks.
        </p>

        {/* Buttons */}
        <div className="mb-16 flex flex-col items-center justify-center gap-4 md:flex-row">
          <button className="inline-flex items-center justify-center gap-2 btn-hero py-3 w-full md:w-fit max-sm:text-[16px] font-medium text-[16px]">
            <a href="/signup" >Try For Free</a> <ArrowRight size={18} />
          </button>
          <button className=" text-[16px] w-full md:w-fit rounded-lg border border-primary  text-primary py-3 px-6 
  transition-all duration-300 hover:bg-primary max-sm:text-[16px] hover:text-white font-medium">
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
