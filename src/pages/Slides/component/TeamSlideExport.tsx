import React from "react";
import UploadImg from "@/components/UploadImg/UploadImg";
import UploadImgExport from "@/components/UploadImg/UploadImg_export";

export default function TeamSlideExport({
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
      className="w-full bg-[#F2F4FF] text-[#5063FF] px-5 py-8 flex flex-col h-[900px]"
      style={{ backgroundColor: slideBackgroundColor }}
    >
      {/* Header */}
      <div className="flex justify-between items-start w-full opacity-80">
        <p
         style={{ color: slideNoteColor }}
        className="text-lg tracking-wide font-semibold">{startupName}</p>
      </div>

      {/* Title */}
      <h1
        className="text-[35px] leading-[100px] font-extrabold mb-6 uppercase tracking-tight"
        style={{ color: slideTitleColor }}
      >
        {slide.title}
      </h1>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {slide?.images?.map((member, index) => (
       <div
  key={index}
  className="relative group overflow-hidden rounded-xl border border-[#E4E7FF] bg-white"
>
  {/* Image */}
  <UploadImgExport
    caption={member.caption}
    slideId={slide._id}
    slideType={slide.slideType}
    defaultImage={member.url}
    onSave={(url) => {
      console.log(
        `Uploaded team image ${index + 1} for slide ${slide.title}:`,
        url
      );
    }}
  />

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />

  {/* Text Overlay */}
  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
    <h2
     style={{ color: slideTitleColor }}
    className="text-lg font-semibold leading-tight">
      {member.caption || "Team Member"}
    </h2>

    {/* <p 
     style={{ color: slideBulletColor }}
    className="text-sm font-medium text-white/80 mt-1">
      {slide?.bullets?.[index]
        ? slide.bullets[index].split(":")[0]
        : "Role"}
    </p> */}

    <p 
     style={{ color: slideBulletColor }}
    className="text-sm text-white/70 leading-snug mt-2 line-clamp-3">
      {slide?.bullets?.[index]
        ? slide.bullets[index].split(":")[1]?.trim()
        : slide?.notes || "No bio available"}
    </p>
  </div>
</div>

        ))}
      </div>
    </div>
  );
}
