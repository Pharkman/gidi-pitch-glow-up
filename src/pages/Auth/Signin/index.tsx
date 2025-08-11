/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthBgTemplate from "@/components/shared/AuthBgTemplate";
import g from "/assets/gLogo.svg";
import google from "/assets/google-icon.svg";

const SignIn = () => {
  function handleLogin(values: any) {}
  return (
    <AuthBgTemplate>
      <div>
        <div className="text-center mb-6">
          <img src={g} alt="Logo" className="mx-auto h-12" />
          <h1 className="text-[22px] font-bold text-gray-900">
            Log into your account
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            AI-powered pitch tools for African founders. Join us and build your
            story!
          </p>
        </div>

        <button className="w-full border border-gray-300 rounded-lg py-2 mb-4 flex items-center justify-center gap-2 hover:bg-gray-50">
          <img src={google} alt="Google" className="h-5 w-5" />
          <span className="text-sm font-medium text-gray-700">
            Sign in with google
          </span>
        </button>

        <div className="flex items-center my-4">
          <hr className="flex-1 border-gray-300" />
          <span className="px-3 text-gray-400 text-xs">or</span>
          <hr className="flex-1 border-gray-300" />
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
              <label className="block mb-1 text-sm font-medium">Email</label>
              <Field
                type="email"
                name="email"
                placeholder="Enter email address"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-1 text-sm"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-xs mb-4"
              />

              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium">Password</label>
                <a href="#" className="text-xs text-gray-500 hover:underline">
                  Forgot password?
                </a>
              </div>
              <Field
                type="password"
                name="password"
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-1 text-sm"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-xs mb-5"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#F97316] text-white py-2 rounded-lg text-sm font-medium hover:bg-orange-600"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="mt-4 text-center text-sm">
          Don’t have an account?{" "}
          <a
            href="/sign-up"
            className="text-[#F97316] font-medium hover:underline"
          >
            Sign Up
          </a>
        </p>

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
      </div>
    </AuthBgTemplate>
  );
};

export default SignIn;
