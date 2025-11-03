import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetDeckProgress } from "@/lib/query";
import audio_loading from '../../../../public/audio/lofi-study-calm-peaceful-chill-hop-112191.mp3'


const DeckProgress = ({ onComplete }: { onComplete: () => void }) => {
   const deckId = localStorage.getItem("deckId");
  const { data: deckProgress, isFetching, refetch } = useGetDeckProgress(deckId || "");

  const progress = deckProgress?.data?.progress ?? 0;
  const status = deckProgress?.data?.status ?? "loading";
  const activityStatus = deckProgress?.data?.activityStatus ?? "Processing deck...";
  const totalSlides = deckProgress?.data?.totalSlides ?? 0;
  const completedSlides =
    deckProgress?.data?.completedSlides ?? Math.floor((progress / 100) * totalSlides);

  const isCompleted = progress >= 100 || status === "completed";

  // 🎵 Add: play background music while loading
  React.useEffect(() => {
    let audio: HTMLAudioElement | null = null;

    if (!isCompleted) {
      // Replace the URL with your preferred subtle/subtle ambient track
      audio = new Audio(audio_loading);
      audio.loop = true;
      audio.volume = 0.01; // low subtle volume
      audio.play().catch(() => {
        console.warn("Autoplay blocked, will start when user interacts.");
      });
    }

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [isCompleted]);
  // 🎵 End of music effect

  // Poll until deck is ready
  React.useEffect(() => {
    if (!isCompleted) {
      const interval = setInterval(() => {
        refetch();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isCompleted, refetch]);

  // Trigger onComplete
  React.useEffect(() => {
    if (isCompleted) {
      const timer = setTimeout(() => onComplete(), 2500);
      return () => clearTimeout(timer);
    }
  }, [isCompleted, onComplete]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900/80 via-black/60 to-gray-900/80 backdrop-blur-sm font-[Geist] text-gray-800 p-6">
      <AnimatePresence mode="wait">
        {isFetching ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col space-y-6 items-center w-64"
          >
            <Skeleton className="w-48 h-48 rounded-full" />
            <Skeleton className="w-40 h-5 rounded-md" />
            <Skeleton className="w-32 h-3 rounded-md" />
          </motion.div>
        ) : !isCompleted ? (
          <motion.div
            key="progress"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex flex-col items-center text-center space-y-6"
          >
            {/* Circular Progress Ring */}
            <div className="relative w-48 h-48 flex items-center justify-center">
              <motion.svg
                className="w-full h-full"
                viewBox="0 0 100 100"
                initial={{ rotate: -90 }}
              >
                {/* Background circle */}
                <circle cx="50" cy="50" r="45" stroke="#E5E7EB" strokeWidth="8" fill="none" />
                {/* Progress ring */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="url(#progressGradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * progress) / 100}
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 283 }}
                  animate={{ strokeDashoffset: 283 - (283 * progress) / 100 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FF7442" />
                    <stop offset="100%" stopColor="#FF5619" />
                  </linearGradient>
                </defs>
              </motion.svg>

              {/* Center Text */}
              <motion.div
                key={progress}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute flex flex-col items-center"
              >
                <span className="text-4xl font-semibold text-gray-900 max-sm:text-2xl">{progress}%</span>
                <span className="text-xs text-gray-500">
                  {completedSlides}/{totalSlides} slides
                </span>
              </motion.div>

              {/* Breathing glow */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF7442]/20 to-[#FF5619]/20 blur-3xl"
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* Activity Status with sliding animation */}
            <motion.p
              key={activityStatus}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-white font-medium text-lg max-w-sm max-sm:text-base"
            >
              {activityStatus}
            </motion.p>

            {/* Breathing dot indicator */}
            <motion.div
              className="w-4 h-4 bg-[#FF5619] rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        ) : (
          <motion.div
  key="ready"
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="text-center flex flex-col items-center space-y-5"
>
  {/* Glowing circular check */}
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: "spring", stiffness: 180, damping: 12 }}
    className="relative w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.4)]"
  >
    <motion.div
      className="absolute inset-0 rounded-full bg-white/20 blur-md"
      animate={{
        opacity: [0.4, 0.8, 0.4],
        scale: [1, 1.1, 1],
      }}
      transition={{
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut",
      }}
    />
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.3, type: "spring" }}
      className="text-white text-5xl font-bold"
    >
      ✓
    </motion.span>
  </motion.div>

  {/* Success text */}
  <motion.h2
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
    className="text-2xl font-semibold text-white"
  >
    Deck created successfully!
  </motion.h2>

  {/* Subtext */}
  <motion.p
    initial={{ opacity: 0, y: 5 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.7 }}
    className="text-white text-sm"
  >
    Your pitch deck is now ready to view.
  </motion.p>
</motion.div>

        )}
      </AnimatePresence>
    </div>
  );
};

export default DeckProgress;
