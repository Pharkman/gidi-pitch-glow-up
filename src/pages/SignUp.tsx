import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useNavigate, useLocation, Link } from 'react-router-dom';
// import Logo from '../../public/assets/Gidi_Logo_small.png';
import { verifyEmaill, completeAuth } from '@/lib/query';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check for token in query params
  const params = new URLSearchParams(location.search);
  const token = params.get('token');

  // Magic link mutation
  const verifyEmail = useMutation({
    mutationFn: verifyEmaill,
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: 'Verification link sent!',
        description: 'Check your email for the login link.',
      });
    },
    onError: (err: any) => {
      toast({
        title: 'Error',
        description: err.message || 'Failed to send magic link',
        variant: 'destructive',
      });
    },
  });

  // Complete registration mutation
  const completeMutation = useMutation({
    mutationFn: completeAuth,
    onSuccess: () => {
      toast({
        title: 'Registration complete!',
        description: 'You can now access your dashboard.',
      });
      navigate('/dashboard');
    },
    onError: (err: any) => {
      toast({
        title: 'Error',
        description: err.message || 'Failed to complete registration',
        variant: 'destructive',
      });
    },
  });

  return (
    <div className="min-h-screen flex w-full">
      {/* Left Side - Image */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-100 ">
        <img
          src="/signup-image.png" // replace with your image path
          alt="Signup"
          className="h-full w-full object-cover rounded-r-2xl"
        />
      </div>

      {/* Right Side - Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-8 bg-white">
        {!token ? (
          submitted ? (
            <div className="bg-white border border-border rounded-2xl shadow-2xl p-10 space-y-8 w-full max-w-md text-center text-base text-muted-foreground">
              We sent a link to{' '}
              <span className="font-semibold">{email}</span>.
              <br />
              Click the link in your email to continue.
            </div>
          ) : (
            <Formik
              initialValues={{ email: '' }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email('Invalid email address')
                  .required('Email is required'),
              })}
              onSubmit={({ email }) => {
                setEmail(email);
                verifyEmail.mutate(email);
              }}
            >
              {({ isSubmitting, isValid, dirty }) => (
                <Form className="w-full max-w-lg">
                  <div className="flex justify-center">
                    {/* <Logo /> */}
                  </div>

                  <h2 className="text-3xl font-semibold text-center text-[#1D1D1D]">
                    Create Your Account
                  </h2>
                  <p className="text-[16px] text-[#777777] font-medium text-center mt-2">
                   AI-powered pitch tools for African founders. Join us and build your story!
                  </p>

                  {/* Google Button */}
                  <Button
                    type="button"
                    className="w-full h-12 text-[16px] font-semibold rounded-lg shadow-md bg-white border hover:bg-gray-50 transition mt-5"
                  >
                    <img
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      alt="Google"
                      className="w-5 h-5 mr-2"
                    />
                   <p className="text-black font-semibold"> Sign up with Google</p>
                  </Button>

                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-muted-foreground">
                        or
                      </span>
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Field
                      as={Input}
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter email address"
                      className="mt-1 text-base px-4 py-3 rounded-lg border border-gray-300"
                      disabled={
                        verifyEmail.status === 'pending' || isSubmitting
                      }
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-600 text-xs font-medium mt-1"
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-2 my-6">
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      className="mt-1 text-base px-4 py-3 rounded-lg border border-gray-300"
                    />
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    className="w-full h-12 text-[16px] font-semibold mt-6 rounded-lg shadow-md bg-primary hover:bg-primary/90 transition-all"
                    disabled={
                      verifyEmail.status === 'pending' ||
                      isSubmitting ||
                      !isValid ||
                      !dirty
                    }
                  >
                    {verifyEmail.status === 'pending' || isSubmitting
                      ? 'Sending...'
                      : 'Sign Up'}
                  </Button>

                  {/* Already have account */}
                  <div className="text-center text-sm mt-4">
                    Already have an account?{' '}
                    <Link
                      to="/signin"
                      className="text-primary hover:underline font-medium"
                    >
                      Sign In
                    </Link>
                  </div>
                </Form>
              )}

              
            </Formik>
          )
        ) : null}
      </div>
    </div>
  );
}
