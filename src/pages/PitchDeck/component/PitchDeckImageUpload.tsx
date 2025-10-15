"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaUpload } from "react-icons/fa";

const PitchDeckImageUpload = ({ setFieldValue, fieldName = "image" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full"
    >
      <h2 className="flex items-center gap-3 text-xl mt-6 font-semibold mb-5 text-primary">
        <FaUpload className="text-bgprimary text-xl" />
        Upload Pitch Deck Image
      </h2>

      <label
        htmlFor="pitch-deck-image"
        className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-bgprimary/40 rounded-2xl bg-white/5 backdrop-blur-sm text-center cursor-pointer hover:border-bgprimary hover:bg-bgprimary/10 transition-all duration-300"
      >
        <FaUpload className="text-bgprimary text-4xl mb-3 opacity-80" />
        <span className="text-base font-medium text-bgprimary">
          Click to upload or drag & drop
        </span>
        <span className="text-sm text-gray-500 mt-1">
          PNG, JPG, or JPEG (max 5MB)
        </span>
        <input
          id="pitch-deck-image"
          type="file"
          accept="image/*"
          onChange={(e) => setFieldValue(fieldName, e.currentTarget.files[0])}
          className="hidden"
        />
      </label>
    </motion.div>
  );
};

export default PitchDeckImageUpload;
