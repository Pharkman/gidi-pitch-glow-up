import { TAILWIND_COLOR_MAP } from "@/hooks/useTailwindColorMap";
import { Home, CheckCircle } from "lucide-react"; // 👈 Import CheckCircle
import GidiLogo from '../../../../public/assets/Gidipitch Logo.svg'
import { useNavigate } from "react-router-dom";

// Helper function to get the hex color from a Tailwind class
const getHexColor = (tailwindClass) => {
  return tailwindClass || '#6366f1';
};

export default function SlideSidebar({ slides = [], onSlideSelect, activeIndex, brandKit }) {
  const navigate = useNavigate();
  const handleClick = (index) => {
    onSlideSelect(index);
  };

  const activeSlideBgClass = brandKit?.background || "bg-primary";
  const activeSlidetitleClass = brandKit?.title || "bg-primary";
  const activeSlideBgHex = getHexColor(activeSlideBgClass);
  const activeSlidetitleHex = getHexColor(activeSlidetitleClass);
  const activeRingHex = getHexColor(activeSlideBgClass);

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col max-sm:hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
        {/* <Home className="text-gray-700" size={18} /> */}
        {/* <h1 className="text-[15px] font-medium text-gray-800">Social Startup</h1> */}
        <img src={GidiLogo} alt="GidiPitch Logo" className="w-[100px] h-[30px]" onClick={() => navigate('/dashboard')}/>
      </div>

      {/* Slides list */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 px-5 scrollbar-hide">
        {slides.map((slide, i) => (
          <div
            key={i}
            onClick={() => handleClick(i)}
            // Ensure 'relative' is part of the className which it already is
            className={`group relative cursor-pointer transition-all duration-300 overflow-hidden ${
              activeIndex === i
                // Removed the hardcoded ring color here since we use inline style for ring/shadow
                ? "ring-2 shadow-lg border border-1" 
                : "hover:ring-1 hover:ring-gray-300"
            }`}

            style={
              activeIndex === i
                ? { borderColor: activeRingHex, boxShadow: `0 0 0 2px ${activeRingHex}` }
                : {}
            }
          >
            {/* 👇 CHECK MARK ICON ADDED HERE 👇 */}
            {activeIndex === i && (
              <div 
                className="absolute top-[-8px] right-[-8px] z-10 rounded-full bg-white p-[2px]"
                style={{ color: activeRingHex, boxShadow: `0 0 0 2px ${activeRingHex}` }} // Border/shadow for the white circle
              >
                <CheckCircle size={20} fill={activeRingHex} stroke="white" />
              </div>
            )}

            <div className="bg-gray-50 flex flex-row items-center h-36 overflow-hidden">
              <div className="w-[50%] h-full overflow-hidden flex-shrink-0">
                {slide.images?.[0]?.url ? (
                  <img
                    src={slide.images?.[0]?.url}
                    alt={slide.title || ""}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                    No Image
                  </div>
                )}
              </div>

              {/* Apply dynamic color using inline style */}
              <div
                className={`flex-1 flex flex-col justify-center h-full overflow-hidden pr-2 text-center px-2 py-2 shadow-sm`}
                style={
                  activeIndex === i
                    ? { backgroundColor: activeSlideBgHex }
                    : { backgroundColor: getHexColor(slide.background || activeSlideBgClass) }
                }
              >
                <h3 className="text-sm font-semibold text-white truncate">
              <p 
                       style={{ color: activeSlidetitleHex  }}
              >    {slide.title || `Slide ${i + 1}`}</p>
                  {slide.bullets && slide.bullets.length > 0 && (
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