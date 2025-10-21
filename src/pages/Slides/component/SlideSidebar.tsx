import { Home } from "lucide-react";

export default function SlideSidebar({ slides = [], onSlideSelect, activeIndex }) {
  const handleClick = (index) => {
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
            className={`group relative cursor-pointer transition-all duration-300 overflow-hidden ${
              activeIndex === i
                ? "ring-2 ring-[#FF5619] shadow-lg border border-1"
                : "hover:ring-1 hover:ring-gray-300"
            }`}
          >
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

              <div className="flex-1 flex flex-col justify-center h-full overflow-hidden pr-2 bg-primary text-center px-2 py-2 shadow-sm">
                <h3 className="text-sm font-semibold text-white truncate">
                  {slide.title || `Slide ${i + 1}`}{" "}
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
