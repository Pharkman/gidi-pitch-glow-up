import React, { useRef, useState } from "react";
import { useUploadImg } from "@/lib/query";

const UploadImg = ({ defaultImage, onSave, caption, slideId }) => {
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
        <div className="relative w-full h-[600px] overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.01]">
          <img
            src={preview}
            alt={caption || "Slide image"}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300">
            <span className="text-white text-sm font-medium">
              {uploading ? "Uploading..." : "Change Image"}
            </span>
          </div>
        </div>
      ) : (
        <div className="w-full h-[600px] flex items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50 text-gray-500 text-sm hover:bg-gray-100 transition">
          {uploading ? "Uploading..." : "Click to Upload Image"}
        </div>
      )}

      {caption && (
        <p className="text-xs text-center text-gray-500 mt-2 italic">
          {caption}
        </p>
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
