import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthBgTemplate from "@/components/shared/AuthBgTemplate";
import { useState } from "react";
import ResetSuccess from "./components/ResetSuccess";
import { useSearchParams } from "react-router-dom";
import { useResetPassword } from "@/lib/query";
import { FiEye, FiEyeOff } from "react-icons/fi";

const ResetPassword = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const { mutate, isPending, error } = useResetPassword();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || ""; // 👈 grab token from URL

  // password visibility states
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
              initialValues={{ newPassword: "", confirmPassword: "" }}
              validationSchema={Yup.object({
                newPassword: Yup.string()
                  .min(6, "Must be at least 6 characters")
                  .required("Required"),
                confirmPassword: Yup.string()
                  .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
                  .required("Required"),
              })}
              onSubmit={(values) => {
                mutate(
                  {
                    newPassword: values.newPassword,
                    confirmPassword: values.confirmPassword,
                    token,
                  },
                  {
                    onSuccess: () => setShowSuccess(true),
                  }
                );
              }}
            >
              {({ isSubmitting, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  {/* New Password */}
                  <div className="mb-6">
                    <label className=" text-[#1D1D1D] font-medium">
                      New Password
                    </label>
                    <div className="relative">
                      <Field
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        placeholder="••••••••"
                        className="w-full border border-[#DBDBDB] rounded-sm px-3 py-2 mb-1 text-sm pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      >
                        {showNewPassword ? (
                          <FiEyeOff size={18} />
                        ) : (
                          <FiEye size={18} />
                        )}
                      </button>
                    </div>
                    <ErrorMessage
                      name="newPassword"
                      component="div"
                      className="text-red-500 text-xs mb-5"
                    />
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-6">
                    <label className=" text-[#1D1D1D] font-medium">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Field
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="••••••••"
                        className="w-full border border-[#DBDBDB] rounded-sm px-3 py-2 mb-1 text-sm pr-10"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword((prev) => !prev)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      >
                        {showConfirmPassword ? (
                          <FiEyeOff size={18} />
                        ) : (
                          <FiEye size={18} />
                        )}
                      </button>
                    </div>
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-red-500 text-xs mb-5"
                    />
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm">{error.message}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || isPending}
                    className="mt-12 w-full bg-[#F97316] text-white py-3.5 rounded-md font-semibold"
                  >
                    {isPending
                      ? "Resetting..."
                      : "Reset Password"}
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
