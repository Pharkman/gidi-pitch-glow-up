import React, { useRef, useState, useEffect } from "react";
import { pitchData } from "@/components/dummy";
import { useGetDeckProgress } from "@/lib/query";
import { motion, AnimatePresence } from "framer-motion";
import SlideSidebar from "./component/SlideSidebar";
import Toolbar from "./component/ToolBar";
import UploadImg from "@/components/UploadImg/UploadImg";
import EditWithAIButton from "@/components/EditAiButton/EditAiButton";
import MessageInputBox from "@/components/MessageInput/MessageInput";
import SlideCorrectionContainer from "./component/SlideCorrectionContainer";

const PitchSlide = () => {
    const [showInput, setShowInput] = useState(false);
  const deckId = localStorage.getItem("deckId");
  const { data: deck, isFetching: isProgressLoading } = useGetDeckProgress(deckId || "");

  const progress = deck?.data?.progress ?? 0;
  const status = deck?.data?.status ?? "loading";
  const totalSlides = deck?.data?.totalSlides ?? pitchData.length;
  const isCompleted = progress >= 100 || status === "completed";

  const slideRefs = useRef([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0); // For syncing sidebar

  // Intersection Observer to detect the currently visible slide
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // At least 50% of slide is visible
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.dataset.index);
          setActiveSlideIndex(index);
          const slideId = deck?.data?.slides?.[index]?._id;
          if (slideId) {
            localStorage.setItem("activeSlideId", slideId);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    slideRefs.current.forEach((slide) => {
      if (slide) observer.observe(slide);
    });

    return () => {
      slideRefs.current.forEach((slide) => {
        if (slide) observer.unobserve(slide);
      });
    };
  }, [deck?.data?.slides]);

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
          activeIndex={activeSlideIndex} // Pass active slide index for highlight
        />
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen max-sm:ml-0">
        {/* Toolbar */}
        <header className="fixed top-0 left-64 max-sm:left-0 right-0 z-10 bg-white shadow-sm border-b border-gray-200">
          <Toolbar />
        </header>

        {/* Scrollable content */}
     {/* Scrollable content */}
{/* Scrollable content */}
<main className="flex-1 overflow-y-auto pt-20 pb-20 px-5 max-sm:px-3 space-y-16 flex flex-col items-center justify-center">
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
            data-index={index}
            ref={(el) => (slideRefs.current[index] = el)}
            className={`flex flex-col ${
              index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
            } items-center  bg-primary shadow-lg border border-gray-200 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl mb-5`}
          >
            <div className="w-full md:w-[80%] space-y-7 px-8 ">
              <h2 className="text-2xl font-extrabold text-[#fff] max-sm:text-xl">
                {slide.title}
              </h2>
              {slide.bullets && (
                <ul className="list-disc pl-5 space-y-2 text-white text-[15px]">
                  {slide.bullets.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              )}
              <p className="italic text-white leading-relaxed text-[14px]">
                {slide.notes}
              </p>
            </div>
            <div className="w-full md:w-[80%] flex flex-col items-center justify-center gap-3">
              <UploadImg
                caption={slide.images?.[0]?.caption}
                slideId={slide._id}
                defaultImage={slide.images?.[0]?.url}
                onSave={(url) => {
                  console.log(`Uploaded image for slide ${index + 1}:`, url);
                }}
              />
            </div>
          </section>
        ))}
      </motion.div>
    )}
  </AnimatePresence>

  {/* Bottom sticky edit button */}
  <div className="fixed shadow-xl border-t  bottom-0 left-64 max-sm:left-0 w-[calc(100%-16rem)] max-sm:w-full bg-white z-30 shadow-t  px-5 flex justify-end" onClick={() => setShowInput(true)} >
    <EditWithAIButton />
  </div>

 {/* Bottom sticky edit button or input */}
<SlideCorrectionContainer />

</main>


      </div>
    </div>
  );
};

export default PitchSlide;
