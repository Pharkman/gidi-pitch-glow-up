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
            className={`group relative cursor-pointer transition-all duration-300 rounded-xl ${
              activeIndex === i ? "ring-2 ring-[#FF5619]" : "hover:ring-1 hover:ring-gray-300"
            }`}
          >
            <div className="w-full h-32 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
              {slide.image ? (
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-gray-400 text-sm font-medium">{i + 1}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
