import { useEffect, useRef } from "react";
import { CheckCircle } from "lucide-react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import DeckLogo from "../../../../public/assets/DecloLogo.png";

export default function SlideSidebar({ slides = [], onSlideSelect, activeIndex, brandKit }) {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const activeItemRefs = useRef([]);

  const getHexColor = (tailwindClass) => tailwindClass || "#6366f1";

  const activeSlideBgClass = brandKit?.background || "bg-primary";
  const activeSlidetitleClass = brandKit?.title || "bg-primary";
  const activeSlideBgHex = getHexColor(activeSlideBgClass);
  const activeSlidetitleHex = getHexColor(activeSlidetitleClass);
  const activeRingHex = getHexColor(activeSlideBgClass);

  // 🔥 Automatically scroll sidebar to keep active slide visible
  useEffect(() => {
    const activeEl = activeItemRefs.current[activeIndex];
    const container = scrollContainerRef.current;
    if (activeEl && container) {
      const elTop = activeEl.offsetTop;
      const elHeight = activeEl.offsetHeight;
      const containerHeight = container.offsetHeight;
      const scrollTop = container.scrollTop;

      // Only scroll if element is not fully visible
      if (elTop < scrollTop || elTop + elHeight > scrollTop + containerHeight) {
        container.scrollTo({
          top: elTop - containerHeight / 2 + elHeight / 2,
          behavior: "smooth",
        });
      }
    }
  }, [activeIndex]);

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col max-sm:hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center justify-center p-2 rounded-full hover:bg-gray-200 bg-gray-100 transition-colors duration-200 border-2 border-primary"
        >
          <FiArrowLeft size={18} className="text-primary animate-[slideBack_1.2s_linear_infinite animate-fade-in-up" />
        </button>

        <img
          src={DeckLogo}
          alt="GidiPitch Logo"
          className=" cursor-pointer h-[22px] mt-1"
          onClick={() => navigate("/dashboard")}
        />
      </div>

      {/* Slides list */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto py-4 space-y-4 px-5 scrollbar-hide"
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            ref={(el) => (activeItemRefs.current[i] = el)}
            onClick={() => onSlideSelect(i)}
            className={`group relative cursor-pointer transition-all duration-300 overflow-hidden ${
              activeIndex === i
                ? "ring-2 shadow-lg border border-1"
                : "hover:ring-1 hover:ring-gray-300"
            }`}
            style={
              activeIndex === i
                ? { borderColor: activeRingHex, boxShadow: `0 0 0 2px ${activeRingHex}` }
                : {}
            }
          >
            {activeIndex === i && (
              <div
                className="absolute top-[-8px] right-[-8px] z-10 rounded-full bg-white p-[2px]"
                style={{ color: activeRingHex, boxShadow: `0 0 0 2px ${activeRingHex}` }}
              >
                <CheckCircle size={20} fill={activeRingHex} stroke="white" />
              </div>
            )}

            <div className="bg-gray-50 flex flex-row items-center h-36 overflow-hidden">
              <div className="w-[50%] h-full overflow-hidden flex-shrink-0">
                {slide.images?.[0]?.url ? (
                  <img
                    src={slide.images[0].url}
                    alt={slide.title || ""}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                    No Image
                  </div>
                )}
              </div>

              <div
                className="flex-1 flex flex-col justify-center h-full overflow-hidden pr-2 text-center px-2 py-2 shadow-sm"
                style={
                  activeIndex === i
                    ? { backgroundColor: activeSlideBgHex }
                    : { backgroundColor: getHexColor(slide.background || activeSlideBgClass) }
                }
              >
                <h3 className="text-sm font-semibold text-white truncate">
                  <p style={{ color: activeSlidetitleHex }}>
                    {slide.title || `Slide ${i + 1}`}
                  </p>
                  {slide.bullets?.length > 0 && (
                    <span className="text-xs text-white font-normal ml-1 mt-1 line-clamp-2 truncate">
                      {slide.bullets[0]}
                    </span>
                  )}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
