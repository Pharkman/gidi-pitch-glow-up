import React from "react";

const ProgressDots = ({ activeIndex = 0, total = 3 }) => {
  return (
    <div className="flex items-center justify-center gap-3 mb-5">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`w-12 h-2 rounded-full transition-all duration-300 ${
            index === activeIndex
              ? "bg-orange-500 shadow-inner"
              : "bg-gray-200"
          }`}
        ></div>
      ))}
    </div>
  );
};

export default ProgressDots;
