import { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import OTPInput from "react-otp-input";
import AuthBgTemplate from "@/components/shared/AuthBgTemplate";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const [wrongCode, setWrongCode] = useState(false);
  // const email = localStorage.getItem("email");
  const email = "unknown@email.com";
  const navigate = useNavigate();

  return (
    <AuthBgTemplate>
      <div className="flex flex-col justify-between min-h-full">
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-semibold text-[#1d1d1d]">
              Verify your email
            </h1>
            <p className="font-medium text-[#777777] mt-1">
              We’ve emailed a one time security code to{" "}
              <strong className="text-black">{email}</strong>, please enter it
              below:
            </p>
          </div>

          <Formik
            initialValues={{ otp: "" }}
            validationSchema={Yup.object({
              otp: Yup.string()
                .length(6, "Must be 6 digits")
                .required("Required"),
            })}
            onSubmit={(values) => {
              if (values.otp !== "123456") {
                setWrongCode(true);
              } else {
                setWrongCode(false);
                console.log("OTP Verified");
                navigate("/signin");
              }
            }}
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
                  className="mt-12 w-full bg-[#F97316] text-white py-3.5 rounded-md font-semibold"
                >
                  {isSubmitting ? "Verifying..." : "Confirm email"}{" "}
                </button>
                <p className="mt-4 text-center text-sm">
                  <p
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 cursor-pointer text-[#1D1D1D] font-semibold"
                  >
                    <ArrowLeft />
                    Go back
                  </p>
                </p>
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
    </AuthBgTemplate>
  );
};

export default VerifyEmail;
