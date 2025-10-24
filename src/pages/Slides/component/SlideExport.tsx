import React, { useEffect, useState } from "react";
import { useExport, useGetExportedDeck } from "@/lib/query";
import { LoadingSpinner } from "@/components/Loader";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const SlideExport = () => {
  const { mutate: exportSlide, isPending } = useExport();
  const { data: exportedDeck, refetch } = useGetExportedDeck();

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [exportStatus, setExportStatus] = useState("idle"); // idle | exporting | ready
  const [loadingType, setLoadingType] = useState(null); // "PDF" | "PPTX" | "Both"

  const handleExport = (type) => {
    setLoadingType(type); // mark which button is loading

    const formats =
      type === "PDF"
        ? { pdf: true, pptx: false }
        : type === "PPTX"
        ? { pdf: false, pptx: true }
        : { pdf: true, pptx: true };

    exportSlide(formats, {
      onSuccess: () => {
        setShowStatusModal(true);
        setExportStatus("exporting");
        refetch();
      },
      onError: (error) => {
        toast.error(error.message || "Export failed");
      },
      onSettled: () => {
        setLoadingType(null); // reset loader after request
      },
    });
  };

  // Watch for export completion
  useEffect(() => {
    if (!exportedDeck?.data?.deck) return;
    const deck = exportedDeck.data.deck;

    if (deck.status === "exporting") {
      setExportStatus("exporting");
    } else if (deck.pdfUrl || deck.pptxUrl) {
      setExportStatus("ready");
      toast.success("Deck export completed successfully!");
    }
  }, [exportedDeck]);

  // Poll periodically while exporting
  useEffect(() => {
    let interval;
    if (exportStatus === "exporting") {
      interval = setInterval(() => {
        refetch();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [exportStatus, refetch]);

  const deck = exportedDeck?.data?.deck;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Export Modal */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
        <div className="bg-white rounded-2xl  w-full max-w-md p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none"></div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Export Slides
          </h2>
          <p className="text-gray-500 mb-8 text-center text-[15px]">
            Choose the format you’d like to export your slides in.
          </p>

          {/* Export Buttons */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleExport("PDF")}
                disabled={isPending}
                className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:opacity-90 hover:scale-[1.02] transition-transform duration-200 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loadingType === "PDF" && isPending ? (
                  <LoadingSpinner />
                ) : (
                  "Export as PDF"
                )}
              </button>

              <button
                onClick={() => handleExport("PPTX")}
                disabled={isPending}
                className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:opacity-90 hover:scale-[1.02] transition-transform duration-200 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loadingType === "PPTX" && isPending ? (
                  <LoadingSpinner />
                ) : (
                  "Export as PPTX"
                )}
              </button>
            </div>

            <div>
              <button
                onClick={() => handleExport("Both")}
                disabled={isPending}
                className="w-full py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl font-medium hover:opacity-90 hover:scale-[1.02] transition-transform duration-200 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loadingType === "Both" && isPending ? (
                  <LoadingSpinner />
                ) : (
                  "Export Both (PDF + PPTX)"
                )}
              </button>
            </div>
          </div>

          <div className="my-6 border-t border-gray-200"></div>

          <button
            onClick={() => setShowStatusModal(true)}
            className="w-full text-gray-500 hover:text-gray-700 font-medium text-sm transition"
          >
            Check Export Status
          </button>
        </div>
      </div>

      {/* Status Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black/50  flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Export Status
            </h3>

            {exportStatus === "exporting" && (
              <div className="flex flex-col items-center justify-center">
                {/* <Loader2 className="w-10 h-10 text-primary animate-spin mb-3" /> */}
                <span className="loaderr"></span>
                <p className="text-gray-600 text-sm">
                  Your deck is currently exporting. Please wait...
                </p>
                {deck?.activityStatus && (
                  <p className="mt-2 text-gray-500 text-xs">
                    {deck.activityStatus}
                  </p>
                )}
              </div>
            )}

            {exportStatus === "ready" && (
  <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-2xl p-8 max-w-md mx-auto text-center border border-gray-100">
    {/* Success Icon */}
    <div className="bg-green-100 rounded-full p-4 mb-4 animate-bounce">
      <CheckCircle2 className="w-10 h-10 text-green-600" />
    </div>

    {/* Title */}
    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
      Export Complete! 🎉
    </h2>

    {/* Subtitle */}
    <p className="text-gray-600 text-sm mb-6">
      Your deck has been successfully exported. You can now download your files below.
    </p>

    {/* Download Buttons */}
    <div className="flex flex-col w-full gap-3">
  {/* PDF Download */}
  {deck?.pdfUrl && (
    <a
      href={deck.pdfUrl}
      download
      className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium shadow hover:opacity-90 transition-all duration-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 16.5V3.75m0 12.75-3.75-3.75M12 16.5l3.75-3.75M4.5 19.5h15"
        />
      </svg>
      Download PDF
    </a>
  )}

  {/* PPTX Download */}
  {deck?.pptxUrl && (
    <a
      href={deck.pptxUrl}
      download
      className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-medium shadow hover:opacity-90 transition-all duration-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 16.5V3.75m0 12.75-3.75-3.75M12 16.5l3.75-3.75M4.5 19.5h15"
        />
      </svg>
      Download PPTX
    </a>
  )}

  {/* Download Both */}
  {deck?.pdfUrl && deck?.pptxUrl && (
    <button
      onClick={() => {
        // Trigger both downloads programmatically
        const pdfLink = document.createElement("a");
        pdfLink.href = deck.pdfUrl;
        pdfLink.download = "";
        pdfLink.click();

        const pptxLink = document.createElement("a");
        pptxLink.href = deck.pptxUrl;
        pptxLink.download = "";
        pptxLink.click();
      }}
      className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-lg font-medium shadow hover:opacity-90 transition-all duration-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 16.5V3.75m0 12.75-3.75-3.75M12 16.5l3.75-3.75M4.5 19.5h15"
        />
      </svg>
      Download Both Files
    </button>
  )}
</div>

  </div>
)}


            <div className="mt-6">
              <button
                onClick={() => setShowStatusModal(false)}
                className="w-full py-2 text-gray-500 hover:text-gray-700 font-medium text-sm transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlideExport;
