import { useState } from "react";
import { Home } from "lucide-react";

export default function SlideSidebar({ slides = [], onSlideSelect }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    onSlideSelect(index);
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col max-sm:hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
        <Home className="text-gray-700" size={18} />
        <h1 className="text-[15px] font-medium text-gray-800">Social Startup</h1>
      </div>

      {/* Slides list */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 px-5 scrollbar-hide">
        {slides.map((slide, i) => (
          <div
            key={i}
            onClick={() => handleClick(i)}
            className={`group relative cursor-pointer transition-all duration-300 rounded-xl overflow-hidden ${
              activeIndex === i
                ? "ring-2 ring-[#FF5619] shadow-lg"
                : "hover:ring-1 hover:ring-gray-300"
            }`}
          >
            {/* Mini slide preview */}
            <div className="bg-gray-50 rounded-xl flex flex-col p-3 gap-2 h-36 overflow-hidden">
              {/* Image thumbnail */}
              {slide.image ? (
                <div className="w-full h-20 rounded-lg overflow-hidden">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div className="w-full h-20 rounded-lg bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                  No Image
                </div>
              )}

              {/* Text content */}
              <div className="flex-1 flex flex-col justify-between">
                <h3 className="text-[12px] font-semibold text-gray-800 truncate">
                  {slide.title || `Slide ${i + 1}`}
                </h3>
                {slide.bullets && slide.bullets.length > 0 && (
                  <ul className="text-[10px] text-gray-600 list-disc pl-3 leading-tight line-clamp-2 mt-1">
                    {slide.bullets.slice(0, 2).map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
