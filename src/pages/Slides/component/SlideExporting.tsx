import { pitchData } from "@/components/dummy";
import UploadImg from "@/components/UploadImg/UploadImg";
import UploadImgExport from "@/components/UploadImg/UploadImg_export";
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
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Intersection Observer to track visible slide
  useEffect(() => {
    const observerOptions = { root: null, rootMargin: "0px", threshold: 0.5 };
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.dataset.index);
          setActiveSlideIndex(index);
          const slideId = deck?.data?.slides?.[index]?._id;
          if (slideId) localStorage.setItem("activeSlideId", slideId);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    slideRefs.current.forEach((slide) => slide && observer.observe(slide));

    return () => {
      slideRefs.current.forEach((slide) => slide && observer.unobserve(slide));
    };
  }, [deck?.data?.slides]);

  const handleScrollToSlide = (index) => {
    const el = slideRefs.current[index];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const brandKit = deck?.data?.brandKit || {};

  return (
    <main className="flex-1 slide flex flex-col items-center justify-center ">
   
    
      <style>{`
        @page {
          size: 1600px 900px;
          margin: 0;
        }

        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          body, html {
            margin: 0 !important;
            padding: 0 !important;
            width: 1600px !important;
            background: transparent !important;
          }

          section[id^="slide-"] {
            page-break-after: always !important;
            page-break-inside: avoid !important;
            break-after: page !important;
            break-inside: avoid !important;
          }

          section[id^="slide-"]:last-child {
            page-break-after: auto !important;
            break-after: auto !important;
          }

          /* Hide UI elements when printing */
          [role="region"][aria-label*="Notifications"],
          .Toastify,
          nav,
          button,
          input[type="file"] {
            display: none !important;
          }
        }

        /* Screen preview styling (optional visual polish) */
        @media screen {
          body {
            background-color: #1a1a1a;
            margin: 0;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }

          section[id^="slide-"] {
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            margin-bottom: 20px;
          }
        }
      `}</style>

      <AnimatePresence mode="wait">
        {isCompleted && (
          <motion.div
            key="slides"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full"
          >
            {deck?.data?.slides?.map((slide, index) => {
              const slideBackgroundColor = brandKit.background || 'bg-primary';
              const slideBulletColor = brandKit.bullets || 'bg-primary';
              const slidetitleColor = brandKit.title || 'bg-primary';
              const slidenoteColor = brandKit.note || 'bg-primary';

             if (slide.slideType === "team") {
  return (
    <section
      key={index}
      id={`slide-${index}`}
      data-index={index}
      ref={(el) => (slideRefs.current[index] = el)}
      style={{ backgroundColor: slideBackgroundColor }}
      className="flex flex-col min-h-[900px] py-10 px-3  transition-all duration-500"
    >
      {/* Section Header */}
      <div className="space-y-8">
        <h2
          style={{ color: slidetitleColor }}
          className="text-4xl font-extrabold tracking-tight text-white"
        >
          {slide.title}
        </h2>

        {slide.bullets && (
          <ul
            style={{ color: slideBulletColor }}
            className="list-disc list-inside text-white/90 text-[19px] md:text-lg space-y-4 text-left "
          >
            {slide.bullets.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        )}

        {slide.notes && (
          <p
            style={{ color: slidenoteColor }}
            className="italic text-white/80 leading-relaxed text-lg "
          >
            {slide.notes}
          </p>
        )}
      </div>

      {/* Team Grid */}
  <div className="w-full grid grid-cols-2 mt-16 gap-6">
  {slide.images?.map((image, i) => (
    <div
      key={i}
      className="bg-white/5 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/10 hover:border-white/20"
    >
      <div className="relative h-[600px] overflow-hidden">
        <img
          src={image.url}
          alt={image.caption || `Team member ${i + 1}`}
          className="w-full h-full object-cover"
        />

        {/* Caption fixed at bottom inside image */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent py-4 text-center">
          <p className="text-white text-lg font-semibold tracking-wide">
            {image.caption || "Team Member"}
          </p>
        </div>
      </div>
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
  className={`flex flex-col md:flex-row items-center gap-4 justify-center  ${
    index % 2 === 1 ? "md:flex-row-reverse" : ""
  } w-full h-[900px] shadow-lg`}
>
  {/* Image Section */}
  <div className="w-full md:w-[110%] h-full flex items-center  justify-center bg-gray-100">
    <UploadImgExport
      caption={slide.images?.[0]?.caption}
      slideId={slide._id}
      defaultImage={slide.images?.[0]?.url}
      slideType={""}
      onSave={(url) => {
        console.log(`Uploaded image for slide ${index + 1}:`, url);
      }}
    />
  </div>

  {/* Text Section */}
  <div className="w-full  h-full flex flex-col justify-center  md:px-4 py-10 space-y-8">
    <h2
      style={{ color: slidetitleColor }}
      className="text-4xl font-extrabold leading-snug text-white max-sm:text-2xl"
    >
      {slide.title}
    </h2>

    {slide.bullets && (
      <ul
        style={{ color: slideBulletColor }}
        className="list-disc pl-5 space-y-4 text-white text-[19px]"
      >
        {slide.bullets.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
    )}

    <p
      style={{ color: slidenoteColor }}
      className="italic text-white text-[18px] leading-relaxed"
    >
      {slide.notes}
    </p>
  </div>
</section>

              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      
    </main>
  );
};

export default SlideExporting;
