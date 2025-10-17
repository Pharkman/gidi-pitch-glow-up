import { FaChevronDown } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, FieldArray } from "formik";

export default function CreatePitchDeckStepThree({ onClose }) {
  const navigate = useNavigate();

  // Load saved data if available
  const savedData = JSON.parse(localStorage.getItem("pitchDeckData")) || {};

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl rounded-2xl p-6 shadow-2xl border border-gray-100 max-sm:mx-3 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-5 border-b border-gray-100 pb-3">
          <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
            Create Pitch Deck
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 hover:scale-105 transition-all duration-200"
          >
            <IoClose size={22} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent flex-1 pr-1">
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-1.5 rounded-full bg-gray-200"></div>
            <div className="w-10 h-1.5 rounded-full bg-gray-200"></div>
            <div className="w-10 h-1.5 rounded-full bg-[#FF5619]"></div>
          </div>

          {/* Formik Form */}
          <Formik
            initialValues={{
              scope: savedData.scope || "",
              team: savedData.team || [{ name: "", role: "", title: "" }],
              ask: savedData.ask || "",
            }}
            onSubmit={(values) => {
              const previousData =
                JSON.parse(localStorage.getItem("pitchDeckData")) || {};
              const updatedData = { ...previousData, ...values };
              localStorage.setItem("pitchDeckData", JSON.stringify(updatedData));
              navigate("/create-pitchdeck/step-four");
            }}
          >
            {({ values }) => (
              <Form className="pb-2">
                {/* Scope */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Scope
                  </label>
                  <Field
                    name="scope"
                    type="text"
                    placeholder="e.g. PayLink Africa"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm placeholder-gray-400 focus:ring-2 focus:ring-[#FF5619]/80 focus:outline-none transition-all"
                  />
                </div>

                {/* Team Section */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Team
                  </label>

                  <FieldArray name="team">
                    {({ push, remove }) => (
                      <div className="space-y-4">
                        {values.team && values.team.length > 0 ? (
                          values.team.map((member, index) => (
                            <div
                              key={index}
                              className="grid grid-cols-1 md:grid-cols-3 gap-3 border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-300"
                            >
                              {/* Name */}
                              <Field
                                name={`team[${index}].name`}
                                placeholder="Full name"
                                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm placeholder-gray-400 focus:ring-2 focus:ring-[#FF5619]/80 focus:outline-none transition-all"
                              />

                              {/* Role */}
                              <Field
                                name={`team[${index}].role`}
                                placeholder="Role (e.g. Co-founder)"
                                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm placeholder-gray-400 focus:ring-2 focus:ring-[#FF5619]/80 focus:outline-none transition-all"
                              />

                              {/* Title */}
                              <div className="flex items-center gap-2">
                                <Field
                                  name={`team[${index}].title`}
                                  placeholder="Title (e.g. CEO)"
                                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm placeholder-gray-400 focus:ring-2 focus:ring-[#FF5619]/80 focus:outline-none transition-all"
                                />
                                {values.team.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="text-red-500 text-xs font-medium hover:underline hover:scale-105 transition-all"
                                  >
                                    Remove
                                  </button>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500">
                            No team members added yet.
                          </p>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            push({ name: "", role: "", title: "" })
                          }
                          className="text-[#FF5619] text-sm font-medium hover:underline hover:opacity-80 transition-all"
                        >
                          + Add team member
                        </button>
                      </div>
                    )}
                  </FieldArray>
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
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm placeholder-gray-400 resize-none focus:ring-2 focus:ring-[#FF5619]/80 focus:outline-none transition-all"
                  />
                </div>

                {/* Navigation Buttons */}
                <section className="flex justify-between items-center mt-6">
                  <div
                    onClick={() => navigate("/create-pitchdeck/step-two")}
                    className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-gray-900 hover:gap-3 transition-all"
                  >
                    <FiArrowLeft className="text-lg" />
                    <span className="text-sm font-medium">Go Back</span>
                  </div>

                  <button
                    type="submit"
                    className="bg-[#FF5619] text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#e94e14] hover:scale-[1.02] transition-all duration-200 shadow-sm"
                  >
                    Next
                  </button>
                </section>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
