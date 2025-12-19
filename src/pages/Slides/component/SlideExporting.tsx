
import { pitchData } from "@/components/dummy";
import UploadImg from "@/components/UploadImg/UploadImg";
import UploadImgExport from "@/components/UploadImg/UploadImg_export";
import { TAILWIND_COLOR_MAP } from "@/hooks/useTailwindColorMap";
import { useGetDeckProgress } from "@/lib/query";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import IconTemplateSlide from "./IconTemplateComponent/IconTemplateSlide";
import IconTemplateSlideExport from "./IconTemplateComponent/IconTemplateSlideExport";
import TeamSlide from "./TeamSlide";
import TeamSlideExport from "./TeamSlideExport";

const SlideExporting = (startupName: string) => {
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

 
  const brandKit = deck?.data?.brandKit || {};

  return (
    <main className="flex-1 slide flex flex-col items-center justify-center ">
   
    
      <style>{`
       
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
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

              
if (slide.slideType === "solution") {
  return (
    <section
      key={index}
      id={`slide-${index}`}
      data-index={index}
      ref={(el) => (slideRefs.current[index] = el)}
      className="w-full flex justify-center"
    >
      <IconTemplateSlideExport
        slide={slide}
        brandKit={brandKit}
        startupName={slide.startupName}
      />
    </section>
  );
}

if(slide.slideType === "problem") {
  return (
    <section
      key={index}
      id={`slide-${index}`}
      data-index={index}
      ref={(el) => (slideRefs.current[index] = el)}
      className="w-full flex justify-center"
    >
      <IconTemplateSlideExport
        slide={slide}
        brandKit={brandKit}
        startupName={slide.startupName}
      />
    </section>
  )
}
if(slide.slideType === "businessModel") {
  return (
    <section
      key={index}
      id={`slide-${index}`}
      data-index={index}
      ref={(el) => (slideRefs.current[index] = el)}
      className="w-full flex justify-center"
    >
      <IconTemplateSlideExport
        slide={slide}
        brandKit={brandKit}
        startupName={slide.startupName}
      />
    </section>
  )
}
if(slide.slideType === "goMarket") {
  return (
  <section
      key={index}
      id={`slide-${index}`}
      data-index={index}
      ref={(el) => (slideRefs.current[index] = el)}
      className="w-full flex justify-center"
    >
      <IconTemplateSlideExport
        slide={slide}
        brandKit={brandKit}
        startupName={slide.startupName}
      />
    </section>
  )
}
if(slide.slideType === "market") {
  return (
  <section
      key={index}
      id={`slide-${index}`}
      data-index={index}
      ref={(el) => (slideRefs.current[index] = el)}
      className="w-full flex justify-center"
    >
      <IconTemplateSlideExport
        slide={slide}
        brandKit={brandKit}
        startupName={slide.startupName}
      />
    </section>
  )
}

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
      {slide.startupName && (
          <p
            className="text-xs uppercase tracking-[0.25em] p-5"
            style={{ color: slideBulletColor}}
          >
            {slide.startupName}
            
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

    if(slide.slideType === "team") {
    return(
        <section
      key={index}
      id={`slide-${index}`}
      data-index={index}
      ref={(el) => (slideRefs.current[index] = el)}
      className="w-full flex justify-center"
    >
      <TeamSlideExport key={index}   slide={slide}
        brandKit={brandKit}  startupName={slide.startupName} />
        </section>
    ) 
  }
  



              return (
                <section
  key={index}
  id={`slide-${index}`}
  data-index={index}
  ref={(el) => (slideRefs.current[index] = el)}
  style={{ backgroundColor: slideBackgroundColor }}
  className={`flex flex-col md:flex-row items-center  justify-center  ${
    index % 2 === 1 ? "md:flex-row-reverse " : ""
  } w-full h-[900px] shadow-lg`}
>
  {/* Image Section */}
  <div className="w-full md:w-[110%] h-full flex items-center  justify-center">
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
  <div className="w-full  h-full flex flex-col justify-center py-10 px-14  space-y-10">
    <h2
      style={{ color: slidetitleColor }}
       className={
  slide.slideType === "cover"
    ? "text-5xl font-extrabold text-white max-sm:text-xl leading-[150%]"
    : "text-4xl font-extrabold text-white max-sm:text-xl leading-[150%]"
}
    >
             {slide.slideType === "cover" ? `Introducing ${slide.title}` : slide.title }

    </h2>

    {slide.bullets && (
      <ul
        style={{ color: slideBulletColor }}
        className="list-disc pl-5 space-y-5 text-white text-[20px]"
      >
        {slide.bullets.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
    )}

    <p
      style={{ color: slidenoteColor }}
      className="italic text-white text-[19px] leading-relaxed"
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
