"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import lgHeroImage from "/assets/lgHeroImage.svg";
import smHeroImage from "/assets/smHeroImage.svg";
import GidiLogo from "../../../public/assets/Gidipitch Logo.svg";
import { useGetPeople, useWaitlist } from "@/lib/query";
import { LoadingSpinner } from "@/components/Loader";
import { toast } from "react-toastify";
import { socialLinks } from "@/components/dummy";
import FAQ from "@/components/FAQ";
import DeckloLogo from '../../../public/assets/DecloLogo.png'


const Waitlist = () => {
  
   const [displayedText, setDisplayedText] = useState("");
  const fullText = "Your Complete Startup";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 80); 
    return () => clearInterval(interval);
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState("");
   const { mutate, isPending } = useWaitlist();

   console.log('the one', mutate);
   

//   const waitlistMutation = useWaitlist();
  const { data: peopleData, isLoading: peopleLoading } = useGetPeople();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

    const handleJoinWaitlist = () => {
       // Basic validation
    if (!email) {
      toast.error("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    mutate(
      { email },
      {
        onSuccess: () => {
          setEmail(""); 
        },
      }
    );
  };

  return (
<section>
    <section
      id="hero"
      className="w-[95%] md:w-[98%] mt-4 py-16 max-sm:pb-8 text-center container"
    >
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-soft border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/">
                 <img src={DeckloLogo} alt="" className="w-[73%]"/>
              </Link>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <button
                className="btn-hero inline-flex gap-2 text-sm px-6 py-3 ml-0 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                

              >
                Join Waitlist 
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-foreground hover:text-primary p-2"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden animate-fade-in">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-md border border-border rounded-lg mt-2">
                <button className="inline-flex gap-2 btn-hero text-sm px-6 py-3 w-full">
                  Join Waitlist <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#F0F7FF] px-4 pt-4 to-[#85BEFC] md:rounded-md">
        {/* Badge */}
        <p className="inline-block rounded-full px-4 py-1 font-medium text-primary text-[14px] mb-3 bg-[#E2F6FF]  max-sm:mt-2">
          Built for African Entrepreneurs
        </p>

        {/* Heading */}
        <motion.h1
      className="mb-4 text-4xl font-extrabold text-[#1D1D1D] md:text-6xl max-sm:text-[1.67rem]"
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
        <p className="mx-auto mb-8 max-w-xl text-[16.5px] text-[#777777] max-sm:text-base font-medium ">
          Decklo helps African founders create pitch decks, financials,
          resumes,  pratice their pitch with AI, and do so much more. Get investor-ready in minutes, not weeks.
        </p>

        {/* Email Input + Button */}
       <div className="mb-4 flex flex-col md:flex-row items-center justify-center max-w-md mx-auto max-sm:gap-3">
  <input
    type="email"
    value={email}
     onChange={(e) => setEmail(e.target.value)}
    placeholder="Enter email address"
    className="w-full md:flex-1 rounded-l-lg border-none outline-none px-4 py-3 max-sm:rounded-lg placeholder:text-[15px]"
  />
  <button className="w-full md:w-auto rounded-r-lg bg-primary text-white font-semibold px-6 py-3 transition-all duration-300 hover:bg-primary max-sm:rounded-lg text-sm"
  onClick={handleJoinWaitlist}
  >
    {isPending ? <LoadingSpinner /> : "Join Waitlist"}
  </button>
</div>

        {/* People joined */}
        <p className="text-sm text-[#555555] mb-12">
  {peopleLoading
    ? "Loading..."
    : `${peopleData?.data.count || 0} ${
        peopleData?.data.count === 1 ? "PERSON" : "PEOPLE"
      } JOINED`}
</p>


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

      <div>
          <FAQ />
      </div>
     
    </section>
       <div className="flex justify-between px-4 items-center max-sm:flex-col max-sm:gap-5 mb-6">
        <p>© 2025 GidiPitch. All rights reserved.</p>

        <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
      </div>
</section>
  );
};

export default Waitlist;





