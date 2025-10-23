import { LoadingSpinner } from "@/components/Loader";
import { useExport } from "@/lib/query";
import React from "react";
import { useParams, useSearchParams } from "react-router-dom";

const SlideExport = () => {
  const { mutate: exportSlide, isPending } = useExport();

  const handleExport = (type) => {
    const formats =
      type === "PDF"
        ? { pdf: true, pptx: false }
        : type === "PPTX"
        ? { pdf: false, pptx: true }
        : { pdf: true, pptx: true };

    exportSlide(formats); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Modal */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 relative overflow-hidden">
          {/* Decorative gradient accent */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none "></div>

          {/* Modal Header */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2 ">
            Export Slides
          </h2>
          <p className="text-gray-500 mb-8 text-[15px]">
            Choose the format you’d like to export your slides in.
          </p>

          {/* Export Buttons */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleExport("PDF")}
              className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:opacity-90 hover:scale-[1.02] transition-transform duration-200 shadow-md"
            >
               {isPending ? <LoadingSpinner /> : "Export as PDF"}
            </button>

            <button
              onClick={() => handleExport("PPTX")}
              className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:scale-[1.02] transition-transform duration-200 shadow-md"
            >
              {isPending ? <LoadingSpinner />: "Export as PPTX"}
            </button>
            </div>

<div>
            <button
              onClick={() => handleExport("Both")}
              className="w-full py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl font-medium hover:opacity-90 hover:scale-[1.02] transition-transform duration-200 shadow-md"
            >
              {isPending ? <LoadingSpinner /> : "Export Both (PDF + PPTX)"}
            </button>
            </div>
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-gray-200"></div>

          {/* Cancel Button */}
          <button className="w-full text-gray-500 hover:text-gray-700 font-medium text-sm transition">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlideExport;
