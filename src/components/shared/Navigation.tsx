import { useState, useEffect } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import GidiLogo from "@/assets/Frame 481473.png";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#features", label: "Features" },
    { href: "#benefits", label: "Benefits" },
    { href: "#faq", label: "Faq" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-soft border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="md:flex md:gap-10">
            {/* Logo */}
            <Link to="/">
              <img src={GidiLogo} alt="" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="text-foreground hover:text-primary px-3 py-1 text-[16px] text-[#1D1D1D] font-medium transition-colors duration-200 hover:scale-105"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
             <div className="hidden md:flex items-center gap-3">
            <button
              className="text-primary text-sm px-4 py-2 font-semibold text-[16px] transition-all duration-300 hover:text-white hover:bg-primary hover:px-6 hover:py-3 rounded-lg"
              onClick={() => (window.location.href = "/signin")}
            >
              Login
            </button>
            <button className="btn-hero inline-flex gap-2 text-sm px-6 py-3 ml-0 transition-all duration-300 hover:scale-105 hover:shadow-lg"
           onClick={() => (window.location.href = "/signup")}
            >
              Try For Free <ArrowRight size={14} />
            </button>
          </div>

          {/* Mobile menu button */}
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
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-foreground hover:text-primary block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2">
                <button
                  className="text-primary font-semibold text-[16px]  px-4 py-2 block mb-2"
                  onClick={() => (window.location.href = "/signin")}
                >
                  Login
                </button>
                <button className="inline-flex gap-2 btn-hero text-sm px-6 py-2 w-full">
                  Try Free <ArrowRight size={14}/>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
