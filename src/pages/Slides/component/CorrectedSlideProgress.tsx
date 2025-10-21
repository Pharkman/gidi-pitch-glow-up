import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetCorrectedSlide } from "@/lib/query";
import { motion, AnimatePresence } from "framer-motion";

const CorrectSlideProgress = () => {
  const { slideId } = useParams<{ slideId: string }>();
  const navigate = useNavigate();
  const { data, refetch } = useGetCorrectedSlide(slideId || "");

  const status = data?.data?.status ?? "processing";
  const progress = data?.data?.progress ?? 0;

  const [showReady, setShowReady] = useState(false);

  // Polling until ready
  useEffect(() => {
    if (status !== "ready") {
      const interval = setInterval(() => refetch(), 3000);
      return () => clearInterval(interval);
    } else {
      setShowReady(true);
    }
  }, [status, refetch]);

  // Navigate back after showing ready
  useEffect(() => {
    if (showReady) {
      const timer = setTimeout(() => navigate("/deck"), 1500);
      return () => clearTimeout(timer);
    }
  }, [showReady, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800">
      <AnimatePresence mode="wait">
        {!showReady ? (
          <motion.div
            key="progress"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center space-y-6"
          >
            {/* Circular Progress */}
            <div className="relative w-48 h-48 flex items-center justify-center">
              <motion.svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#E5E7EB"
                  strokeWidth="8"
                  fill="none"
                />
                {/* Progress ring */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="url(#progressGradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={283}
                  strokeDashoffset={283 - (283 * progress) / 100}
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 283 }}
                  animate={{ strokeDashoffset: 283 - (283 * progress) / 100 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FF7442" />
                    <stop offset="100%" stopColor="#FF5619" />
                  </linearGradient>
                </defs>
              </motion.svg>

              {/* Center text */}
              <motion.div className="absolute flex flex-col items-center">
                <span className="text-4xl font-semibold text-gray-900 ">{progress}%</span>
                <span className="text-xs text-gray-500">Slide progress</span>
              </motion.div>

              {/* Breathing glow */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-tr animate-ping from-[#FF7442]/20 to-[#FF5619]/20 blur-3xl"
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <motion.p className="text-gray-700 font-medium text-lg animate-bounce">Processing slide...</motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="ready"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center space-y-5"
          >
            <motion.div className="relative w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg">
              <motion.span className="text-white text-5xl font-bold">✓</motion.span>
            </motion.div>
            <h2 className="text-2xl font-semibold text-gray-900">Slide ready!</h2>
            <p className="text-gray-500 text-sm">Redirecting back to deck...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CorrectSlideProgress;
