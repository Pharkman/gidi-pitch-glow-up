import React from "react";

const UploadImgExport = ({ defaultImage, caption, slideType }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      {defaultImage ? (
        <div
          className={`relative overflow-hidden shadow-lg transition-all duration-500 
            ${
              slideType === "team"
                ? "w-full  h-[400px]" // Team grid style
                : "w-full h-[900px] max-sm:h-[720px]" // Default full slide image
            }
          `}
        >
          <img
            src={defaultImage}
            alt={caption || "Slide image"}
            className="w-full h-full object-cover"
          />

          {/* Optional overlay or caption */}
          {/* {caption && (
            <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-center py-2 text-sm">
              {caption}
            </div>
          )} */}
        </div>
      ) : (
        <div
          className={`flex items-center justify-center border-2 border-dashed text-gray-500 text-xs 
                      transition-all duration-300 ease-in-out rounded-lg
            ${
              slideType === "team"
                ? "w-full h-[200px]"
                : "w-full h-[900px] max-sm:h-[720px] bg-gray-50"
            }
          `}
        >
          No image available
        </div>
      )}
    </div>
  );
};

export default UploadImgExport;
