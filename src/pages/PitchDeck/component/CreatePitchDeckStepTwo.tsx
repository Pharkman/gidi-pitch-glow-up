import { Formik, Form, Field } from "formik";
import { FaChevronDown } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function CreatePitchDeckStepTwo({ onClose }) {
  const navigate = useNavigate();

  const handleNext = (values) => {
    // Get existing data from localStorage (from Step One)
    const existingData = JSON.parse(localStorage.getItem("pitchDeckData")) || {};

    // Merge new values into existing data
    const updatedData = { ...existingData, ...values };
    // Save back to localStorage
    localStorage.setItem("pitchDeckData", JSON.stringify(updatedData));
    // Move to next step
    navigate("/create-pitchdeck/step-three");
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl rounded-2xl p-6 shadow-xl border border-gray-100 max-sm:mx-3">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Create Pitch Deck
          </h2>
          <button
            onClick={onClose}
            className="text-gray-700 hover:text-gray-900 transition"
          >
            <IoClose size={22} />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-10 h-1.5 rounded-full bg-gray-200"></div>
          <div className="w-10 h-1.5 rounded-full bg-orange-500"></div>
          <div className="w-10 h-1.5 rounded-full bg-gray-200"></div>
        </div>

        {/* Formik Form */}
        <Formik
          initialValues={{
            problem: "",
            solution: "",
            competitors: "",
          }}
          onSubmit={handleNext}
        >
          {() => (
            <Form className="space-y-4">
              {/* Problem */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Problem
                </label>
                <Field
                  as="textarea"
                  name="problem"
                  rows="3"
                  placeholder="e.g. African freelancers struggle to get paid on time."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm placeholder-gray-400 resize-none focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              {/* Solution */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Solution
                </label>
                <Field
                  as="textarea"
                  name="solution"
                  rows="3"
                  placeholder="e.g. A payment platform that automates invoicing and payouts for freelancers."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm placeholder-gray-400 resize-none focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              {/* Competitors */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Competitors (Optional)
                </label>
                <Field
                  type="text"
                  name="competitors"
                  placeholder="e.g. Paystack, Flutterwave, Deel"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              {/* Buttons */}
              <section className="flex justify-between items-center mt-6">
                <div
                  onClick={() => navigate("/create-pitchdeck/step-one")}
                  className="flex items-center gap-2 text-gray-600 cursor-pointer max-sm:px-0 hover:text-gray-900 transition"
                >
                  <FiArrowLeft className="text-lg" />
                  <span className="text-sm font-medium">Go Back</span>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#FF5619] text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-orange-600 transition"
                  >
                    Next
                  </button>
                </div>
              </section>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
