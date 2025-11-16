import React from "react";
import smartPhoneIcon from '../../../../public/assets/smart-phone.png'
import aiSchedulingIcon from '../../../../public/assets/ai-scheduling.png'
import folderCloud from '../../../../public/assets/folder-cloud.png'
import Team from '../../../../public/assets/team.png'

export default function TeamSlide() {
  return (
    <div className="w-full min-h-screen bg-[#F2F4FF] text-[#5063FF] px-8 py-12 flex flex-col">

      {/* Header */}
      <div className="flex justify-between items-start w-full opacity-80">
        <p className="text-lg tracking-wide font-semibold">TAM AI</p>
        <p className="text-lg tracking-wide font-semibold">OCTOBER, 2025</p>
      </div>

      {/* Title */}
      <h1 className="text-[85px] leading-[100px] font-extrabold mt-10 mb-20 uppercase tracking-tight">
        Meet the Team
      </h1>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-4"> 
        {[1, 2, 3, 4].map((_, index) => (
          <div key={index} className="flex flex-col bg-white   p-6 transition-all duration-300 border border-[#E4E7FF]">

            {/* Image */}
            <img
              src={Team}
              alt="team-member"
              className="h-80 mb-6 object-cover "
            />

            {/* Name */}
            <h2 className="text-2xl font-bold text-[#3E4CE0] ">James Mike</h2>
            <p className="text-lg font-medium mt-1  opacity-80">(Product Designer)</p>

            {/* Bio */}
            <p className="text-[16px] font-medium opacity-70 leading-[24px] mt-5">
              Led previous SaaS venture to $10M+ ARR by securing 50+ Fortune 500 clients, mastering enterprise GTM.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
