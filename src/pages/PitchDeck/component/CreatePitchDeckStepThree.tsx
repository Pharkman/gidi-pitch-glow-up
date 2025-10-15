import { FaChevronDown } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";

export default function CreatePitchDeckStepThree({ onClose }) {
  const navigate = useNavigate();

  // Load previously saved data if available
  const savedData = JSON.parse(localStorage.getItem("pitchDeckData")) || {};

  

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl rounded-2xl p-6 shadow-xl border border-gray-100 max-sm:mx-3">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-900">Create Pitch Deck</h2>
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
          <div className="w-10 h-1.5 rounded-full bg-gray-200"></div>
          <div className="w-10 h-1.5 rounded-full bg-orange-500"></div>
        </div>

        {/* Formik Form */}
        <Formik
          initialValues={{
            scope: savedData.scope || "",
            team: savedData.team || "",
            ask: savedData.ask || "",
          }}
          onSubmit={(values) => {
            // Merge with previous step data
            const previousData = JSON.parse(localStorage.getItem("pitchDeckData")) || {};
            const updatedData = { ...previousData, ...values };

            // Save to localStorage
            localStorage.setItem("pitchDeckData", JSON.stringify(updatedData));

            // Navigate to next step
            navigate("/create-pitchdeck/step-four");
          }}
        >
          {() => (
            <Form>
              {/* Scope */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Scope
                </label>
                <Field
                  name="scope"
                  type="text"
                  placeholder="e.g. PayLink Africa"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              {/* Team */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Team
                </label>
                <Field
                  as="textarea"
                  name="team"
                  rows="3"
                  placeholder="e.g. 2 founders with backgrounds in fintech and design."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm placeholder-gray-400 resize-none focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              {/* Ask */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Ask (optional)
                </label>
                <Field
                  as="textarea"
                  name="ask"
                  rows="3"
                  placeholder="e.g. Raising $50k to scale across Africa."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm placeholder-gray-400 resize-none focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              {/* Navigation Buttons */}
              <section className="flex justify-between items-center mt-6">
                <div
                  onClick={() => navigate("/create-pitchdeck/step-two")}
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
