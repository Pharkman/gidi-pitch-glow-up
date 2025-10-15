import { FiArrowLeft } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCreatePitchDeck } from "@/lib/query";
import { toast } from "react-toastify";


export default function CreatePitchDeckStepFour({ onClose }) {
  const navigate = useNavigate();
  const { mutate, isPending } = useCreatePitchDeck();
  const [pitchData, setPitchData] = useState(null);

  // Load data from localStorage when component mounts
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("pitchDeckData"));
    if (savedData) setPitchData(savedData);
  }, []);

  const handleSubmit = () => {
    if (!pitchData) {
      toast.error("No pitch data found!");
      return;
    }

    // Format payload (ensure keys match your backend API)
    const payload = {
      startUpName: pitchData.startupName || "",
      industry: pitchData.industry || "",
      brandColor: pitchData.brandColor || "#FF5619", // optional fallback
      problems: pitchData.problems ? [pitchData.problems] : [],
      solutions: pitchData.solutions ? [pitchData.solutions] : [],
      features: pitchData.features ? [pitchData.features] : [],
      founders: pitchData.team ? [pitchData.team] : [],
      scope: pitchData.scope || "",
      slides: pitchData.slides || [],
    };

    mutate(payload, {
      onSuccess: () => {
        localStorage.removeItem("pitchDeckData");
        toast.success("Pitch Deck Created!");
        navigate("/dashboard/pitchdecks");
      },
    });
  };

  if (!pitchData) {
    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl text-center">
          <p className="text-gray-600 text-sm">Loading saved pitch deck data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl rounded-2xl p-6 shadow-xl border border-gray-100 max-sm:mx-3">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-900">Review & Submit</h2>
          <button
            onClick={onClose}
            className="text-gray-700 hover:text-gray-900 transition"
          >
            <IoClose size={22} />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-10 h-1.5 rounded-full bg-gray-200"></div>
          <div className="w-10 h-1.5 rounded-full bg-gray-200"></div>
          <div className="w-10 h-1.5 rounded-full bg-orange-500"></div>
        </div>

        {/* Summary (optional for display) */}
        <div className="space-y-3 mb-6">
          <p><strong>Startup Name:</strong> {pitchData.startupName}</p>
          <p><strong>Industry:</strong> {pitchData.industry}</p>
          <p><strong>Scope:</strong> {pitchData.scope}</p>
          <p><strong>Team:</strong> {pitchData.team}</p>
          <p><strong>Problem:</strong> {pitchData.problems}</p>
          <p><strong>Solution:</strong> {pitchData.solutions}</p>
          <p><strong>Ask:</strong> {pitchData.ask}</p>
        </div>

        {/* Navigation Buttons */}
        <section className="flex justify-between items-center">
          <div
            onClick={() => navigate("/create-pitchdeck/step-three")}
            className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-gray-900 transition"
          >
            <FiArrowLeft className="text-lg" />
            <span className="text-sm font-medium">Go Back</span>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={isPending}
              className={`${
                isPending ? "bg-orange-300" : "bg-[#FF5619] hover:bg-orange-600"
              } text-white text-sm font-medium px-5 py-2.5 rounded-lg transition`}
            >
              {isPending ? "Submitting..." : "Submit"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
