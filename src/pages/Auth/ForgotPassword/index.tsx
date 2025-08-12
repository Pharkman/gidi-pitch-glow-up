import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import OTPInput from "react-otp-input";
import AuthBgTemplate from "@/components/shared/AuthBgTemplate";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [wrongCode, setWrongCode] = useState(false);
  const navigate = useNavigate();

  const emailValidationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const otpValidationSchema = Yup.object({
    otp: Yup.string().length(6, "Must be 6 digits").required("Required"),
  });

  const handleEmailSubmit = (values: { email: string }) => {
    setEmail(values.email);
    try {
      console.log("Sending reset code to:", values.email);
      setStep("otp");
    } catch (error) {
      console.log("error is", error);
    }
  };

  const handleOtpSubmit = (values: { otp: string }) => {
    if (values.otp !== "123456") {
      setWrongCode(true);
    } else {
      setWrongCode(false);
      console.log("OTP Verified");
      navigate("/reset-password");
    }
  };

  return (
    <AuthBgTemplate>
      <div className="flex flex-col justify-between min-h-full">
        <div className="flex-1 flex flex-col justify-center">
          {step === "email" ? (
            <>
              <div className="text-center mb-6">
                <h1 className="text-3xl md:text-4xl font-semibold text-[#1d1d1d]">
                  Forgot password?
                </h1>
                <p className="font-medium text-[#777777] mt-1">
                  Enter email address to reset your password
                </p>
              </div>

              <Formik
                initialValues={{ email: "" }}
                validationSchema={emailValidationSchema}
                onSubmit={handleEmailSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block text-[#1D1D1D] mb-2 font-medium"
                      >
                        Email
                      </label>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Enter email address"
                        className="w-full border border-[#DBDBDB] rounded-sm px-3 py-2 mb-1 text-sm"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-[#E74C3C] text-xs mt-1"
                      />
                    </div>

                    <button
                      type="button"
                      disabled={isSubmitting}
                      className="mt-6 w-full bg-[#F97316] text-white py-3.5 rounded-md font-semibold hover:bg-orange-600"
                    >
                      {isSubmitting ? "Sending..." : "Request Reset Email"}
                    </button>

                    <p className="mt-4 text-center text-sm">
                      <p
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 cursor-pointer text-[#1D1D1D] font-semibold"
                      >
                        <ArrowLeft size={16} />
                        Go back
                      </p>
                    </p>
                  </Form>
                )}
              </Formik>
            </>
          ) : (
            <>
              <div className="text-center mb-6">
                <h1 className="text-3xl md:text-4xl font-semibold text-[#1d1d1d]">
                  Password reset
                </h1>
                <p className="font-medium text-[#777777] mt-1">
                  We've emailed a reset password code to{" "}
                  <strong className="text-black">{email}</strong>, please enter
                  it below:
                </p>
              </div>

              <Formik
                initialValues={{ otp: "" }}
                validationSchema={otpValidationSchema}
                onSubmit={handleOtpSubmit}
              >
                {({ setFieldValue, isSubmitting }) => (
                  <Form>
                    <OTPInput
                      value={otp}
                      onChange={(val) => {
                        setOtp(val);
                        setFieldValue("otp", val);
                      }}
                      numInputs={6}
                      inputType="tel"
                      shouldAutoFocus
                      containerStyle="flex justify-center gap-2 my-4"
                      renderSeparator={(index) =>
                        index === 2 ? (
                          <span className="mx-1 text-[#DBDBDB] text-xl font-bold">
                            -
                          </span>
                        ) : null
                      }
                      renderInput={(props) => (
                        <input
                          {...props}
                          style={{ width: "48px", height: "48px" }}
                          placeholder="o"
                          className={`border bg-[#F5F5F5] rounded-lg text-center text-lg focus:outline-none ${
                            wrongCode
                              ? "border-[#E74C3C] text-[#E74C3C]"
                              : "border-[#DBDBDB] focus:border-[#F97316]"
                          }`}
                        />
                      )}
                    />
                    <ErrorMessage
                      name="otp"
                      component="div"
                      className="text-[#E74C3C] text-xs mb-4"
                    />

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-12 w-full bg-[#F97316] text-white py-3.5 rounded-md font-semibold hover:bg-orange-600"
                    >
                      {isSubmitting ? "Confirming..." : "Confirm email"}
                    </button>

                    <p className="mt-4 text-center text-sm">
                      <p
                        onClick={() => setStep("email")}
                        className="inline-flex items-center gap-2 cursor-pointer text-[#1D1D1D] font-semibold"
                      >
                        <ArrowLeft size={16} />
                        Go back
                      </p>
                    </p>
                  </Form>
                )}
              </Formik>
            </>
          )}
        </div>

        <p className="text-sm text-[#777777] font-medium mt-6 px-12 md:px-0 text-center">
          By continuing, you agree to Gidipitch's{" "}
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
    </AuthBgTemplate>
  );
};

export default ForgotPassword;
