import React, { useRef } from "react";
import { pitchData } from "@/components/dummy";
import { useGetDeckProgress } from "@/lib/query";
import { motion, AnimatePresence } from "framer-motion";
import SlideSidebar from "./component/SlideSidebar";
import Toolbar from "./component/ToolBar";
import UploadImg from "@/components/UploadImg/UploadImg";

const PitchSlide = () => {
  const deckId = localStorage.getItem("deckId");
  const { data: deck, isFetching: isProgressLoading } = useGetDeckProgress(deckId || "");

  const progress = deck?.data?.progress ?? 0;
  const status = deck?.data?.status ?? "loading";
  const totalSlides = deck?.data?.totalSlides ?? pitchData.length;
  const isCompleted = progress >= 100 || status === "completed";

  const slideRefs = useRef([]);

  const handleScrollToSlide = (index: number) => {
    const el = slideRefs.current[index];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800 font-[Geist]">
      {/* Sidebar */}
      <aside className="w-64 fixed left-0 top-0 h-screen bg-white shadow-md border-r border-gray-200 z-20 max-sm:hidden ">
        <SlideSidebar
          slides={deck?.data?.slides || []}
          onSlideSelect={handleScrollToSlide}
        />
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen max-sm:ml-0">
        {/* Toolbar */}
        <header className="fixed top-0 left-64 max-sm:left-0 right-0 z-10 bg-white shadow-sm border-b border-gray-200">
          <Toolbar />
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto pt-20 pb-10 px-5 max-sm:px-3 space-y-16 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {isCompleted && (
              <motion.div
                key="slides"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-10 w-full max-w-6xl mx-auto"
              >
                {deck?.data?.slides?.map((slide, index) => (
                  <section
                    key={index}
                    id={`slide-${index}`}
                    ref={(el) => (slideRefs.current[index] = el)}
                    className={`flex flex-col ${
                      index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
                    } items-center gap-10 bg-white rounded-2xl shadow-lg border border-gray-200 p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl mb-5`}
                  >
                    <div className="w-full md:w-[80%] space-y-5">
                      <h2 className="text-2xl font-bold text-[#FF5619] max-sm:text-xl">{slide.title}</h2>
                      {slide.bullets && (
                        <ul className="list-disc pl-5 space-y-2 text-gray-700 text-[15px]">
                          {slide.bullets.map((point, i) => (
                            <li key={i}>{point}</li>
                          ))}
                        </ul>
                      )}
                      <p className="italic text-gray-600 leading-relaxed text-[14px]">
                        {slide.notes}
                      </p>
                    </div>
                    <div className="w-full md:w-[65%] flex flex-col items-center justify-center gap-3">
                      <UploadImg
  defaultImage={slide.image}
  onSave={(url) => {
    console.log(`Uploaded image for slide ${index + 1}:`, url);
  }}
  caption={slide.caption}
/>



    {/* Upload Button */}
    {/* <label className="bg-[#FF5619] hover:bg-orange-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg shadow cursor-pointer transition-all duration-300">
      Upload Image
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const imageUrl = URL.createObjectURL(file);
            // Save uploaded image to localStorage or backend if needed
            console.log(`Slide ${index + 1} image:`, imageUrl);
          }
        }}
      />
    </label> */}

    {/* <p className="text-xs text-center text-gray-500 mt-1">{slide.slideType}</p> */}
  </div>
                  </section>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default PitchSlide;
