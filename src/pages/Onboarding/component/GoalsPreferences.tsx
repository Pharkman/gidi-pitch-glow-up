import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { FaRegFileAlt } from "react-icons/fa";
import { BsBarChartFill } from "react-icons/bs";
import { AiOutlineBulb } from "react-icons/ai";
import { GiSparkles } from "react-icons/gi";
import g from "/assets/gLogo.svg";

export default function GoalsPreferences() {
  const [selected, setSelected] = useState(["Create pitch deck"]);

  const toggleSelect = (goal) => {
    setSelected((prev) =>
      prev.includes(goal)
        ? prev.filter((g) => g !== goal)
        : [...prev, goal]
    );
  };

  const goals = [
    { label: "Create pitch deck", icon: <BsBarChartFill size={24} /> },
    { label: "Resume Builder", icon: <FaRegFileAlt size={24} /> },
    { label: "Application Assistant", icon: <AiOutlineBulb size={24} /> },
    { label: "AI Pitch Practice", icon: <GiSparkles size={24} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      {/* Back button */}
      <div className="absolute px-10 top-6 left-6 flex items-center gap-2 text-gray-600 cursor-pointer">
        <FiArrowLeft />
        <span className="text-sm font-medium"> <a href="/onboarding/shape-startup">Go Back</a></span>
      </div>

      {/* Logo */}
      <div className="flex flex-col items-center gap-4">
         <div className="mb-6">
       <img src={g} alt="Gidi Logo" />
      </div>

        {/* Progress bar */}
        <div className="flex gap-2 w-40">
          <div className="h-1 flex-1 rounded-full bg-gray-200"></div>
          <div className="h-1 flex-1 rounded-full bg-gray-200"></div>
          <div className="h-1 flex-1 rounded-full bg-orange-500"></div>
        </div>

        {/* Headings */}
        <h2 className="text-2xl font-bold text-center">Goals & Preferences</h2>
        <p className="text-gray-500 text-center text-sm max-w-sm">
          Let us know what you want to achieve with GIDIPitch
        </p>
      </div>

      {/* Goals */}
      <div className="mt-6 w-full max-w-lg">
        <p className="font-medium text-sm mb-4">
          What are your primary goals? <span className="text-gray-500">(Select all that apply)</span>
        </p>
        <div className="grid grid-cols-2 gap-4">
          {goals.map((goal) => {
            const isSelected = selected.includes(goal.label);
            return (
              <div
                key={goal.label}
                onClick={() => toggleSelect(goal.label)}
                className={`flex flex-col items-center justify-center p-6 rounded-xl border cursor-pointer transition ${
                  isSelected
                    ? "bg-gradient-to-r from-[#FF7442] to-[#FF5619] text-white border-none"
                    : "bg-white border-gray-300 text-gray-700 hover:border-orange-400"
                }`}
              >
                <div className="mb-2">{goal.icon}</div>
                <p className="font-medium text-sm">{goal.label}</p>
                <div
                  className={`absolute top-3 right-3 w-4 h-4 rounded-full border-2 ${
                    isSelected ? "bg-white border-white" : "border-gray-400"
                  }`}
                >
                  {isSelected && <div className="w-2 h-2 bg-orange-500 rounded-full m-auto mt-[2px]" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Finish button */}
      <button className="w-full max-w-md mt-10 bg-gradient-to-r  from-[#FF7442] to-[#FF5619] text-white py-3 rounded-lg font-semibold hover:from-orange-500 hover:to-orange-600 transition-colors">
      <a href="/dashboard">Finish</a>  
      </button>
    </div>
  );
}
