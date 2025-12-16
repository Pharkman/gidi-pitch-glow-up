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
      onSettled: () => setLoadingType(null),
    });
  };

  useEffect(() => {
    if (!exportedDeck?.data?.deck || !hasExported) return;
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
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      {/* Export Modal */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
        <div className="bg-white rounded-xl w-full max-w-xl p-8 shadow-2xl border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Export slides
          </h2>
          <p className="text-gray-500 text-sm mt-1 mb-6">
            Choose a format to export your presentation.
          </p>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleExport("PDF")}
                disabled={isPending}
                className="h-11 rounded-md border border-gray-300 text-gray-800 font-medium
                           hover:bg-gray-50 disabled:opacity-60 flex items-center justify-center"
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
                className="h-11 rounded-md border border-gray-300 text-gray-800 font-medium
                           hover:bg-gray-50 disabled:opacity-60 flex items-center justify-center"
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
              className="h-11 w-full rounded-md bg-gray-900 text-white font-medium
                         hover:bg-gray-800 disabled:opacity-60"
            >
              {loadingType === "Both" && isPending
                ? <LoadingSpinner />
                : "Export PDF & PPTX"}
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={() => setShowStatusModal(true)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              View export status
            </button>
          </div>
        </div>
      </div>

      {/* Status Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl w-full max-w-xl p-8 shadow-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Export status
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              We’ll notify you once your files are ready.
            </p>

           {exportStatus === "exporting" && (
  <div className="rounded-lg border border-gray-200 bg-white p-6">
    {/* Header */}
    <div className="flex items-center gap-3 mb-5">
      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
        <LoadingSpinner />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900">
          Export in progress
        </p>
        <p className="text-xs text-gray-500">
          Your deck is being prepared in the background
        </p>
      </div>
    </div>

    {/* Steps */}
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="h-2 w-2 rounded-full bg-green-500"></span>
        <p className="text-sm text-gray-700">
          Request received
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className="h-2 w-2 rounded-full bg-green-500"></span>
        <p className="text-sm text-gray-700">
          Processing slides
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className="h-2 w-2 rounded-full bg-gray-300 animate-pulse"></span>
        <p className="text-sm text-gray-500">
          Finalizing export files
        </p>
      </div>
    </div>

    {/* Footer note */}
    <div className="mt-5 pt-4 border-t border-gray-100">
      <p className="text-xs text-gray-400">
        You can safely close this window. We’ll keep working in the background.
      </p>
    </div>
  </div>
)}


            {exportStatus === "ready" && (
              <div className="rounded-lg border border-green-200 bg-green-50 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <p className="text-sm font-medium text-gray-900">
                    Export complete
                  </p>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  Your files are ready for download.
                </p>

                <div className="space-y-2">
                  {exportType === "PDF" && deck?.pdfUrl && (
                    <a
                      href={deck.pdfUrl}
                      download
                      className="flex items-center justify-center gap-2 h-10
                                 rounded-md border border-gray-300 text-gray-800
                                 hover:bg-gray-50 text-sm"
                    >
                      <FaDownload /> Download PDF
                    </a>
                  )}

                  {exportType === "PPTX" && deck?.pptxUrl && (
                    <a
                      href={deck.pptxUrl}
                      download
                      className="flex items-center justify-center gap-2 h-10
                                 rounded-md border border-gray-300 text-gray-800
                                 hover:bg-gray-50 text-sm"
                    >
                      <FaDownload /> Download PPTX
                    </a>
                  )}

                  {exportType === "Both" && deck?.pdfUrl && deck?.pptxUrl && (
                    <>
                      <a
                        href={deck.pdfUrl}
                        download
                        className="flex items-center justify-center gap-2 h-10
                                   rounded-md border border-gray-300 text-gray-800
                                   hover:bg-gray-50 text-sm"
                      >
                        <FaDownload /> Download PDF
                      </a>

                      <a
                        href={deck.pptxUrl}
                        download
                        className="flex items-center justify-center gap-2 h-10
                                   rounded-md border border-gray-300 text-gray-800
                                   hover:bg-gray-50 text-sm"
                      >
                        <FaDownload /> Download PPTX
                      </a>

                      <button
                        onClick={handleDownloadBoth}
                        className="h-10 w-full rounded-md bg-gray-900 text-white
                                   text-sm font-medium hover:bg-gray-800"
                      >
                        Download all files
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            <div className="mt-6 text-right">
              <button
                onClick={() => setShowStatusModal(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
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
