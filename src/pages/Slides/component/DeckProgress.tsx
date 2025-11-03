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
        {/* Progress Ring */}
        <div className="relative w-56 h-56 flex items-center justify-center">
          <motion.svg
            className="w-full h-full drop-shadow-[0px_0px_20px_rgba(255,120,60,0.25)]"
            viewBox="0 0 100 100"
            initial={{ rotate: -90 }}
          >
            {/* Track */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#2B2E33"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />

            {/* Progress */}
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
              transition={{
                duration: 1.2,
                ease: "easeInOut",
              }}
            />

            <defs>
              <linearGradient id="premiumGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FF9E5A" />
                <stop offset="100%" stopColor="#FF4A18" />
              </linearGradient>
            </defs>
          </motion.svg>

          {/* Center Text */}
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

          {/* Premium Glow */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF7F50]/20 to-[#FF3D00]/10 blur-2xl"
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.06, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Status */}
        <motion.p
          key={activityStatus}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-gray-300 font-medium text-lg max-w-xs leading-snug"
        >
          {activityStatus}
        </motion.p>

        {/* Breathing Dot */}
        <motion.div
          className="w-5 h-5 bg-gradient-to-br from-[#FF7843] to-[#FF4C16] rounded-full shadow-[0_0_15px_rgba(255,80,30,0.6)]"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    ) : (
      // ✅ Completion remains same feel but polished
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
          <motion.span className="text-white text-5xl font-bold">
            ✓
          </motion.span>
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
