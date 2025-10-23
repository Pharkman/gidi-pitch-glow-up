import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

export default function SlideSelector({ slideData, selectedSlides = [], setFieldValue }) {
  const handleSelect = (slide) => {
    const updatedSlides = selectedSlides.includes(slide)
      ? selectedSlides.filter((item) => item !== slide)
      : [...selectedSlides, slide];
    setFieldValue("slides", updatedSlides);
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
            <h2 className="text-sm font-medium mb-3 text-red-600 border p-3 rounded-md">Note: Add Slides in Order of priority to get an organized slide</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3">
        {slideData?.data?.allowedSlides?.map((slide) => {
          const isSelected = selectedSlides.includes(slide);
          return (
            <div
              key={slide}
              onClick={() => handleSelect(slide)}
              className={`relative cursor-pointer border rounded-lg px-3 py-3 flex items-center justify-center text-center text-sm font-medium capitalize transition-all duration-200
                ${
                  isSelected
                    ? "bg-orange-100 text-orange-700 border-orange-500 shadow-md ring-2 ring-orange-300 scale-105"
                    : "bg-white text-gray-700 border-gray-200 hover:border-orange-400 hover:bg-orange-50 hover:shadow-sm"
                }`}
            >
              {slide}
              {isSelected && (
                <FaCheckCircle className="absolute top-1.5 right-1.5 text-orange-500 text-[14px]" />
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
