import React from "react";
import UploadImg from "@/components/UploadImg/UploadImg";
import UploadImgExport from "@/components/UploadImg/UploadImg_export";

export default function TeamSlide({
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
      className="w-full px-5 py-8 flex flex-col"
      style={{ backgroundColor: slideBackgroundColor }}
    >
      {/* Header */}
      <div className="flex justify-between items-start w-full opacity-80 mb-6">
        <p style={{ color: slideNoteColor }} className="text-lg tracking-wide font-semibold">
          {startupName}
        </p>
      </div>

      {/* Title */}
      <h1
        className="text-[35px] leading-[100px] font-extrabold mb-8 uppercase tracking-tight"
        style={{ color: slideTitleColor }}
      >
        {slide.title}
      </h1>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {slide?.images?.map((member, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white rounded-xl border border-[#E4E7FF] overflow-hidden shadow-sm"
          >
            {/* Image */}
            <UploadImgExport
              caption={member.caption}
              slideId={slide._id}
              slideType={slide.slideType}
              defaultImage={member.url}
              onSave={(url) => {
                console.log(`Uploaded team image ${index + 1} for slide ${slide.title}:`, url);
              }}
            />

            {/* Text Section (Outside the Image) */}
            <div className="p-4 w-full">
              <h2
                style={{ color: slideTitleColor }}
                className="text-lg font-semibold truncate"
              >
                {member.caption || "Team Member"}
              </h2>
              <p
                style={{ color: slideBulletColor }}
                className="text-sm text-gray-600 mt-1 line-clamp-3"
              >
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
