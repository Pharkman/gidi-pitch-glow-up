
import { pitchData } from "@/components/dummy";
import UploadImg from "@/components/UploadImg/UploadImg";
import { TAILWIND_COLOR_MAP } from "@/hooks/useTailwindColorMap";
import { useGetDeckProgress } from "@/lib/query";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
const SlideExporting = () => {
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
    <main className="flex-1 slide  flex flex-col items-center justify-center">
  <AnimatePresence mode="wait">
    {isCompleted && (
      <motion.div
        key="slides"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full "
      >
      {deck?.data?.slides?.map((slide, index) => {
        
const slideBackgroundColor = TAILWIND_COLOR_MAP[brandKit.background] || 'bg-primary';
        
if (slide.slideType === "team") {
  return (
    <section
      key={index}
      id={`slide-${index}`}
      data-index={index}
      ref={(el) => (slideRefs.current[index] = el)}
     style={{ backgroundColor: slideBackgroundColor }}
      className={`flex flex-col items-center  border border-gray-200 
      transition-all duration-500 py-12 px-6`}
    >
      {/* TOP CONTENT */}
      <div className="w-full  space-y-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white">
          {slide.title}
        </h2>

        {slide.bullets && (
          <ul className="list-disc list-inside text-white text-[15px] space-y-2 w-fit text-left">
            {slide.bullets.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        )}

        {slide.notes && (
          <p className="italic text-white leading-relaxed text-[15px]  mx-auto">
            {slide.notes}
          </p>
        )}
      </div>

      {/* TEAM MEMBERS GRID */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {slide.images?.map((image, i) => (
          <div
            key={i}
            className="bg-white  shadow-md flex flex-col items-center pb-2  text-center  transition-all duration-300"
          >
            <UploadImg
              caption={image.caption}
              slideId={slide._id}
              slideType={slide.slideType}
              defaultImage={image.url}
              onSave={(url) => {
                console.log(
                  `Uploaded team image ${i + 1} for slide ${index + 1}:`,
                  url
                );
              }}
            />
            <p className="text-gray-800 font-semibold mt-3 text-[14px]">
              {image.caption || "Team Member"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}


  return (
    <section
      key={index}
      id={`slide-${index}`}
      data-index={index}
      ref={(el) => (slideRefs.current[index] = el)}
        style={{ backgroundColor: slideBackgroundColor }}
      className={`flex flex-col ${
        index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
      } items-center m-0 p-0  shadow-lg border border-gray-200 transition-all duration-500 `}
    >
      <div className="w-full md:w-[78%] space-y-7 px-8 max-sm:px-4 max-sm:py-4">
        <h2 className="text-3xl font-extrabold text-white max-sm:text-xl leading-[150%]">
          {slide.title}
        </h2>
        {slide.bullets && (
          <ul className="list-disc pl-5 space-y-2 text-white text-[17px]">
            {slide.bullets.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        )}
        <p className="italic text-white leading-relaxed text-[16px]">
          {slide.notes}
        </p>
      </div>

      <div className="w-full md:w-[80%] flex flex-col items-center justify-center ">
         <UploadImg
                caption={slide.images?.[0]?.caption}
                slideId={slide._id}
                defaultImage={slide.images?.[0]?.url}
                slideType={''}
                onSave={(url) => {
                  console.log(`Uploaded image for slide ${index + 1}:`, url);
                }}
              />
      </div>
    </section>
  );
})}


        
      </motion.div>
    )}
  </AnimatePresence>

</main>

  )
}

export default SlideExporting