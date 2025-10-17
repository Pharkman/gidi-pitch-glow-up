import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCreatePitchDeck, useGetDeckProgress } from "@/lib/query";
import { toast } from "react-toastify";
import { FiArrowLeft } from "react-icons/fi";

export default function CreatePitchDeckStepFive() {
  const navigate = useNavigate();
  const [pitchData, setPitchData] = useState<Record<string, string | string[]>>({});

  const [deckId, setDeckId] = useState<string | null>(null);

  // Load saved data from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("pitchDeckData") || "{}");
    setPitchData(saved);
  }, []);

  // Create pitch deck mutation
  const { mutate, isPending } = useCreatePitchDeck();

  // ✅ Automatically fetch deck progress when deckId is set
  const { data: deckProgress, isFetching: isProgressLoading } = useGetDeckProgress(deckId || "");
  // console.log("🚀 Deck Progress:", deckProgress);

  const handleSubmit = () => {
    const payload = {
      startupName: pitchData.startupName || "",
      industry: pitchData.industry || "",
      brandColor: pitchData.brandColor || "",
      businessModel: pitchData.businessModel || "",
      problems: pitchData.problems || "",
      solutions: pitchData.solutions || "",
      features: pitchData.features || "",
      team: pitchData.team || [],
      scope: pitchData.scope || "",
      slides: pitchData.slides || [],
      imageGenType: pitchData.imageGenType || "manual",
      competitions: pitchData.competitions || "",
    };

    console.log("🚀 Sending full payload:", payload);

    mutate(payload, {
      onSuccess: (res) => {
        toast.success("Pitch deck created successfully!");
        localStorage.removeItem("pitchDeckData");

        // ✅ Extract and store the new Deck ID in localStorage
         const newDeckId = res?.data?.deckId;
    const progress = res?.data?.progress;

    if (newDeckId) {
      console.log("🎯 New Deck ID:", newDeckId);
      console.log("📊 Deck Progress:", progress);

      setDeckId(newDeckId);
      localStorage.setItem("deckId", newDeckId);
    }

        // Navigate (can be delayed or modified later)
        navigate("/deck");
      },
      onError: () => {
        toast.error("Failed to create pitch deck. Try again!");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900/80 via-black/60 to-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50 px-4 py-12">
      <div className="bg-white/90 backdrop-blur-md w-full max-w-3xl rounded-2xl p-8 shadow-2xl border border-gray-200 animate-fadeIn flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Review & Submit Your <span className="text-[#FF5619]">Pitch Deck</span>
        </h2>

        {/* Review Section */}
        <div className="space-y-4 overflow-y-auto max-h-[60vh] pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {Object.entries(pitchData).map(([key, value]) => (
            <div
              key={key}
              className="p-4 border border-gray-200 rounded-xl bg-gradient-to-r from-white to-gray-50 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <span className="font-semibold text-gray-800 capitalize">{key}:</span>{" "}
              {Array.isArray(value) ? (
                value.map((item, i) =>
                  typeof item === "object" && item !== null ? (
                    <pre
                      key={i}
                      className="ml-3 bg-gray-100 text-gray-700 rounded-lg p-2 mt-1 text-sm"
                    >
                      {JSON.stringify(item, null, 2)}
                    </pre>
                  ) : (
                    <span key={i} className="ml-2 text-gray-700 text-sm">
                      {String(item)}
                    </span>
                  )
                )
              ) : typeof value === "object" && value !== null ? (
                <pre className="ml-3 bg-gray-100 text-gray-700 rounded-lg p-2 mt-1 text-sm">
                  {JSON.stringify(value, null, 2)}
                </pre>
              ) : (
                <span className="ml-2 text-gray-700 text-sm">{String(value)}</span>
              )}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <section className="flex justify-between items-center mt-8 border-t pt-5">
          <div
            onClick={() => navigate("/create-pitchdeck/step-four")}
            className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-gray-900 transition"
          >
            <FiArrowLeft className="text-lg" />
            <span className="text-sm font-medium">Go Back</span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isPending}
            className={`relative overflow-hidden bg-gradient-to-r from-[#FF5619] to-[#FF7B3C] text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-300 ${
              isPending
                ? "opacity-70 cursor-not-allowed"
                : "hover:scale-105 hover:shadow-lg"
            }`}
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Submitting...
              </span>
            ) : (
              "Submit Pitch Deck"
            )}
          </button>
        </section>
      </div>
    </div>
  );
}
