import React, { useEffect, useState } from "react";
import { useExport, useGetExportedDeck } from "@/lib/query";
import { LoadingSpinner } from "@/components/Loader";
import { CheckCircle2 } from "lucide-react";
import { toast } from "react-toastify";
import { FaDownload } from "react-icons/fa";

const SlideExport = () => {
  const { mutate: exportSlide, isPending } = useExport();
  const { data: exportedDeck, refetch } = useGetExportedDeck();

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [exportStatus, setExportStatus] = useState("idle");
  const [loadingType, setLoadingType] = useState(null);
  const [exportType, setExportType] = useState(null);
  const [hasExported, setHasExported] = useState(false);

  const handleExport = (type) => {
    setLoadingType(type);
    setExportType(type);
     setHasExported(true); 

    const formats =
      type === "PDF"
        ? { pdf: true, pptx: false }
        : type === "PPTX"
        ? { pdf: false, pptx: true }
        : { pdf: true, pptx: true }; // Both

    exportSlide(formats, {
      onSuccess: () => {
        setShowStatusModal(true);
        setExportStatus("exporting");
        refetch();
      },
      onError: (error) => {
        toast.error(error.message || "Export failed");
      },
      onSettled: () => setLoadingType(null),
    });
  };

   useEffect(() => {
    if (!exportedDeck?.data?.deck || !hasExported) return; // 👈 Only run after export
    const deck = exportedDeck.data.deck;

    if (deck.status === "exporting") {
      setExportStatus("exporting");
    } else if (deck.pdfUrl || deck.pptxUrl) {
      setExportStatus("ready");
      toast.success("Deck export completed successfully!");
    }
  }, [exportedDeck, hasExported]);
  useEffect(() => {
    let interval;
    if (exportStatus === "exporting") {
      interval = setInterval(() => refetch(), 5000);
    }
    return () => clearInterval(interval);
  }, [exportStatus, refetch]);

  const deck = exportedDeck?.data?.deck;

  // Handle both downloads cleanly
  const handleDownloadBoth = () => {
    if (deck?.pdfUrl) {
      const pdfLink = document.createElement("a");
      pdfLink.href = deck.pdfUrl;
      pdfLink.download = "";
      pdfLink.click();
    }
    setTimeout(() => {
      if (deck?.pptxUrl) {
        const pptxLink = document.createElement("a");
        pptxLink.href = deck.pptxUrl;
        pptxLink.download = "";
        pptxLink.click();
      }
    }, 800);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Export Modal */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center  z-50 px-4">
        <div className="bg-white rounded-2xl w-full max-w-xl p-6 shadow-xl border border-gray-100 relative">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Export Slides
          </h2>
          <p className="text-gray-500 mb-6  text-sm">
            Choose the format you’d like to export your slides in.
          </p>

          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleExport("PDF")}
                disabled={isPending}
                className="py-3 bg-primary text-white rounded-lg text-base font-medium  disabled:opacity-70"
              >
                {loadingType === "PDF" && isPending ? (
                  <LoadingSpinner />
                ) : (
                  "Export PDF"
                )}
              </button>

              <button
                onClick={() => handleExport("PPTX")}
                disabled={isPending}
                className="py-3 bg-primary text-white rounded-lg text-base font-medium hover:opacity-90 hover:scale-[1.02] transition-transform duration-200 shadow-sm disabled:opacity-70"
              >
                {loadingType === "PPTX" && isPending ? (
                  <LoadingSpinner />
                ) : (
                  "Export PPTX"
                )}
              </button>
            </div>

            <button
              onClick={() => handleExport("Both")}
              disabled={isPending}
              className="w-full py-3 bg-primary text-white rounded-lg text-base font-medium hover:opacity-90 hover:scale-[1.02] transition-transform duration-200 shadow-sm disabled:opacity-70"
            >
              {loadingType === "Both" && isPending ? (
                <LoadingSpinner />
              ) : (
                "Export Both (PDF + PPTX)"
              )}
            </button>
          </div>

          <div className="my-4 border-t border-gray-200"></div>

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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-2">
          <div className="bg-white rounded-xl w-full max-w-xl p-6  border border-gray-100 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Export Status
            </h3>

            {exportStatus === "exporting" && (
              <div className="flex flex-col items-center ">
                <span className="loaderr mb-2"></span>
                <p className="text-gray-600 text-base">
                  Your deck is exporting. Please wait...
                </p>
                {deck?.activityStatus && (
                  <p className="mt-1 text-gray-500 text-sm">
                    {deck.activityStatus}
                  </p>
                )}
              </div>
            )}

            {exportStatus === "ready" && (
              <div className="flex flex-col items-center  bg-white rounded-xl  text-center">
                <div className="bg-green-100 rounded-full p-3 mb-2">
                  <CheckCircle2 className="w-6 h-6 text-green-600 animate-ping" />
                </div>

                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  Export Complete 🎉
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  Your deck has been successfully exported.
                </p>

                <div className="flex flex-col w-full gap-2 text-sm max-w-md p-4">
                  {exportType === "PDF" && deck?.pdfUrl && (
                    <a
                      href={deck.pdfUrl}
                      download
                      className="flex items-center justify-center gap-2 w-full py-2 bg-primary text-white rounded-md hover:opacity-90 transition-all"
                    >
                      <FaDownload className="animate-pulse" /> Download PDF
                    </a>
                  )}

                  {exportType === "PPTX" && deck?.pptxUrl && (
                    <a
                      href={deck.pptxUrl}
                      download
                      className="flex items-center justify-center gap-2 w-full py-2 bg-primary text-white rounded-md hover:opacity-90 transition-all"
                    >
                      <FaDownload className="animate-pulse" /> Download PPTX
                    </a>
                  )}

                  {exportType === "Both" &&
                    deck?.pdfUrl &&
                    deck?.pptxUrl && (
                      <>
                        <a
                          href={deck.pdfUrl}
                          download
                          className="flex items-center justify-center gap-2 w-full py-2 bg-primary text-white rounded-md hover:opacity-90 transition-all"
                        >
                          <FaDownload className="animate-pulse" /> Download PDF
                        </a>
                        <a
                          href={deck.pptxUrl}
                          download
                          className="flex items-center justify-center gap-2 w-full py-2 bg-primary text-white rounded-md hover:opacity-90 transition-all"
                        >
                          ⬇ Download PPTX
                        </a>
                        <button
                          onClick={handleDownloadBoth}
                          className="flex items-center justify-center gap-2 w-full py-2 bg-primary text-white rounded-md hover:opacity-90 transition-all"
                        >
                          ⬇ Download Both
                        </button>
                      </>
                    )}
                </div>
              </div>
            )}

            <div className="mt-4">
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
