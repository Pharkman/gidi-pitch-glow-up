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
      <h2 className="text-xl font-semibold mb-3 text-bgprimary">
        Select Slides ({selectedSlides.length})
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {slideData?.data?.allowedSlides?.map((slide) => {
          const isSelected = selectedSlides.includes(slide);
          return (
            <div
              key={slide}
              onClick={() => handleSelect(slide)}
              className={`relative cursor-pointer border rounded-xl p-4 flex items-center justify-center text-center text-sm font-medium capitalize transition-all duration-200
                ${
                  isSelected
                    ? "bg-bgprimary text-white border-bgprimary shadow-md scale-105"
                    : "bg-white text-[#0b1525] border-bgprimary/40 hover:border-bgprimary/60"
                }`}
            >
              {slide}
              {isSelected && (
                <FaCheckCircle className="absolute top-2 right-2 text-white" />
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
