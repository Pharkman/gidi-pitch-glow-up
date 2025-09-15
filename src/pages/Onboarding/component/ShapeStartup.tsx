import { FiArrowLeft } from "react-icons/fi";
import g from "/assets/gLogo.svg";

const ShapeStartup= () => {
  return (
    <div className="min-h-screen py-10 max-sm:py-10 flex flex-col items-center justify-center bg-white px-4">
      {/* Go Back */}
      {/* <div className="self-start mb-6 flex items-center cursor-pointer text-gray-700 px-10">
        <span className="mr-2 text-2xl">{'<-'}</span> Go Back
      </div> */}

        <div className="absolute px-10 top-6 left-6 flex items-center gap-2 text-gray-600 cursor-pointer">
        <FiArrowLeft />
        <span className="text-sm font-medium">Go Back</span>
      </div>

      {/* Logo */}
      <div className="mb-6">
       <img src={g} alt="Gidi Logo" />
      </div>

      {/* Progress Indicator */}
      <div className="flex space-x-2 mb-6">
        <div className="w-16 h-2 bg-gray-300 rounded-full"></div>
        <div className="w-16 h-2 bg-orange-500 rounded-full"></div>
        <div className="w-16 h-2 bg-gray-300 rounded-full"></div>
      </div>

      {/* Title & Subtitle */}
      <h1 className="text-3xl text-[#1D1D1D] font-semibold mb-2 text-center">Shape Your Startup Journey</h1>
      <p className="text-[#858585] text-[15px] mt-1 text-center mb-6">
        Tell us who you’re building for and what you’re aiming to achieve.
      </p>

      {/* Form */}
      <div className="w-full max-w-xl flex flex-col space-y-6">
        <div className="flex flex-col">
          <label className="mb-3 text-[#1D1D1D] font-medium">Who is your target audience?</label>
          <input
            type="text"
            placeholder="Who is your target audience?"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-3 text-[#1D1D1D] font-medium">What’s your goal right now?</label>
          <input
            type="text"
            placeholder="What’s your goal right now?"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
      </div>

      {/* Buttons */}
     
        <button
      className="w-full max-w-xl bg-gradient-to-r from-[#FF7442] to-[#FF5619] text-white py-3   rounded-lg font-semibold hover:from-orange-500 hover:to-orange-600 transition-colors mt-10 mb-6"
      >
      <p className='text-[15px]'> <a href="/onboarding/goal_preference">Continue </a> </p>
      </button>
        <button className="text-[#5D5D5D] font-semibold text-[15px]">
          <a href="/onboarding/goal_preference">Skip for now</a>

        </button>
     
    </div>
  );
};

export default ShapeStartup;
