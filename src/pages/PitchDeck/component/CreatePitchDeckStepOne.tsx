import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaChevronDown } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useGetIndustries } from "@/lib/query";
import { useState } from "react";
import ProgressDots from "./ProgressDot";
import { toast } from "react-toastify";

export default function CreatePitchDeckStepOne({ onClose }) {
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const navigate = useNavigate();
  const { data: industries } = useGetIndustries();

  const handleNext = (values) => {
    localStorage.setItem("pitchDeckData", JSON.stringify(values));
    navigate("/create-pitchdeck/step-two");
  };

  // ✅ Validation Schema
  const validationSchema = Yup.object({
    startupName: Yup.string().required("Startup name is required"),
    industry: Yup.string().required("Industry is required"),
    features: Yup.string().required("Features are required"),
  });

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4 max-sm:px-0 max-sm:z-0">
      <div
        className="bg-white w-full max-w-3xl rounded-3xl px-8 py-8 max-sm:px-4 shadow-2xl border border-gray-100 
        max-h-[94vh] max-sm:max-h-[100vh]  overflow-y-auto scrollbar-hide max-sm:rounded-[0px]"
      >
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
        <div className="flex flex-col items-center justify-center">
          <ProgressDots activeIndex={0} total={4} />
        </div>

        {/* Formik Form */}
        <Formik
          initialValues={{
            startupName: "",
            industry: "",
            features: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { validateForm }) => {
            validateForm(values).then((errors) => {
              if (Object.keys(errors).length > 0) {
                const missingFields = Object.keys(errors)
                  .map((key) => errors[key])
                  .join(", ");
                toast.error(`Please fill in all required fields: ${missingFields}`);
              } else {
                handleNext(values);
              }
            });
          }}
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
                  placeholder="Enter the full brand name of your venture as you want it to appear on the cover.
"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm placeholder-gray-400 focus:ring-2 focus:ring-primary focus:outline-none shadow-sm"
                />
                <ErrorMessage
                  name="startupName"
                  component="div"
                  className="text-red-500 text-xs mt-1"
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
                    className="appearance-none w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:ring-2 focus:ring-primary focus:outline-none bg-white shadow-sm pr-10"
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
                <ErrorMessage
                  name="industry"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
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
                  placeholder="Detail the core functionalities and unique technical capabilities that make your product stand out."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm placeholder-gray-400 resize-none focus:ring-2 focus:ring-primary focus:outline-none shadow-sm"
                />
                <ErrorMessage
                  name="features"
                  component="div"
                  className="text-red-500 text-xs mt-1"
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
                  className="bg-primary text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-primary transition"
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
