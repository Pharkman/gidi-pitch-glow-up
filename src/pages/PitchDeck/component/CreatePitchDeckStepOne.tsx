import { Formik, Form, Field } from "formik";
import { FaChevronDown } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useGetIndustries } from "@/lib/query";
import { useState } from "react";

export default function CreatePitchDeckStepOne({ onClose }) {
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const navigate = useNavigate();
  const { data: industries } = useGetIndustries();

  const handleNext = (values) => {
    localStorage.setItem("pitchDeckData", JSON.stringify(values));
    navigate("/create-pitchdeck/step-two");
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-xl rounded-3xl p-8 shadow-2xl border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Create Pitch Deck</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900 transition"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-2 rounded-full bg-orange-500 shadow-inner"></div>
          <div className="w-12 h-2 rounded-full bg-gray-200"></div>
          <div className="w-12 h-2 rounded-full bg-gray-200"></div>
        </div>

        {/* Formik Form */}
        <Formik
          initialValues={{
            startupName: "",
            industry: "",
            features: "",
          }}
          onSubmit={handleNext}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-6">
              {/* Startup Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Startup Name
                </label>
                <Field
                  name="startupName"
                  type="text"
                  placeholder="e.g. PayLink Africa"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:outline-none shadow-sm"
                />
              </div>

              {/* Industry */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry
                </label>
                <div className="relative">
                  <Field
                    as="select"
                    name="industry"
                    defaultValue=""
                    onChange={(e) => {
                      const value = e.target.value;
                      setSelectedIndustry(value);
                      setFieldValue("industry", value);
                    }}
                    className="appearance-none w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white shadow-sm pr-10"
                  >
                    <option value="" disabled>
                      Select industry
                    </option>
                    {industries?.data?.industries?.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry.charAt(0).toUpperCase() + industry.slice(1)}
                      </option>
                    ))}
                  </Field>

                  <FaChevronDown
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Features
                </label>
                <Field
                  as="textarea"
                  name="features"
                  rows="3"
                  placeholder="e.g. We help small businesses accept cross-border payments in seconds."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm placeholder-gray-400 resize-none focus:ring-2 focus:ring-orange-500 focus:outline-none shadow-sm"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-between items-center mt-6">
                <div
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center gap-2 text-gray-500 cursor-pointer hover:text-gray-900 transition"
                >
                  <FiArrowLeft className="text-lg" />
                  <span className="text-sm font-medium">Go Back</span>
                </div>

                <button
                  type="submit"
                  className="bg-orange-500 text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-orange-600 transition shadow-md"
                >
                  Next
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
