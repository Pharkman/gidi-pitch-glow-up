import { Formik, Form, Field } from "formik";
import { FiArrowLeft } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ProgressDots from "./ProgressDot";

export default function CreatePitchDeckStepTwo({ onClose }) {
  const navigate = useNavigate();

  const handleNext = (values) => {
    const existingData = JSON.parse(localStorage.getItem("pitchDeckData")) || {};
    const updatedData = { ...existingData, ...values };
    localStorage.setItem("pitchDeckData", JSON.stringify(updatedData));
    navigate("/create-pitchdeck/step-three");
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4 py-6">
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
         <div className="flex flex-col items-center justify-center">
          <ProgressDots activeIndex={1} total={4} />
        </div>


        {/* Formik Form */}
        <Formik
          initialValues={{
            problems: "",
            solutions: "",
            competitions: "",
          }}
          onSubmit={handleNext}
        >
          {() => (
            <Form className="space-y-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Competitors 
                </label>
                <Field
                  type="text"
                  name="competitions"
                  placeholder="e.g. Paystack, Flutterwave, Deel"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:outline-none shadow-sm"
                />
              </div>

              {/* Problem */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Problem
                </label>
                <Field
                  as="textarea"
                  name="problems"
                  rows="3"
                  placeholder="e.g. African freelancers struggle to get paid on time."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm placeholder-gray-400 resize-none focus:ring-2 focus:ring-orange-500 focus:outline-none shadow-sm"
                />
              </div>

              {/* Solution */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Solution
                </label>
                <Field
                  as="textarea"
                  name="solutions"
                  rows="3"
                  placeholder="e.g. A payment platform that automates invoicing and payouts for freelancers."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm placeholder-gray-400 resize-none focus:ring-2 focus:ring-orange-500 focus:outline-none shadow-sm"
                />
              </div>

              {/* Competitors */}
              
              {/* Buttons */}
              <section className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                <div
                  onClick={() => navigate("/create-pitchdeck/step-one")}
                  className="flex items-center gap-2 text-gray-500 cursor-pointer hover:text-gray-900 transition"
                >
                  <FiArrowLeft className="text-lg" />
                  <span className="text-sm font-medium">Go Back</span>
                </div>

                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#FF5619] to-[#FF7B3C] text-white font-semibold px-6 py-3 rounded-2xl shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
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