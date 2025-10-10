/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthBgTemplate from "@/components/shared/AuthBgTemplate";
import g from "/assets/gLogo.svg";
import google from "/assets/google-icon.svg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateUserAccount } from "@/lib/query";
import { signupSchema } from "@/lib/validation";
import { LoadingSpinner } from "@/components/Loader";
import SubmitButton from "@/components/Button";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = useCreateUserAccount();

  function handleSignup(values: any) {
    mutate(values, {
      onSuccess: (data: any) => {
        toast({
          title: "Account created!",
          description: "Please verify your email to continue.",
        });
        navigate("/verify-email");
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description: error.message || "Failed to create user",
          variant: "destructive",
        });
      },
    });
  }

   // ✅ function to trigger google login redirect
  function handleGoogleLogin() {
    window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/google`;
  }


  return (
    <AuthBgTemplate>
      <div className="flex flex-col justify-between min-h-full">
        <div>
          <div className="text-center mb-12 md:mb-16">
            <Link to="/">
              <img src={g} alt="Logo" className="mx-auto h-14 cursor-pointer" />
            </Link>
            <h1 className="text-[27px] md:text-4xl mb-3 font-extrabold text-[#1d1d1d]">
              Create Your Account
            </h1>
            <p className="font-semibold text-[#777777] mt-1">
              AI-powered pitch tools for African founders. Join us and build
              your story!
            </p>
          </div>

          <button className="w-full border border-[#DBDBDB] rounded-md py-2 mb-4 flex items-center justify-center gap-2 hover:bg-gray-50"
          onClick={handleGoogleLogin}
          >
            <img src={google} alt="Google" className="size-6" />
            <span className="font-medium text-[#1D1D1D]">
              Sign up with Google
            </span>
          </button>

          <div className="flex items-center my-4">
            <hr className="flex-1 border-[#C8C8C8]" />
            <span className="px-3 text-[#777777] font-medium text-sm">or</span>
            <hr className="flex-1 border-[#C8C8C8]" />
          </div>

          <Formik
            initialValues={{firstname: "", lastname: "",  email: "", password: "" }}
            validationSchema={signupSchema}
            onSubmit={handleSignup}
          >
            {({ isSubmitting }) => (
              <Form>
               <div className="grid grid-cols-2 gap-4">
        <div className="">
          <label className="block text-[#1D1D1D] mb-2 font-medium text-[15px]">
            First Name
          </label>
          <Field
            type="text"
            name="firstname"
            placeholder="Enter first name"
            className="w-full border border-[#DBDBDB] rounded-sm px-3 py-2 mb-1 text-sm"
          />
          <ErrorMessage
            name="firstname"
            component="div"
            className="text-red-500 text-xs mb-4"
          />
        </div>

        <div className="mb-6">
          <label className="block text-[#1D1D1D] mb-2 font-medium text-[15px]">
            Last Name
          </label>
          <Field
            type="text"
            name="lastname"
            placeholder="Enter last name"
            className="w-full border border-[#DBDBDB] rounded-sm px-3 py-2 mb-1 text-sm"
          />
          <ErrorMessage
            name="lastname"
            component="div"
            className="text-red-500 text-xs mb-4"
          />
        </div>
      </div>

                <div className="mb-6">
                  <label className="block text-[#1D1D1D] mb-2 font-medium text-[15px]">
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
                  <label className="block text-[15px] mb-2 text-[#1D1D1D] font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="••••••••"
                      className="w-full border border-[#DBDBDB] rounded-sm px-3 py-2 mb-1 text-sm pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-500"
                    >
                      {showPassword ? (
                        <FiEyeOff size={18} />
                      ) : (
                        <FiEye size={18} />
                      )}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-xs mb-5"
                  />
                </div>

                <SubmitButton
                  isLoading={isSubmitting || isPending}
                  text="Sign Up"
                />
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
        <p className="text-sm text-[#777777] font-medium mt-6 px-12 md:px-0 text-center max-sm:px-0">
          By continuing, you agree to Gidipitch’s
          <a href="#" className="underline">
            Terms of Service
          </a>
          and
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
