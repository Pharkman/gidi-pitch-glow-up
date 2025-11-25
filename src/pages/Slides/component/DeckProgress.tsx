import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetDeckProgress, useGetUser, useRetryDeck } from "@/lib/query";
import audio_loading from "../../../../public/audio/lofi-study-calm-peaceful-chill-hop-112191.mp3";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DeckProgress = ({ onComplete }: { onComplete: () => void }) => {
  const [showModal, setShowModal] = useState(false);
  const [isRetryingDeck, setIsRetryingDeck] = useState(false);
  const navigate = useNavigate();

  const deckId = localStorage.getItem("deckId");
  const { data: deckProgress, isFetching, refetch } = useGetDeckProgress(deckId || "");
  const { mutate: retryDeck, isPending: isRetrying } = useRetryDeck();
  const { data: user_data } = useGetUser();

  const token = user_data?.user?.tokens ?? 0;
  const progress = deckProgress?.data?.progress ?? 0;
  const status = deckProgress?.data?.status ?? "loading";
  const activityStatus = deckProgress?.data?.activityStatus ?? "Processing deck...";
  const totalSlides = deckProgress?.data?.totalSlides ?? 0;
  const completedSlides =
    deckProgress?.data?.completedSlides ?? Math.floor((progress / 100) * totalSlides);
  const isCompleted = progress >= 100 || status === "completed";

  // Handle Retry Logic
  const handleRetry = async () => {
    if (Number(token) <= 0) {
      setShowModal(true);
      return;
    }

    if (!deckId) {
      toast.error("Missing deckId. Cannot retry.");
      return;
    }

    setIsRetryingDeck(true);

    try {
      retryDeck(deckId, {
        onSuccess: async () => {
          toast.success("Deck retry successful! Resuming deck progress...");
          await refetch();
          setIsRetryingDeck(false);
        },
        onError: (err: any) => {
          toast.error(err?.message || "Failed to retry. Please try again.");
          setIsRetryingDeck(false);
        },
      });
    } catch (err: any) {
      toast.error(err?.message || "Failed to retry. Please try again.");
      setIsRetryingDeck(false);
    }
  };

  // 🎵 Play background music while loading
  useEffect(() => {
    let audio: HTMLAudioElement | null = null;

    if (!isCompleted) {
      audio = new Audio(audio_loading);
      audio.loop = true;
      audio.volume = 0.01;
      audio.play().catch(() => {
        console.warn("Autoplay blocked until user interacts.");
      });
    }

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [isCompleted]);

  // Poll until deck is ready
  useEffect(() => {
    if (!isCompleted) {
      const interval = setInterval(() => {
        refetch();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isCompleted, refetch]);

  // Trigger onComplete
  useEffect(() => {
    if (isCompleted) {
      const timer = setTimeout(() => onComplete(), 2500);
      return () => clearTimeout(timer);
    }
  }, [isCompleted, onComplete]);

  // 🧩 Error or Missing Deck - Show Retry UI
  if (!deckProgress || deckProgress?.status === "error" || !deckProgress?.data) {
    // Show spinner while retrying
    if (isRetryingDeck) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#0F1114] text-white">
          <div className="text-center space-y-4">
            <div className="animate-spin w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-300">Retrying deck, please wait...</p>
          </div>
        </div>
      );
    }

    // Otherwise show the “Something went wrong” screen
    return (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center min-h-screen bg-[#0F1114] text-center text-white px-6"
        >
          <h2 className="text-2xl font-semibold mb-2">Something went wrong</h2>
          <p className="text-gray-400 mb-6 text-sm">
            Unable to generate your deck right now. Please try again.
          </p>

          <button
            onClick={() => {
              if (Number(token) <= 0) {
                setShowModal(true);
              } else {
                handleRetry();
              }
            }}
            disabled={isRetrying || isRetryingDeck}
            className={`px-10 py-2.5 rounded-lg text-white font-medium transition-transform duration-300 ${
              isRetrying || isRetryingDeck
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-primary hover:scale-105"
            }`}
          >
            {isRetrying || isRetryingDeck ? "Retrying..." : "Retry"}
          </button>
        </motion.div>

        {showModal && (
          <AnimatePresence>
            <motion.div
              key="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <motion.div
                key="modal-content"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="bg-white rounded-xl px-8 py-10 max-w-2xl shadow-2xl text-center"
              >
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                  Insufficient Tokens
                </h2>
                <p className="text-gray-700 mb-3 text-base">
                  Your current balance is{" "}
                  <span className="font-bold text-gray-900">
                    {user_data?.user?.tokens ?? 0}
                  </span>{" "}
                  tokens.
                </p>
                <p className="text-gray-600 mb-6 text-sm">
                  You need tokens to retry the deck. Please purchase more tokens to continue.
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    className="flex-1 px-5 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex-1 px-5 py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition"
                    onClick={() => {
                      localStorage.setItem("pendingTokenPurchase", "1");
                      localStorage.setItem("redirectAfterPurchase", "deck");
                      navigate("/payment");
                    }}
                  >
                    Buy Tokens
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}
      </>
    );
  }

  // 🌟 Normal Deck Progress UI
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0F1114] to-[#1A1C1F] text-gray-100 p-6 font-[Geist]">
      <AnimatePresence mode="wait">
        {isFetching ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col space-y-6 items-center w-64"
          >
            <Skeleton className="w-48 h-48 rounded-full bg-white/10" />
            <Skeleton className="w-40 h-5 rounded-md bg-white/10" />
            <Skeleton className="w-32 h-3 rounded-md bg-white/10" />
          </motion.div>
        ) : !isCompleted ? (
          <motion.div
            key="progress"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-center text-center space-y-8"
          >
            <div className="relative w-56 h-56 flex items-center justify-center">
              <motion.svg
                className="w-full h-full drop-shadow-[0px_0px_20px_rgba(255,120,60,0.25)]"
                viewBox="0 0 100 100"
                initial={{ rotate: -90 }}
              >
                <circle cx="50" cy="50" r="45" stroke="#2B2E33" strokeWidth="8" fill="none" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="url(#premiumGrad)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * progress) / 100}
                  strokeLinecap="round"
                  animate={{ strokeDashoffset: 283 - (283 * progress) / 100 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id="premiumGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FF9E5A" />
                    <stop offset="100%" stopColor="#FF4A18" />
                  </linearGradient>
                </defs>
              </motion.svg>

              <motion.div
                key={progress}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="absolute flex flex-col items-center"
              >
                <span className="text-4xl font-semibold text-white drop-shadow-md">
                  {progress}%
                </span>
                <span className="text-sm text-gray-300">
                  {completedSlides}/{totalSlides} slides
                </span>
              </motion.div>

              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF7F50]/20 to-[#FF3D00]/10 blur-2xl"
                animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.06, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <motion.p
              key={activityStatus}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-gray-300 font-medium text-lg max-w-xs leading-snug"
            >
              {activityStatus}
            </motion.p>

            <motion.div
              className="w-5 h-5 bg-gradient-to-br from-[#FF7843] to-[#FF4C16] rounded-full shadow-[0_0_15px_rgba(255,80,30,0.6)]"
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="ready"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center flex flex-col items-center space-y-5"
          >
            <motion.div
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 160, damping: 10 }}
              className="relative w-28 h-28 flex items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.45)]"
            >
              <motion.span className="text-white text-5xl font-bold">✓</motion.span>
            </motion.div>

            <motion.h2 className="text-2xl font-semibold text-white">
              Deck created successfully!
            </motion.h2>
            <motion.p className="text-gray-300 text-sm">
              Your pitch deck is now ready to view.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DeckProgress;
