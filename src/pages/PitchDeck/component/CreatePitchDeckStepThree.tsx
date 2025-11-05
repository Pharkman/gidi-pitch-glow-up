import { FaChevronDown } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import ProgressDots from "./ProgressDot";

export default function CreatePitchDeckStepThree({ onClose }) {
  const navigate = useNavigate();
  const savedData = JSON.parse(localStorage.getItem("pitchDeckData")) || {};
  const validationSchema = Yup.object().shape({
    scope: Yup.string().required("Scope is required"),
    team: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required("Name is required"),
          role: Yup.string().required("Role is required"),
          expertise: Yup.string().required("expertise is required"),
        })
      )
      .min(1, "At least one team member is required"),
    moreInfo: Yup.string(),
  });

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4 max-sm:px-0  max-sm:z-0">
      <div className="bg-white w-full max-w-xl rounded-3xl p-6  max-sm:p-4 shadow-2xl border max-sm:rounded-none border-gray-100 max-h-[90vh] max-sm:max-h-[100vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-5 border-b border-gray-200 pb-3">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            Create Pitch Deck
          </h2>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-gray-500 hover:text-gray-900 hover:scale-110 transition-all duration-200"
          >
            <IoClose size={22} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 px-1">
          {/* Progress Steps */}
          <div className="flex justify-center">
            <ProgressDots activeIndex={2} total={4} />
          </div>

          {/* Formik Form */}
          <Formik
            initialValues={{
              scope: savedData.scope || "",
              team: savedData.team || [{ name: "", role: "", expertise: "" }],
              moreInfo: savedData.moreInfo || "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              const previousData =
                JSON.parse(localStorage.getItem("pitchDeckData")) || {};
              const updatedData = { ...previousData, ...values };
              localStorage.setItem("pitchDeckData", JSON.stringify(updatedData));
              navigate("/create-pitchdeck/step-four");
            }}
          >
            {({ values, errors, touched }) => (
              <Form className="space-y-5">
                {/* Scope */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Scope
                  </label>
                  <Field
                    name="scope"
                    type="text"
                    placeholder="e.g. PayLink Africa"
                    className={`w-full border ${
                      errors.scope && touched.scope
                        ? "border-red-400"
                        : "border-gray-200"
                    } rounded-2xl px-4 py-3 text-sm placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:outline-none shadow-sm transition`}
                  />
                  <ErrorMessage
                    name="scope"
                    component="div"
                    className="text-xs text-red-500 mt-1"
                  />
                </div>

                {/* Team Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Team
                  </label>
                  <FieldArray name="team">
                    {({ push, remove }) => (
                      <div className="space-y-4">
                        {values.team.map((member, index) => (
                          <div
                            key={index}
                            className="grid grid-cols-1 md:grid-cols-3 gap-3 border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 bg-white"
                          >
                            {/* Name */}
                            <div>
                              <Field
                                name={`team[${index}].name`}
                                placeholder="Full Name"
                                className={`w-full border ${
                                  errors.team?.[index]?.name &&
                                  touched.team?.[index]?.name
                                    ? "border-red-400"
                                    : "border-gray-200"
                                } rounded-xl px-3 py-2 text-sm placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:outline-none shadow-sm transition`}
                              />
                              <ErrorMessage
                                name={`team[${index}].name`}
                                component="div"
                                className="text-xs text-red-500 mt-1"
                              />
                            </div>

                            {/* Role */}
                            <div>
                              <Field
                                name={`team[${index}].role`}
                                placeholder="Role (e.g. Co-founder)"
                                className={`w-full border ${
                                  errors.team?.[index]?.role &&
                                  touched.team?.[index]?.role
                                    ? "border-red-400"
                                    : "border-gray-200"
                                } rounded-xl px-3 py-2 text-sm placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:outline-none shadow-sm transition`}
                              />
                              <ErrorMessage
                                name={`team[${index}].role`}
                                component="div"
                                className="text-xs text-red-500 mt-1"
                              />
                            </div>

                      
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <Field
                                  name={`team[${index}].expertise`}
                                  placeholder="Exp (e.g. CEO)"
                                  className={`w-full border ${
                                    errors.team?.[index]?.expertise &&
                                    touched.team?.[index]?.expertise
                                      ? "border-red-400"
                                      : "border-gray-200"
                                  } rounded-xl px-3 py-2 text-sm placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:outline-none shadow-sm transition`}
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
                              <ErrorMessage
                                name={`team[${index}].expertise`}
                                component="div"
                                className="text-xs text-red-500 mt-1"
                              />
                            </div>
                          </div>
                        ))}

<button
  type="button"
  onClick={() => push({ name: "", role: "", expertise: "" })}
  className="flex items-center gap-2 bg-orange-50 text-orange-600 border border-orange-200 rounded-md px-4 py-2 text-sm font-medium hover:bg-orange-100 hover:shadow-sm transition-all duration-200"
>
  <span className="text-lg font-bold">+</span>
  Add Team Member
</button>

                      </div>
                    )}
                  </FieldArray>
                </div>

                {/* Ask */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    More Info (optional)
                  </label>
                  <Field
                    as="textarea"
                    name="moreInfo"
                    rows="3"
                    placeholder="e.g. Raising $50k to scale across Africa."
                    className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm placeholder-gray-400 resize-none focus:ring-2 focus:ring-orange-500 focus:outline-none shadow-sm transition"
                  />
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-4">
                  <div
                    onClick={() => navigate("/create-pitchdeck/step-two")}
                    className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-gray-900 hover:gap-3 transition-all"
                  >
                    <FiArrowLeft className="text-lg" />
                    <span className="text-sm font-medium">Go Back</span>
                  </div>

                  <button
                    type="submit"
                    className="bg-[#FF5619] text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-orange-600 transition"
                  >
                    Next
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
