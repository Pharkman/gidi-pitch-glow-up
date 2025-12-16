import { FaChevronDown } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useGetIndustries_Slides } from "@/lib/query";
import { useEffect, useState } from "react";
import SlideSelector from "./SlideSelector";
import ProgressDots from "./ProgressDot";
import { toast } from "react-toastify";

export default function CreatePitchDeckStepFour({ onClose }) {
  const navigate = useNavigate();
  const [selectedIndustry, setSelectedIndustry] = useState("");

  const savedData = JSON.parse(localStorage.getItem("pitchDeckData")) || {};

  useEffect(() => {
    if (savedData.industry) {
      setSelectedIndustry(savedData.industry);
    }
  }, []);

  const { data: slideData, isLoading } = useGetIndustries_Slides(selectedIndustry);

  const handleNext = (values) => {
    const previousData = JSON.parse(localStorage.getItem("pitchDeckData") || "{}");
    const mergedData = { ...previousData, ...values };
    localStorage.setItem("pitchDeckData", JSON.stringify(mergedData));
    navigate("/check-token-balance");
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 max-sm:z-0">
      <div className="bg-white w-full max-w-3xl rounded-2xl p-6 max-sm:p-4 shadow-xl border border-gray-100 max-sm:max-h-[100vh] max-sm:rounded-none  max-h-[90vh] overflow-y-auto scrollbar-hide">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-extrabold text-gray-900">Create Pitch Deck</h2>
          <button onClick={() => navigate("/dashboard")} className="text-gray-700 hover:text-gray-900 transition">
            <IoClose size={22} />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex flex-col items-center justify-center">
      <ProgressDots activeIndex={3} total={4} />
    </div>

        <Formik
          initialValues={{
            brandColor: savedData.brandColor || "",
            businessModel: savedData.businessModel || "",
            slides: savedData.slides || [],
            imageGenType: savedData.imageGenType || "manual",
          }}
          onSubmit={handleNext}
        >
          {({ values, setFieldValue }) => (
            <Form>
              {/* Brand Color */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-800 mb-1">Brand Color</label>
                <Field
                  name="brandColor"
                  type="text"
                  placeholder="e.g. Blue, Red"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm placeholder-gray-400 focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              {/* Business Model */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-800 mb-1">Business Model</label>
                <Field
                  name="businessModel"
                  type="text"
                  placeholder="e.g. Subscription, Marketplace"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm placeholder-gray-400 focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
{/* Image Generation Type */}
<div className="mb-4">
  <label className="block text-sm font-medium text-gray-800 mb-2">
    Image Generation Type
  </label>
  <div className="flex gap-4 border border-gray-200 rounded-lg px-3 py-2.5">
    <label
      className={`flex items-center gap-2 text-sm cursor-pointer px-2 py-1 rounded-md transition ${
        values.imageGenType === "manual"
          ? "bg-gray-50 border border-primary text-primary"
          : "text-gray-700 hover:bg-gray-50"
      }`}
    >
      <Field
        type="radio"
        name="imageGenType"
        value="manual"
        checked={values.imageGenType === "manual"}
        onChange={() => setFieldValue("imageGenType", "manual")}
        className="text-primary accent-primary focus:ring-primary"
      />
      Manual
    </label>

    <label
      className={`flex items-center gap-2 text-sm cursor-pointer px-2 py-1 rounded-md transition ${
        values.imageGenType === "ai"
          ? "bg-gray-50 border border-primary text-primary"
          : "text-gray-700 hover:bg-gray-50"
      }`}
    >
      <Field
        type="radio"
        name="imageGenType"
        value="ai"
        checked={values.imageGenType === "ai"}
        onChange={() => setFieldValue("imageGenType", "ai")}
        className="text-primary accent-primary focus:ring-primary"
      />
      AI
    </label>  </div>
</div>


              {/* Slide Selector */}
              {isLoading ? (
                <p className="text-sm text-gray-500">Loading slides...</p>
              ) : (
                <SlideSelector
                  slideData={slideData}
                  selectedSlides={values.slides}
                  setFieldValue={setFieldValue}
                />
              )}

              {/* Navigation Buttons */}
              <section className="flex justify-between items-center mt-6">
                <div
                  onClick={() => navigate("/create-pitchdeck/step-three")}
                  className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-gray-900 transition"
                >
                  <FiArrowLeft className="text-lg" />
                  <span className="text-sm font-medium">Go Back</span>
                </div>

                <button
                  type="submit"
                  className="bg-primary text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-primary-600 transition"
                >
                  Next
                </button>
              </section>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
