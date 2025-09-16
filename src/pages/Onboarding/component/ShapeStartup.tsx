import { FiArrowLeft } from "react-icons/fi";
import g from "/assets/gLogo.svg";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { onboardingSchema_shape } from "@/lib/validation";
import { useOnboardingFlow } from "@/lib/query";
import SubmitButton from "@/components/Button";
import { useNavigate } from "react-router-dom";

// ✅ Validation schema
const shapeStartupSchema = {onboardingSchema_shape};

const goalsOptions = [
  "Get Funding",
  "Find Co-Founders",
  "Build MVP",
  "Acquire Customers",
  "Networking",
];

const ShapeStartup = () => {
  const navigate = useNavigate()
  const { mutate, isPending } = useOnboardingFlow();

  return (
    <div className="min-h-screen py-10 max-sm:py-10 flex flex-col items-center justify-center bg-white px-4">
      {/* Back button */}
      <div className="absolute px-10 top-6 left-6 flex items-center gap-2 text-gray-600 cursor-pointer">
        <FiArrowLeft />
        <span className="text-sm font-medium">Go Back</span>
      </div>

      {/* Logo */}
      <div className="mb-6">
        <img src={g} alt="Gidi Logo" />
      </div>

      {/* Progress Indicator */}
      <div className="flex space-x-2 mb-6">
        <div className="w-16 h-2 bg-gray-300 rounded-full"></div>
        <div className="w-16 h-2 bg-orange-500 rounded-full"></div>
        <div className="w-16 h-2 bg-gray-300 rounded-full"></div>
      </div>

      {/* Title & Subtitle */}
      <h1 className="text-3xl text-[#1D1D1D] font-semibold mb-2 text-center">
        Shape Your Startup Journey
      </h1>
      <p className="text-[#858585] text-[15px] mt-1 text-center mb-6">
        Tell us who you’re building for and what you’re aiming to achieve.
      </p>

      {/* Formik Form */}
      <Formik
        initialValues={{
          target_audience: "",
          goals: [] as string[],
        }}
        validationSchema={shapeStartupSchema}
        onSubmit={(values) => {
          mutate(values, {
            onSuccess: () => {
              navigate("/onboarding/goal_preference");
            },
          }); // 🔥 send { target_audience, goals[] } to endpoint
        }}
      >
        {({ values, handleChange, errors, touched }) => (
          <Form className="w-full max-w-xl flex flex-col space-y-6">
            {/* Target Audience */}
            <div className="flex flex-col">
              <label className="mb-3 text-[#1D1D1D] font-medium">
                Who is your target audience?
              </label>
              <Field
                name="target_audience"
                type="text"
                placeholder="Enter your target audience"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              {errors.target_audience && touched.target_audience && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.target_audience}
                </p>
              )}
            </div>

            {/* Goals */}
            <div className="flex flex-col">
              <label className="mb-3 text-[#1D1D1D] font-medium">
                What’s your goal right now?
              </label>
              <FieldArray
                name="goals"
                render={() => (
                  <div className="grid grid-cols-2 gap-3">
                    {goalsOptions.map((goal) => (
                      <label
                        key={goal}
                        className={`flex items-center space-x-2 border px-3 py-2 rounded-lg cursor-pointer ${
                          values.goals.includes(goal)
                            ? "bg-orange-50 border-orange-500 text-orange-600"
                            : "bg-gray-50 border-gray-300 text-gray-700"
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="goals"
                          value={goal}
                          checked={values.goals.includes(goal)}
                          onChange={handleChange}
                          className="hidden"
                        />
                        <span>{goal}</span>
                      </label>
                    ))}
                  </div>
                )}
              />
              {errors.goals && touched.goals && (
                <p className="text-red-500 text-sm mt-1">{errors.goals}</p>
              )}
            </div>

            {/* Continue button */}
             <SubmitButton 
              isLoading={isPending}
              text="Continue"
            />

            {/* Skip button */}
            <button
              type="button"
              className="text-[#5D5D5D] font-semibold text-[15px]"
            >
              Skip for now
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ShapeStartup;
