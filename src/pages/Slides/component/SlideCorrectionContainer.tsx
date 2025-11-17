import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineRobot } from "react-icons/ai"; // AI correction icon

import MessageInputBox from "@/components/MessageInput/MessageInput";
import EditWithAIButton from "@/components/EditAiButton/EditAiButton";
import { useCorrectGeneratedSlide } from "@/lib/query";

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
    <div className="fixed bottom-0 left-64 max-sm:left-0 w-[calc(100%-16rem)] max-sm:w-full z-30 px-5 pb-4 bg-white backdrop-blur-md">
      <AnimatePresence mode="wait">
        {showInput ? (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <MessageInputBox onSend={handleSend} />
          </motion.div>
        ) : (
          <motion.div
            key="button"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-between w-full cursor-pointer"
            onClick={() => setShowInput(true)}
          >
            <div className="flex items-center gap-2">
              <AiOutlineRobot className="text-primary" size={22} />
              <span className="text-gray-700 font-medium">AI Correction</span>
            </div>
            {/* <div className="flex-shrink-0">
              <EditWithAIButton />
            </div> */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SlideCorrectionContainer;
