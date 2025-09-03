/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthBgTemplate from "@/components/shared/AuthBgTemplate";
import g from "/assets/gLogo.svg";
import google from "/assets/google-icon.svg";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  function handleSignup(values: any) {
    try {
      navigate("/verify-email");
    } catch (err) {
      console.log("error is", err);
    }
  }
  return (
    <AuthBgTemplate>
      <div className="flex flex-col justify-between min-h-full">
        <div>
          <div className="text-center mb-12 md:mb-16">
            <img src={g} alt="Logo" className="mx-auto h-14" />
            <h1 className="text-3xl md:text-4xl font-semibold text-[#1d1d1d]">
              Create Your Account
            </h1>
            <p className="font-medium text-[#777777] mt-1">
              AI-powered pitch tools for African founders. Join us and build
              your story!
            </p>
          </div>

          <button className="w-full border border-[#DBDBDB] rounded-md py-2 mb-4 flex items-center justify-center gap-2 hover:bg-gray-50">
            <img src={google} alt="Google" className="size-6" />
            <span className="font-medium text-[#1D1D1D]">
              Sign up with google
            </span>
          </button>

          <div className="flex items-center my-4">
            <hr className="flex-1 border-[#C8C8C8]" />
            <span className="px-3 text-[#777777] font-medium text-sm">or</span>
            <hr className="flex-1 border-[#C8C8C8]" />
          </div>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={Yup.object({
              email: Yup.string().email("Invalid email").required("Required"),
              password: Yup.string()
                .min(6, "Must be at least 6 characters")
                .required("Required"),
            })}
            onSubmit={handleSignup}
          >
            {({ isSubmitting, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-[#1D1D1D] mb-2 font-medium">
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
                    className="text-red-500 text-xs mb-4"
                  />
                </div>

                <>
                  <label className="block mb-2 text-[#1D1D1D] font-medium">
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
                </>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-12 w-full bg-[#F97316] text-white py-3.5 rounded-md font-semibold"
                >
                  {isSubmitting ? "Signing up..." : "Sign Up"}
                </button>
              </Form>
            )}
          </Formik>

          <p className="mt-4 text-center font-medium text-[#5D5D5D]">
            Already have an account?{" "}
            <Link to="/signin" className="text-[#FF5619] font-semibold">
              Sign In
            </Link>
          </p>
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

export default SignUp;
