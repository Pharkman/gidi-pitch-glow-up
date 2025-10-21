import MessageInputBox from "@/components/MessageInput/MessageInput";
import { useState } from "react";
import EditWithAIButton from "@/components/EditAiButton/EditAiButton";
import { useCorrectGeneratedSlide } from "@/lib/query";
import { useNavigate } from "react-router-dom";

const SlideCorrectionContainer = () => {
  const [showInput, setShowInput] = useState(false);
  const correctSlideMutation = useCorrectGeneratedSlide();
  const navigate = useNavigate();

  const handleSend = (correctionText: string) => {
    const activeSlideId = localStorage.getItem("activeSlideId");

    if (!activeSlideId) {
      console.error("No active slide found in localStorage");
      return;
    }

    correctSlideMutation.mutate(
      { slideId: activeSlideId, correction: correctionText },
      {
        onSuccess: () => {
          navigate(`/correct-slide/${activeSlideId}`);
        },
      }
    );

    setShowInput(false);
  };

  return (
    <div className="fixed bottom-0 left-64 max-sm:left-0 w-[calc(100%-16rem)] max-sm:w-full z-30 px-5 flex justify-end">
      {showInput ? (
        // Input box takes full width of the container (same as Edit button)
        <div className="w-full">
          <MessageInputBox onSend={handleSend} />
        </div>
      ) : (
        // Edit button is shown when input box is hidden
        <div className="w-full" onClick={() => setShowInput(true)}>
          <EditWithAIButton />
        </div>
      )}
    </div>
  );
};

export default SlideCorrectionContainer;
