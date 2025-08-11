import { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import OTPInput from "react-otp-input";
import AuthBgTemplate from "@/components/shared/AuthBgTemplate";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const [wrongCode, setWrongCode] = useState(false);

  return (
    <AuthBgTemplate>
      <div className="text-center mb-6">
        <h1 className="text-[22px] font-bold text-gray-900">
          Verify your email
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          We’ve emailed a one time security code to{" "}
          <span className="font-medium">you@example.com</span>, please enter it
          below:
        </p>
      </div>

      <Formik
        initialValues={{ otp: "" }}
        validationSchema={Yup.object({
          otp: Yup.string().length(6, "Must be 6 digits").required("Required"),
        })}
        onSubmit={(values) => {
          if (values.otp !== "123456") {
            setWrongCode(true);
          } else {
            setWrongCode(false);
            console.log("OTP Verified");
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
              containerStyle="flex justify-between gap-2 my-6"
              renderInput={(props) => (
                <input
                  {...props}
                  className={`w-full h-10 border rounded-lg text-center text-lg focus:outline-none ${
                    wrongCode
                      ? "border-red-500 text-red-500"
                      : "border-gray-300 focus:border-[#F97316]"
                  }`}
                />
              )}
            />
            <ErrorMessage
              name="otp"
              component="div"
              className="text-red-500 text-xs mb-4"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#F97316] text-white py-2 rounded-lg text-sm font-medium hover:bg-orange-600"
            >
              {isSubmitting ? "Verifying..." : "Confirm email"}
            </button>

            <p className="mt-4 text-center text-sm">
              <a href="#" className="text-gray-500 hover:underline">
                Go back
              </a>
            </p>
          </Form>
        )}
      </Formik>

      <p className="text-[10px] text-gray-500 mt-6 text-center">
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
    </AuthBgTemplate>
  );
};

export default VerifyEmail;
