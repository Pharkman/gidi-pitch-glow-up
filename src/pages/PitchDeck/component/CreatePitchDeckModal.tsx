import { useState } from "react";
import { IoClose } from "react-icons/io5";
import File_img from "../../../../public/assets/file.png";
import Sparkles from "../../../../public/assets/Sparkle.png";
import CreatePitchDeckStepOne from "./CreatePitchDeckStepOne";

export default function CreatePitchDeckModal({ onClose }: { onClose: () => void }) {

  const [showStepOne, setShowStepOne] = useState(false);

  if (showStepOne) {
    
    return <CreatePitchDeckStepOne onClose={() => setShowStepOne(false)} />;
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-5 border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Create Pitch Deck</h2>
          <button
            onClick={onClose}
            className="text-[#1D1D1D] hover:text-[#1d1d1dd3] transition"
          >
            <IoClose size={20} />
          </button>
        </div>

        {/* Option 1 — Start from scratch */}
        <div
          onClick={() => setShowStepOne(true)}
          className="flex items-center gap-3 bg-[#F9F9F9] rounded-xl p-3 mb-3 hover:bg-gray-100 cursor-pointer transition border border-[#EFEFEFB2]"
        >
          <div className="flex items-center justify-center w-[50px] h-[50px] bg-[#F5F5F5] rounded-lg">
            <img
              src={File_img}
              alt="file"
              className="w-[20px] h-[24px] object-contain"
            />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 text-sm mb-1">
              Start from scratch
            </h3>
            <p className="text-xs text-gray-500">
              Build completely from blank template
            </p>
          </div>
        </div>

        {/* Option 2 */}
        <div className="flex items-center gap-3 bg-[#F9F9F9] rounded-xl p-3 mb-3 hover:bg-gray-100 cursor-pointer transition border border-[#EFEFEFB2]">
          <div className="flex items-center justify-center w-[50px] h-[50px] bg-[#F5F5F5] rounded-lg">
            <img
              src={File_img}
              alt="file"
              className="w-[20px] h-[24px] object-contain"
            />
          </div>
          <div>
            <h3 className="font-medium text-[#1D1D1D] text-sm mb-1">
              Import file
            </h3>
            <p className="text-xs text-gray-500">
              Upload and enhance existing document
            </p>
          </div>
        </div>

        {/* Option 3 */}
        <div className="flex items-center gap-3 bg-[#F9F9F9] rounded-xl p-3 hover:bg-gray-100 cursor-pointer transition border border-[#EFEFEFB2]">
          <div className="flex items-center justify-center w-[50px] h-[50px] bg-[#F5F5F5] rounded-lg">
            <img
              src={Sparkles}
              alt="sparkles"
              className="w-[20px] h-[24px] object-contain"
            />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 text-sm mb-1">
              Start with AI
            </h3>
            <p className="text-xs text-gray-500">
              Let AI help you create initial content
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
