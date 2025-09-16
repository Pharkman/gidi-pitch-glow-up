/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthBgTemplate from "@/components/shared/AuthBgTemplate";
import g from "/assets/gLogo.svg";
import google from "/assets/google-icon.svg";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  function handleLogin(values: any) {
    try {
      navigate("/dashboard");
    } catch (e: any) {
      console.log("error is", e.message);
    }
  }

  return (
    <AuthBgTemplate>
      <div className="flex flex-col justify-between min-h-full">
        <div>
          <div className="text-center mb-12 md:mb-16">
            <img src={g} alt="Logo" className="mx-auto h-14" />
            <h1 className="text-3xl md:text-4xl font-semibold text-[#1d1d1d]">
              Log into your account
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
            onSubmit={handleLogin}
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

                <div className="mb-6">
                  <div className="mb-2 flex justify-between">
                    <label className=" text-[#1D1D1D] font-medium">
                      Password
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-[#858585] font-medium text-sm"
                    >
                      Forget password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="••••••••"
                      className="w-full border border-[#DBDBDB] rounded-sm px-3 py-2 mb-1 text-sm pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-xs mb-5"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-12 w-full bg-[#F97316] text-white py-3.5 rounded-md font-semibold"
                >
                  {isSubmitting ? "Signing in..." : "Sign In"}
                </button>
              </Form>
            )}
          </Formik>

          <p className="mt-4 text-center font-medium text-[#5D5D5D]">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-[#FF5619] font-semibold">
              Sign Up
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

export default SignIn;
