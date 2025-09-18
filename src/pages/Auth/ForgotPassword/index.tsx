/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import OTPInput from "react-otp-input";
import AuthBgTemplate from "@/components/shared/AuthBgTemplate";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SubmitButton from "@/components/Button";
import { useForgetPassword } from "@/lib/query";
import ResetLinkSentModal from "./component/ResetLinkModal";


const ForgotPassword = () => {
   const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const { mutateAsync: sendResetEmail, isPending: isSendingEmail } =
    useForgetPassword();

  const emailValidationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const otpValidationSchema = Yup.object({
    otp: Yup.string().length(6, "Must be 6 digits").required("Required"),
  });

  const handleEmailSubmit = async (
    values: { email: string },
    { setSubmitting }: any
  ) => {
    try {
      await sendResetEmail({ email: values.email });
      setEmail(values.email);
      setShowModal(true); 
    } catch (error: any) {
      console.error("Error:", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>    <AuthBgTemplate>
      <div className="flex flex-col justify-between min-h-full">
        <div className="flex-1 flex flex-col justify-center">
         <>
              <div className="text-center mb-6">
                <h1 className="text-3xl mb-3 md:text-4xl font-semibold text-[#1d1d1d]">
                  Forgot password?
                </h1>
                <p className="font-medium text-[#777777] mt-1 text-[16px]">
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

                    <SubmitButton
                      isLoading={isSubmitting || isSendingEmail}
                      text="Request Reset"
                    />

                    <p className="mt-4 text-center text-sm">
                      <span
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 cursor-pointer text-[#1D1D1D] font-semibold"
                      >
                        <ArrowLeft size={16} />
                        Go back
                      </span>
                    </p>
                  </Form>
                )}
              </Formik>
            </>
        </div>

        <p className="text-sm text-[#777777] font-medium mt-6 px-12 md:px-0 text-center max-sm:px-0">
          By continuing, you agree to Gidipitch's{" "}
          <a href="#" className="underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </AuthBgTemplate>

    {showModal && (
        <ResetLinkSentModal
          email={email}
          onClose={() => setShowModal(false)}
        />
      )}
    </>


    
  );
};

export default ForgotPassword;
