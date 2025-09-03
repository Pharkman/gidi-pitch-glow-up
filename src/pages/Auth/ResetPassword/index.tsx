import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthBgTemplate from "@/components/shared/AuthBgTemplate";
import { useState } from "react";
import ResetSuccess from "./components/ResetSuccess";

const ResetPassword = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  function handleReset() {
    try {
      setShowSuccess(true);
    } catch (error) {
      console.log("error is", error);
    }
  }
  return (
    <AuthBgTemplate>
      {!showSuccess && (
        <div className="flex flex-col justify-between min-h-full">
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-center mb-12 md:mb-16">
              <h1 className="text-3xl md:text-4xl font-semibold text-[#1d1d1d]">
                Set New Password
              </h1>
              <p className="font-medium text-[#777777] mt-1">
                Choose a new password and confirm it. Ensure the password is at
                least 8 characters long.
              </p>
            </div>

            <Formik
              initialValues={{ password: "", confirmPassword: "" }}
              validationSchema={Yup.object({
                password: Yup.string()
                  .min(6, "Must be at least 6 characters")
                  .required("Required"),
                confirmPassword: Yup.string()
                  .oneOf([Yup.ref("password"), null], "Passwords must match")
                  .required("Required"),
              })}
              onSubmit={handleReset}
            >
              {({ isSubmitting, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label className=" text-[#1D1D1D] font-medium">
                      Password
                    </label>{" "}
                    <Field
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      className="w-full border border-[#DBDBDB] rounded-sm px-3 py-2 mb-1 text-sm"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-xs mb-5"
                    />
                  </div>

                  <>
                    <label className=" text-[#1D1D1D] font-medium">
                      Confirm Password
                    </label>{" "}
                    <Field
                      type="password"
                      name="confirmPassword"
                      placeholder="••••••••"
                      className="w-full border border-[#DBDBDB] rounded-sm px-3 py-2 mb-1 text-sm"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-red-500 text-xs mb-5"
                    />
                  </>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-12 w-full bg-[#F97316] text-white py-3.5 rounded-md font-semibold"
                  >
                    {isSubmitting ? "Resetting..." : "Reset Password"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
          <p className="text-sm text-[#777777] font-medium mt-6 px-12 md:px-0 text-center">
            By continuing, you agree to Gidipitch’s{" "}
            <a href="#" className="underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      )}
      {showSuccess && <ResetSuccess />}
    </AuthBgTemplate>
  );
};

export default ResetPassword;
