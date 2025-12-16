export default function IconTemplateSlideExport({
  slide,
  brandKit,
  startupName,
}: {
  slide: Slide;
  brandKit: BrandKit;
  startupName: string;
}) {
  const slideBackgroundColor = brandKit?.iconSlide?.background || "#F2F4FF";
  const slideBulletColor = brandKit?.iconSlide?.bullets || "#5063FF";
  const slideTitleColor = brandKit?.iconSlide?.title || "#ffffff";
  const slideNoteColor = brandKit?.iconSlide?.note || "#D9DBFF";



  return (
    <div
      className="w-full h-[900px]  px-5 py-10 flex flex-col border border-gray-400"
      style={{ backgroundColor: slideBackgroundColor }}
    >
      {/* Header */}
      <div className="flex justify-between items-start w-full opacity-80">
        <p className="text-md tracking-wide font-medium text-white" 
          style={{ color: slideNoteColor }}
        >{startupName}</p>
      </div>

      
      <h1
        className="text-[34px]  max-sm:text-xl font-bold  mb-8 uppercase leading-[120px]"
        style={{ color: slideTitleColor }}
      >
        {slide.title}
      </h1>

      <div>
        <p className="text-[32px]  font-bold leading-[100%] uppercase text-[#5063FF]">
          {slide.note}
        </p>
      </div>
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {slide.images?.slice(0, 3).map((img: any, index: number) => (
    <div
      key={index}
      className="flex flex-col justify-start items-start h-full pr-3 border-r border-gray-300"
    >
      {/* Image */}
      <div className="w-full mb-12">
        <img
          src={img.url}
          alt={`solution-image-${index}`}
          className="w-[400px] h-[400px]"
        />
      </div>

      {/* Bullet title */}
      <h2
        className="text-4xl mb-3 font-bold uppercase text-[#5063FF]"
        style={{ color: slideNoteColor }}
      >
        {img.caption || "Key Highlight"}
      </h2>

      <p
        className="font-medium text-[#5063FF] text-[20px]"
        style={{ color: slideBulletColor }}
      >
        {slide.bullets[index] || "Key Highlight"}
      </p>
    </div>
  ))}
</div>



      {/* Notes Section */}
    
    </div>
  );
}
