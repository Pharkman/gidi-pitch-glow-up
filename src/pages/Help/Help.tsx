import React from "react";
import { motion } from "framer-motion";
import { FaRobot, FaFilePowerpoint, FaCoins, FaUser, FaEnvelopeOpenText } from "react-icons/fa";

const Help = () => {
  const steps = [
    {
      icon: <FaUser size={28} className="text-[#FF5A1F]" />,
      title: "1. Sign In or Create an Account",
      desc: "Start by creating your account or signing in with your existing credentials. This allows the app to personalize your experience and save your progress.",
    },
    {
      icon: <FaFilePowerpoint size={28} className="text-[#FF5A1F]" />,
      title: "2. Create a New Deck",
      desc: "Click on 'New Deck' to begin generating your pitch deck or presentation. Provide your topic or company name, and our AI will generate the initial slides for you.",
    },
    {
      icon: <FaRobot size={28} className="text-[#FF5A1F]" />,
      title: "3. AI Correction & Editing",
      desc: "You can refine your slides using the AI Correction feature. Click the AI icon at the bottom of the slide to suggest updates or improvements to your deck.",
    },
    {
      icon: <FaCoins size={28} className="text-[#FF5A1F]" />,
      title: "4. Manage Your Tokens",
      desc: "Each AI generation or correction consumes tokens. Keep track of your token balance on your dashboard and purchase more when needed using Paystack.",
    },
    {
      icon: <FaEnvelopeOpenText size={28} className="text-[#FF5A1F]" />,
      title: "5. Notifications & Updates",
      desc: "Stay updated with system alerts and transaction updates through your notification center. Red dot indicators show when new updates are available.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1114] to-[#1A1C1F] text-gray-100 p-8 max-sm:p-4 font-[Geist]">
      <div className="max-w-6xl mx-auto space-y-6 max-sm:max-w-xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-4xl font-semibold text-white max-sm:mt-2"
        >
          Help & Getting Started
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-300  mx-auto text-sm sm:text-base leading-relaxed"
        >
          Welcome to your AI-powered deck builder! This guide walks you through everything you
          need to know about using the app — from creating decks to managing your tokens.
        </motion.p>

        <div className="mt-10 grid gap-8 sm:gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-start gap-5 bg-white/5 rounded-2xl p-5 border border-white/10 hover:border-[#FF5A1F]/50 hover:bg-white/10 transition-all duration-300"
            >
              <div className="p-3 bg-[#FF5A1F]/10 rounded-xl">{step.icon}</div>
              <div className="text-left space-y-2">
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Extra Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 bg-white/5 border border-white/10 rounded-2xl p-6 text-left"
        >
          <h2 className="text-xl font-semibold text-white mb-3">Tips for Best Results</h2>
          <ul className="list-disc list-inside text-sm text-gray-300 space-y-2">
            <li>Provide clear, descriptive prompts for more accurate AI-generated slides.</li>
            <li>Use the AI Correction feature to improve tone, grammar, and clarity.</li>
            <li>Monitor your progress on the Deck Progress screen.</li>
            <li>Ensure you have enough tokens before generating or editing slides.</li>
            <li>Check your Notifications tab frequently for updates or balance alerts.</li>
          </ul>
        </motion.div>

        {/* Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-12 text-sm text-gray-400"
        >
          Need more help? Contact our support team at{" "}
          <span className="text-[#FF5A1F] font-medium cursor-pointer hover:underline">
            support@gidipitch.com
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default Help;
