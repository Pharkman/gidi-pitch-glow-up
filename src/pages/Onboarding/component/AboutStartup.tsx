import { startupOptions } from '@/lib/constant';
import { useState } from 'react';
import g from "/assets/gLogo.svg";

export default function AboutStartup() {
  const [startupType, setStartupType] = useState('');
  const [teamSize, setTeamSize] = useState('');


  return (
    <div className="min-h-screen flex flex-col items-center justify-center  bg-white px-4">
      {/* Logo */}
     <div className="mb-6">
       <img src={g} alt="Gidi Logo" />
      </div>


      {/* Progress Bar */}
      <div className="flex space-x-2 mb-8">
        <div className="w-16 h-2 bg-orange-500 rounded-full"></div>
        <div className="w-16 h-2 bg-gray-300 rounded-full"></div>
        <div className="w-16 h-2 bg-gray-300 rounded-full"></div>
      </div>

      {/* Heading */}
      <h1 className="text-2xl font-semibold mb-2 text-center max-w-3xl">Tell us about your startup</h1>
      <p className="text-gray-500 mb-6 text-center max-w-xs">
        This helps GidiPitch personalize your pitch and recommendations.
      </p>

      {/* Startup type selection */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 mb-6">
        {startupOptions.map(option => (
          <button
            key={option}
            onClick={() => setStartupType(option)}
            className={`px-2 py-2 rounded-lg border transition-colors ${
              startupType === option
                ? 'bg-orange-50 border-orange-500 text-orange-600'
                : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

<p className='mb-3 text-[16px] text-[#1D1D1D] font-mediuk'>What’s your current team size?</p>
      {/* Team size input */}
      <div className="w-full max-w-xs mb-6">
        <input
          type="text"
          placeholder="Who is your target audience?"
          value={teamSize}
          onChange={(e) => setTeamSize(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder:text-[14px] text-[#777777]"
        />
      </div>

      {/* Continue button */}
      <button
        className="w-full max-w-md bg-gradient-to-r from-[#FF7442] to-[#FF5619] text-white py-3   rounded-lg font-semibold hover:from-orange-500 hover:to-orange-600 transition-colors"
      >
      <p className='text-[15px]'><a href="/onboarding/shape-startup"> Continue </a></p>
      </button>
    </div>
  );
}