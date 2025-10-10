import { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import OTPInput from "react-otp-input";
import AuthBgTemplate from "@/components/shared/AuthBgTemplate";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useVerifyEmail } from "@/lib/query";
import SubmitButton from "@/components/Button";
import { HiMail } from "react-icons/hi";


const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const [wrongCode, setWrongCode] = useState(false);
  const email = localStorage.getItem("registeredEmail") || "unknown@email.com";
  const navigate = useNavigate();

  const { mutate, isPending } = useVerifyEmail();

  return (
    <AuthBgTemplate>
      <div className="flex justify-center items-center px-4 py-6 sm:py-10 md:py-16 max-sm:px-0">
        <div className="bg-white rounded-2xl w-full max-w-md sm:max-w-lg md:max-w-xl p-6 sm:p-8 md:p-10 flex flex-col shadow-xl ring-1 ring-gray-100 transition-all duration-300 transform scale-100 hover:scale-[1.01]">
          {/* Header */}
          <div className="text-start max-sm:text-start mb-6 sm:mb-8 flex justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900">
                Verify Your Email
              </h1>
              <p className="text-gray-600 mt-2 sm:mt-3 text-[14px] sm:text-sm md:text-base leading-relaxed">
                We've sent a one-time security code to
                <br />
                <strong className="text-gray-900 font-semibold block mt-1 break-words">
                  {email}
                </strong>
                <span className="mt-1 block">Please enter the code below to continue.</span>
              </p>
            </div>

            <div>
              <HiMail className="text-3xl max-sm:text-2xl text-gray-600 mt-2 sm:mt-3" />
            </div>
          </div>

          {/* Form */}
          <Formik
            initialValues={{ otp: "" }}
            validationSchema={Yup.object({
              otp: Yup.string()
                .length(6, "Must be 6 digits")
                .required("Required"),
            })}
            onSubmit={(values) => {
              mutate(
                { email, otp: values.otp },
                {
                  onError: () => setWrongCode(true),
                  onSuccess: () => setWrongCode(false),
                }
              );
            }}
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form className="flex flex-col gap-5 sm:gap-6">
                {/* OTP Input */}
                <OTPInput
                  value={otp}
                  onChange={(val) => {
                    setOtp(val);
                    setFieldValue("otp", val);
                  }}
                  numInputs={6}
                  inputType="tel"
                  shouldAutoFocus
                  containerStyle="flex justify-center gap-1.5 sm:gap-2 md:gap-3"
                  renderSeparator={(index) =>
                    index === 2 ? (
                      <span className="mx-1 text-gray-300 font-bold text-lg sm:text-xl">–</span>
                    ) : null
                  }
                  renderInput={(props) => (
                    <input
                      {...props}
                      style={{ width: "100%", maxWidth: "50px", height: "46px" }}
                      placeholder="•"
                      className={`
                        border rounded-lg sm:rounded-xl text-center text-lg sm:text-xl font-semibold bg-gray-50
                        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500
                        ${wrongCode
                          ? "border-red-500 text-red-600 animate-shake"
                          : "border-gray-300 focus:border-orange-500"
                        }
                      `}
                    />
                  )}
                />

                <ErrorMessage
                  name="otp"
                  component="div"
                  className="text-red-600 text-xs sm:text-sm font-medium text-center -mt-1"
                />

                <SubmitButton
                  isLoading={isSubmitting || isPending}
                  text="Confirm email"
                />

                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft size={16} />
                  Go back to sign up
                </button>
              </Form>
            )}
          </Formik>

          {/* Footer */}
          <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 font-medium mt-8 sm:mt-10 text-center leading-relaxed">
            By continuing, you agree to{" "}
            <a href="#" className="underline hover:text-orange-500 transition-colors">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline hover:text-orange-500 transition-colors">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </AuthBgTemplate>
  );
};

export default VerifyEmail;
