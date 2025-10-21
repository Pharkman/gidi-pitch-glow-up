import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiArrowLeft } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ProgressDots from "./ProgressDot";

export default function CreatePitchDeckStepTwo({ onClose }) {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    problems: Yup.string().required("Problem field is required"),
    solutions: Yup.string().required("Solution field is required"),
    competitions: Yup.string(), // still a string
  });

  const [competitorInput, setCompetitorInput] = useState("");
  const [competitors, setCompetitors] = useState([]);

  const removeCompetitor = (name, setFieldValue) => {
    const updated = competitors.filter((c) => c !== name);
    setCompetitors(updated);
    setFieldValue("competitions", updated.join(", "));
  };

  const handleSubmit = (values) => {
    const existingData = JSON.parse(localStorage.getItem("pitchDeckData")) || {};
    const updatedData = { ...existingData, ...values };
    localStorage.setItem("pitchDeckData", JSON.stringify(updatedData));

    console.log("Form submitted successfully:", updatedData);

    // Navigate to Step 3
    navigate("/create-pitchdeck/step-three"); // adjust this to your Step 3 route
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4 py-6">
      <div className="bg-white w-full max-w-xl rounded-3xl p-8 shadow-2xl border border-gray-100 max-h-[94vh] overflow-y-auto scrollbar-hide">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Create Pitch Deck</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900 transition">
            <IoClose size={24} />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex flex-col items-center justify-center mb-6">
          <ProgressDots activeIndex={1} total={4} />
        </div>

        <Formik
          initialValues={{
            problems: "",
            solutions: "",
            competitions: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="space-y-4">
              {/* Competitors Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Competitors (Optional)
                </label>
                <div className="w-full border border-gray-200 rounded-xl px-3 py-2 flex flex-wrap gap-2 items-center focus-within:ring-2 focus-within:ring-orange-500 shadow-sm">
                  {competitors.map((c) => (
                    <div
                      key={c}
                      className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                    >
                      {c}
                      <button type="button" onClick={() => removeCompetitor(c, setFieldValue)}>
                        <IoClose size={14} />
                      </button>
                    </div>
                  ))}
                  <input
                    type="text"
                    value={competitorInput}
                    onChange={(e) => setCompetitorInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        const trimmed = competitorInput.trim();
                        if (trimmed && !competitors.includes(trimmed)) {
                          const updated = [...competitors, trimmed];
                          setCompetitors(updated);
                          setFieldValue("competitions", updated.join(", "));
                        }
                        setCompetitorInput("");
                      }
                    }}
                    placeholder="e.g. Paystack, Flutterwave"
                    className="flex-1 min-w-[120px] border-none outline-none text-sm py-1"
                  />
                </div>
              </div>

              {/* Problem */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Problem <span className="text-red-500">*</span>
                </label>
                <Field
                  as="textarea"
                  name="problems"
                  rows="3"
                  placeholder="e.g. African freelancers struggle to get paid on time."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm placeholder-gray-400 resize-none focus:ring-2 focus:ring-orange-500 focus:outline-none shadow-sm"
                />
                <ErrorMessage
                  name="problems"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Solution */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Solution <span className="text-red-500">*</span>
                </label>
                <Field
                  as="textarea"
                  name="solutions"
                  rows="3"
                  placeholder="e.g. A payment platform that automates invoicing and payouts for freelancers."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm placeholder-gray-400 resize-none focus:ring-2 focus:ring-orange-500 focus:outline-none shadow-sm"
                />
                <ErrorMessage
                  name="solutions"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Buttons */}
              <section className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-gray-500 cursor-pointer hover:text-gray-900 transition">
                  <FiArrowLeft className="text-lg" />
                  <span className="text-sm font-medium">Go Back</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-[#FF5619] to-[#FF7B3C] text-white font-semibold px-6 py-3 rounded-2xl shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
