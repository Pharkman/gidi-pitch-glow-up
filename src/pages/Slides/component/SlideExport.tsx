import React, { useRef, useState, useEffect } from "react";
import { pitchData } from "@/components/dummy";
import { useGetDeckProgress } from "@/lib/query";
import { motion, AnimatePresence } from "framer-motion";
import UploadImg from "@/components/UploadImg/UploadImg";
import EditWithAIButton from "@/components/EditAiButton/EditAiButton";
import { useParams } from "react-router-dom";



const SlideExport = () => {
    const [showInput, setShowInput] = useState(false);
  const { deckId } = useParams();
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

   const brandKit = deck?.data?.brandKit || {};

   console.log(brandKit.background);
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800 font-[Geist]">
   

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">

<main className="flex-1 slide overflow-y-auto max-sm:px-3 space-y-16 flex flex-col items-center justify-center">
  <AnimatePresence mode="wait">
    {isCompleted && (
      <motion.div
        key="slides"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="space-y-10 w-full  mx-auto"
      >
        {deck?.data?.slides?.map((slide, index) => (
          <section
            key={index}
            id={`slide-${index}`}
            data-index={index}
            ref={(el) => (slideRefs.current[index] = el)}
            className={`flex flex-col ${
              index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
            } items-center bg-primary  shadow-lg border border-gray-200 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl mb-5`}
          >
            <div className="w-full md:w-[80%] space\-y-7 px-8 ">
              <h2 className={`text-2xl font-extrabold text-[#fff] max-sm:text-xl`}>
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

</main>


      </div>
    </div>
  );
};

export default SlideExport;
