import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { startupOptions, teamSizeOptions } from "@/lib/constant";
import g from "/assets/gLogo.svg";
import { useOnboardingFlow } from "@/lib/query";
import { useGetTokenFromQuery } from "@/lib/query"; 
import SubmitButton from "@/components/Button";

export default function AboutStartup() {
  const navigate = useNavigate();
  const { mutate, isPending } = useOnboardingFlow();
  const { mutate: setToken } = useGetTokenFromQuery();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  
  

  // Call token setter immediately when token exists
  useEffect(() => {
    if (token) {
      setToken(
        { token },
        {
          onSuccess: () => {
            console.log("Token saved successfully ✅");
          },
          onError: (err: any) => {
            console.error("Failed to set token ❌", err);
          },
        }
      );
    }
  }, [token, setToken]);

  return (
    <div className="min-h-screen max-sm:py-10 flex flex-col items-center justify-center bg-white px-4 py-10">
      {/* Logo */}
      <div className="mb-6">
        <img src={g} alt="Gidi Logo" />
      </div>

      {/* Progress Bar */}
      <div className="flex space-x-2 mb-8">
        <div className="w-16 h-2 bg-orange-500 rounded-full"></div>
        <div className="w-16 h-2 bg-gray-300 rounded-full"></div>
        <div className="w-16 h-2 bg-gray-300 rounded-full"></div>
      </div>

      {/* Heading */}
      <h1 className="text-2xl font-semibold mb-2 text-center max-w-3xl">
        Tell us about your startup
      </h1>
      <p className="text-gray-500 mb-6 text-center max-w-xs">
        This helps GidiPitch personalize your pitch and recommendations.
      </p>

      {/* Formik Form */}
      <Formik
        initialValues={{ industry: "", team_size: "" }}
        onSubmit={(values) => {
          mutate(
            {
              industry: values.industry,
              team_size: values.team_size,
            },
            {
              onSuccess: () => {
                navigate("/onboarding/shape-startup");
              },
            }
          );
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="w-full max-w-xl">
            {/* Startup type selection */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-5 max-sm:gap-3 mb-6">
              {startupOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFieldValue("industry", option)}
                  className={`px-2 py-2 rounded-lg border transition-colors ${
                    values.industry === option
                      ? "bg-orange-50 border-orange-500 text-orange-600"
                      : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Team size dropdown */}
            <p className="mb-3 text-[16px] text-[#1D1D1D] font-medium">
              What’s your current team size?
            </p>
            <div className="relative w-full">
              <Field
                as="select"
                name="team_size"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-[#1D1D1D] appearance-none"
              >
                <option value="">Select team size</option>
                {teamSizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </Field>

              {/* Custom arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                ▼
              </div>
            </div>

            {/* Continue button */}
            <SubmitButton isLoading={isPending} text="Continue" />
          </Form>
        )}
      </Formik>
    </div>
  );
}
