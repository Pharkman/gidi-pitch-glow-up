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
import { TAILWIND_COLOR_MAP } from "@/hooks/useTailwindColorMap";
import IconTemplateSlide from "./component/IconTemplateComponent/IconTemplateSlide";
import TeamSlide from "./component/TeamSlide";

const PitchSlide = () => {
  const [showInput, setShowInput] = useState(false);
  const deckId = localStorage.getItem("deckId");
  const { data: deck, isFetching: isProgressLoading } =
    useGetDeckProgress(deckId || "");

  const progress = deck?.data?.progress ?? 0;
  const status = deck?.data?.status ?? "loading";
  const totalSlides = deck?.data?.totalSlides ?? pitchData.length;
  const isCompleted = progress >= 100 || status === "completed";

  const slideRefs = useRef([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
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

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    slideRefs.current.forEach((slide) => {
      if (slide) observer.observe(slide);
    });

    return () => {
      slideRefs.current.forEach((slide) => {
        if (slide) observer.unobserve(slide);
      });
    };
  }, [deck?.data?.slides]);

  const handleScrollToSlide = (index) => {
    const el = slideRefs.current[index];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const brandKit = deck?.data?.brandKit || {};
  const startupName = deck?.data?.startupName || "";

  const NON_ICON_TEMPLATE_SLIDES = [
    "competition",
    "cover",
    "thankYou",
    "team",
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800 font-[Geist]">
      {/* Sidebar */}
      <aside className="w-64 fixed left-0 top-0 h-screen bg-white shadow-md border-r border-gray-200 z-20 max-sm:hidden">
        <SlideSidebar
          slides={deck?.data?.slides || []}
          onSlideSelect={handleScrollToSlide}
          activeIndex={activeSlideIndex}
          brandKit={deck?.data?.brandKit}
        />
      </aside>

      {/* Main Content */}
      <div className="flex-1 bg-[#12110D] ml-64 flex flex-col min-h-screen max-sm:ml-0">
        {/* Toolbar */}
        <header className="fixed top-0 left-64 max-sm:left-0 right-0 z-10 bg-white shadow-sm border-b border-gray-200">
          <Toolbar />
        </header>

        <main className="flex-1 overflow-y-auto pb-20 max-sm:px-0 max-sm:pt-[65px] space-y-8 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {isCompleted && (
              <motion.div
                key="slides"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-6xl mx-auto"
              >
                {deck?.data?.slides?.map((slide, index) => {
                  const slideBackgroundColor =
                    brandKit?.background || "bg-primary";
                  const slideBulletColor =
                    brandKit?.bullets || "bg-primary";
                  const slidetitleColor =
                    brandKit?.title || "bg-primary";
                  const slidenoteColor =
                    brandKit?.note || "bg-primary";

                  /** TEAM SLIDE */
                  if (slide.slideType === "team") {
                    return (
                      <section
                        key={index}
                        id={`slide-${index}`}
                        data-index={index}
                        ref={(el) => (slideRefs.current[index] = el)}
                        className="w-full flex justify-center"
                      >
                        <TeamSlide
                          slide={slide}
                          brandKit={brandKit}
                          startupName={startupName}
                        />
                      </section>
                    );
                  }

                 /** THANK YOU SLIDE */
if (slide.slideType === "thankYou") {
  return (
    <section
      key={index}
      id={`slide-${index}`}
      data-index={index}
      ref={(el) => (slideRefs.current[index] = el)}
      className="w-full min-h-[80vh]"
      style={{
        backgroundColor: brandKit?.background || "#0F172A",
      }}
    >
      {startupName && (
          <p
            className="text-xs uppercase tracking-[0.25em] p-5"
            style={{ color: slideBulletColor}}
          >
            {startupName}
          </p>
        )}
        
     <div className="flex flex-col items-center justify-center text-center px-6 space-y-8 min-h-[70vh]">
  <h1
    className="text-[120px] max-sm:text-3xl font-bold tracking-tight"
    style={{ color: brandKit?.title || "#FFFFFF" }}
  >
    Thank You
  </h1>
</div>

    </section>
  );
}


                  /** ICON TEMPLATE SLIDES */
                  if (
                    !NON_ICON_TEMPLATE_SLIDES.includes(
                      slide.slideType
                    )
                  ) {
                    return (
                      <section
                        key={index}
                        id={`slide-${index}`}
                        data-index={index}
                        ref={(el) => (slideRefs.current[index] = el)}
                        className="w-full flex justify-center"
                      >
                        <IconTemplateSlide
                          slide={slide}
                          brandKit={brandKit}
                          startupName={startupName}
                        />
                      </section>
                    );
                  }

                  /** DEFAULT / CUSTOM SLIDES */
                  return (
                    <section
                      key={index}
                      id={`slide-${index}`}
                      data-index={index}
                      ref={(el) => (slideRefs.current[index] = el)}
                      style={{ backgroundColor: slideBackgroundColor }}
                      className={`flex flex-col ${
                        index % 2 === 1
                          ? "md:flex-row-reverse"
                          : "md:flex-row"
                      } items-center shadow-lg border border-gray-200 max-sm:pt-4`}
                    >
                      <div className="w-full md:w-[80%] space-y-7 px-8 max-sm:px-4 max-sm:mb-4">
                        <h2
                          style={{ color: slidetitleColor }}
                          className={
                            slide.slideType === "cover"
                              ? "text-4xl font-extrabold text-white max-sm:text-xl leading-[150%]"
                              : "text-2xl font-extrabold text-white max-sm:text-xl leading-[150%]"
                          }
                        >
                          {slide.title}
                        </h2>

                        {slide.bullets && (
                          <ul
                            style={{ color: slideBulletColor }}
                            className="list-disc pl-5 space-y-4 text-white text-[15px]"
                          >
                            {slide.bullets.map((point, i) => (
                              <li key={i}>{point}</li>
                            ))}
                          </ul>
                        )}

                        <p
                          style={{ color: slidenoteColor }}
                          className="italic text-white leading-relaxed text-[14px]"
                        >
                          {slide.notes}
                        </p>
                      </div>

                      <div className="w-full md:w-[80%] flex flex-col items-center justify-center">
                        <UploadImg
                          caption={slide.images?.[0]?.caption}
                          slideId={slide._id}
                          defaultImage={slide.images?.[0]?.url}
                          slideType=""
                          onSave={(url) => {
                            console.log(
                              `Uploaded image for slide ${
                                index + 1
                              }:`,
                              url
                            );
                          }}
                        />
                      </div>
                    </section>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom sticky edit button */}
          <div
            className="fixed shadow-xl border-t bottom-0 left-64 max-sm:left-0 w-[calc(100%-16rem)] max-sm:w-full bg-white z-30 px-5 flex justify-end"
            onClick={() => setShowInput(true)}
          >
            <EditWithAIButton />
          </div>

          {/* Slide correction container */}
          <SlideCorrectionContainer />
        </main>
      </div>
    </div>
  );
};

export default PitchSlide;
