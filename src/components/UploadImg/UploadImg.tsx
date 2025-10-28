import React, { useRef, useState } from "react";
import { useUploadImg } from "@/lib/query";

const UploadImg = ({ defaultImage, onSave, caption, slideId, slideType }) => {
  const [preview, setPreview] = useState(defaultImage || null);
  const [uploading, setUploading] = useState(false);
  const { mutate: uploadImage } = useUploadImg();
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const image = e.target.files[0];
    if (!image) return;

    setPreview(URL.createObjectURL(image));
    setUploading(true);

    // pass slideId and caption to mutation
    uploadImage(
      { image, slideId, caption },
      {
        onSuccess: (response) => {
          const uploadedUrl = response?.data?.url;
          if (uploadedUrl) onSave(uploadedUrl);
          setUploading(false);
        },
        onError: (err) => {
          console.error("Upload failed:", err);
          setUploading(false);
        },
      }
    );
  };

  return (
    <div
      className="w-full flex flex-col items-center justify-center cursor-pointer"
      onClick={handleClick}
    >
      {preview ? (
        <div
          className={`group relative overflow-hidden shadow-lg transition-all duration-500 
            ${
              slideType === "team"
                ? "w-full h-[200px]" // Team grid style
                : "w-full h-[600px] max-sm:h-[300px]" // Default full slide image
            }
          `}
        >
          <img
            src={preview || defaultImage}
            alt={caption || "Slide image"}
            className="w-full h-full object-cover"
          />

          {/* Overlay with hover effect */}
          <div
            className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 
                       transition-opacity duration-300 ease-in-out"
          >
            <span className="text-white text-sm font-medium tracking-wide">
              {uploading ? "Uploading..." : "Change Image"}
            </span>
          </div>
        </div>
      ) : (
        <div
          className={`flex items-center justify-center border-2 border-dashed text-gray-500 text-xs 
                      transition-all duration-300 ease-in-out rounded-lg
            ${
              slideType === "team"
                ? "w-full h-[200px]"
                : "w-full h-[600px] max-sm:h-[300px] bg-gray-50"
            }
          `}
        >
          {uploading ? "Uploading..." : "Click to Upload Image"}
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        disabled={uploading}
      />
    </div>
  );
};

export default UploadImg;
