import { FiArrowLeft } from "react-icons/fi";
import g from "/assets/gLogo.svg";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useOnboardingFlow } from "@/lib/query";
import SubmitButton from "@/components/Button";
import { useNavigate } from "react-router-dom";

// ✅ Validation schema
const shapeStartupSchema = Yup.object().shape({
  target_audience: Yup.string().required("Target audience is required"),
  goal: Yup.string().required("Please enter your goal"),
});

const ShapeStartup = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useOnboardingFlow();

  return (
    <div className="min-h-screen py-10 max-sm:py-10 flex flex-col items-center justify-center bg-white px-4">
      {/* Back button */}
      <div className="absolute px-10 top-6 left-6 flex items-center gap-2 text-gray-600 cursor-pointer max-sm:px-0">
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
      <h1 className="text-3xl text-[#1D1D1D] font-extrabold mb-2 text-center max-sm:text-[22px]">
        Shape Your Startup Journey
      </h1>
      <p className="text-[#858585] font-medium text-[15px] mt-1 text-center mb-6">
        Tell us who you’re building for and what you’re aiming to achieve.
      </p>

      {/* Formik Form */}
      <Formik
        initialValues={{
          target_audience: "",
          goal: "",
        }}
        validationSchema={shapeStartupSchema}
        onSubmit={(values) => {
          console.log("Submitting values 👉", values); // Debug log
          mutate(values, {
            onSuccess: () => {
              navigate("/onboarding/goal_preference");
            },
          });
        }}
      >
        {({ errors, touched }) => (
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
                className="border border-gray-300 rounded-lg placeholder:text-[14px] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              {errors.target_audience && touched.target_audience && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.target_audience}
                </p>
              )}
            </div>

            {/* Goal */}
            <div className="flex flex-col">
              <label className="mb-3 text-[#1D1D1D] font-medium">
                What’s your goal right now?
              </label>
              <Field
                name="goal"
                type="text"
                placeholder="Write your goal"
                className="border border-gray-300 placeholder:text-[14px] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              {errors.goal && touched.goal && (
                <p className="text-red-500 text-sm mt-1">{errors.goal}</p>
              )}
            </div>

            {/* Continue button */}
            <SubmitButton isLoading={isPending} text="Continue" />

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
