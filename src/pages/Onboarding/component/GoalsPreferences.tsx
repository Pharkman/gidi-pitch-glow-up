import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { FaRegFileAlt } from "react-icons/fa";
import { BsBarChartFill } from "react-icons/bs";
import { AiOutlineBulb } from "react-icons/ai";
import { GiSparkles } from "react-icons/gi";
import { Check } from "lucide-react"; // ✅ Import check icon
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import g from "/assets/gLogo.svg";
import { useOnboardingFlow } from "@/lib/query";
import SubmitButton from "@/components/Button";

// ✅ Validation
const goalsSchema = Yup.object().shape({
  startup_goal: Yup.array().min(1, "Please select at least one goal"),
});

const goals = [
  { label: "Create pitch deck", icon: <BsBarChartFill size={24} /> },
  { label: "Resume Builder", icon: <FaRegFileAlt size={24} /> },
  { label: "Application Assistant", icon: <AiOutlineBulb size={24} /> },
  { label: "AI Pitch Practice", icon: <GiSparkles size={24} /> },
];

export default function GoalsPreferences() {
  const { mutate, isPending } = useOnboardingFlow();

  return (
    <div className="min-h-screen py-10 flex flex-col items-center justify-center bg-white px-4">
      {/* Back button */}
      <div className="absolute px-10 top-6 left-6 flex items-center gap-2 text-gray-600 cursor-pointer max-sm:px-0">
        <FiArrowLeft />
        <span className="text-sm font-medium">
          <a href="/onboarding/shape-startup">Go Back</a>
        </span>
      </div>

      {/* Logo */}
      <div className="flex flex-col items-center gap-4">
        <div className="mb-6">
          <img src={g} alt="Gidi Logo" />
        </div>

        {/* Progress bar */}
        <div className="flex gap-2 w-40">
          <div className="h-1 flex-1 rounded-full bg-gray-200"></div>
          <div className="h-1 flex-1 rounded-full bg-gray-200"></div>
          <div className="h-1 flex-1 rounded-full bg-orange-500"></div>
        </div>

        {/* Headings */}
        <h2 className="text-2xl font-bold text-center">Goals & Preferences</h2>
        <p className="text-gray-500 text-center text-sm max-w-sm">
          Let us know what you want to achieve with GidiPitch
        </p>
      </div>

      {/* Formik Form */}
      <Formik
        initialValues={{ startup_goal: [] as string[] }}
        validationSchema={goalsSchema}
        onSubmit={(values) => {
          mutate(values);
        }}
      >
        {({ values, errors, touched, handleSubmit }) => (
          <Form
            onSubmit={handleSubmit}
            className="mt-6 w-full max-w-xl flex flex-col items-center"
          >
            <p className="font-medium text-sm sm:text-base mb-4 w-full">
              What are your primary goals?{" "}
              <span className="text-gray-500">(Select all that apply)</span>
            </p>

            <FieldArray
              name="startup_goal"
              render={(arrayHelpers) => (
                <div className="grid grid-cols-2 gap-4 w-full">
                  {goals.map((goal) => {
                    const isSelected = values.startup_goal.includes(goal.label);
                    return (
                      <div
                        key={goal.label}
                        onClick={() =>
                          isSelected
                            ? arrayHelpers.remove(
                                values.startup_goal.indexOf(goal.label)
                              )
                            : arrayHelpers.push(goal.label)
                        }
                        className={`relative flex flex-col items-center justify-center p-6 rounded-xl border cursor-pointer transition ${
                          isSelected
                            ? "bg-gradient-to-r from-[#FF7442] to-[#FF5619] text-white border-none"
                            : "bg-white border-gray-300 text-gray-700 hover:border-orange-400"
                        }`}
                      >
                        {/* ✅ Checkbox in top-right corner */}
                        {isSelected && (
                          <div className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full bg-white">
                            <Check className="w-4 h-4 text-orange-500" />
                          </div>
                        )}
                        <div className="mb-2">{goal.icon}</div>
                        <p className="font-medium text-sm">{goal.label}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            />

            {errors.startup_goal && touched.startup_goal && (
              <p className="text-red-500 text-sm mt-2">{errors.startup_goal}</p>
            )}

            {/* Finish button */}
            <SubmitButton isLoading={isPending} text="Finish" />
          </Form>
        )}
      </Formik>
    </div>
  );
}
