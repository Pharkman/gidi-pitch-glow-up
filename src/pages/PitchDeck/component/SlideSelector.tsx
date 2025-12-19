import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { useEffect } from "react";

export default function SlideSelector({
  slideData,
  selectedSlides = [],
  setFieldValue,
}) {
  // Slides that should be auto-selected on load only (NOT locked)
  const AUTO_SELECTED = [
    "cover",
    "problem",
    "solution",
    "businessModel",
    "team",
    "goMarket",
    "competitions",
    "market",
    "thankYou",
  ];

  // Auto-select these slides only on first mount
  useEffect(() => {
    const missing = AUTO_SELECTED.filter((s) => !selectedSlides.includes(s));

    if (missing.length > 0) {
      setFieldValue("slides", [...selectedSlides, ...missing]);
    }
  }, []); // runs once on mount only

  const handleSelect = (slide) => {
    let updated;

    if (selectedSlides.includes(slide)) {
      // unselect
      updated = selectedSlides.filter((s) => s !== slide);
    } else {
      // select
      updated = [...selectedSlides, slide];
    }

    setFieldValue("slides", updated);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-sm font-medium mb-3 text-gray-800">
        Select Slides ({selectedSlides.length})
      </h2>

      <h2 className="text-sm font-medium mb-3 text-red-600 border p-3 rounded-md">
        Note: The Most Relavant Slide for your deck has been highlighted.<br />
       <p className="mt-1"> Note: Add slides in priority order to get an organized result</p>
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-5">
        {slideData?.data?.allowedSlides?.map((slide) => {
          const isSelected = selectedSlides.includes(slide);

          return (
            <div
              key={slide}
              onClick={() => handleSelect(slide)}
              className={`relative cursor-pointer border rounded-lg px-3 py-3 flex items-center justify-center text-center text-sm font-medium capitalize transition-all duration-200
                ${
                  isSelected
                    ? "bg-gray-100 text-primary border-primary shadow-md ring-1 ring-primary scale-105"
                    : "bg-white text-gray-700 border-gray-200 hover:border-primary hover:bg-primary/50 hover:shadow-sm"
                }
              `}
            >
              {slide}

              {isSelected && (
                <FaCheckCircle className="absolute top-1.5 right-1.5 text-primary text-[14px]" />
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
