import React from "react";
import smartPhoneIcon from '../../../../public/assets/smart-phone.png'
import aiSchedulingIcon from '../../../../public/assets/ai-scheduling.png'
import folderCloud from '../../../../public/assets/folder-cloud.png'

export default function SolutionSlide() {
  return (
    <div className="w-full min-h-screen  bg-[#F2F4FF] text-[#5063FF] px-10 py-10 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start w-full">
        <p className="text-md tracking-wide ">TAM AI</p>
        <p className="text-md tracking-wide text-[#5063FF]">OCTOBER, 2025</p>
      </div>

      {/* Title */}
      <h1 className="text-5xl leading-[120px] font-bold mt-10 mb-16">SOLUTION</h1>

      {/* Main Content */}
      
      <div className="grid grid-cols-3 gap-6">
           <div className="flex flex-col items-start justify-between space-y-16">
          <div className=" mb-6"><img src={smartPhoneIcon} alt="smart-phone" /></div>
          <div>
          <h2 className="text-2xl font-bold mb-4">TELEMEDICINE FOR ALL</h2>
          <p className="text-[18px] font-medium leading-[23px] ">
            A digital platform connecting patients with verified doctors instantly,
            anytime, anywhere.
          </p>
          </div>
        </div>
     {/* <p className=""></p> */}

          <div className="flex flex-col items-start justify-between space-y-16">
          <div className=" mb-6"><img src={aiSchedulingIcon} alt="smart-phone" /></div>
          <div>
          <h2 className="text-2xl font-bold mb-4">TELEMEDICINE FOR ALL</h2>
          <p className="text-[18px] font-medium leading-[23px] ">
            A digital platform connecting patients with verified doctors instantly,
            anytime, anywhere.
          </p>
          </div>
        </div>

           <div className="flex flex-col items-start justify-between space-y-16">
          <div className=" mb-6"><img src={folderCloud} alt="smart-phone" /></div>
          <div>
          <h2 className="text-2xl font-bold mb-4">TELEMEDICINE FOR ALL</h2>
          <p className="text-[18px] font-medium leading-[23px] ">
            A digital platform connecting patients with verified doctors instantly,
            anytime, anywhere.
          </p>
          </div>
        </div>
      </div>
    </div>
  );
}
