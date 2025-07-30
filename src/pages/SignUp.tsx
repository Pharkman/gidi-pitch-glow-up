import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import { verifyEmaill, completeAuth } from '@/lib/query';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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
      toast({ title: 'Verification link sent!', description: 'Check your email for the login link.' });
    },
    onError: (err: any) => {
      toast({ title: 'Error', description: err.message || 'Failed to send magic link', variant: 'destructive' });
    },
  });

  // Complete registration mutation
  const completeMutation = useMutation({
    mutationFn: completeAuth,
    onSuccess: () => {
      toast({ title: 'Registration complete!', description: 'You can now access your dashboard.' });
      navigate('/dashboard');
    },
    onError: (err: any) => {
      toast({ title: 'Error', description: err.message || 'Failed to complete registration', variant: 'destructive' });
    },
  });

  // Render
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#e0e7ef] w-full ">
      {!token ? (
        submitted ? (
          <div className="bg-white border border-border rounded-2xl shadow-2xl p-10 space-y-8 w-full max-w-lg transition-all duration-300 text-center text-base text-muted-foreground">
            We sent a link to <span className="font-semibold">{email}</span>.<br />Click the link in your email to continue.
          </div>
        ) : (
          <Formik
            initialValues={{ email: '' }}
            validationSchema={Yup.object({
              email: Yup.string().email('Invalid email address').required('Email is required'),
            })}
            onSubmit={({ email }) => {
              verifyEmail.mutate(email);
            }}
          >
            {({ isSubmitting, isValid, dirty, values }) => (
              <Form className="bg-white border border-border rounded-2xl shadow-2xl p-10 space-y-8 w-full max-w-lg transition-all duration-300">
                <Logo center />
                <h2 className="text-3xl font-extrabold mb-2 text-center text-gray-900 tracking-tight">Create Your Account</h2>
                {/* <p className="text-base text-muted-foreground mb-4 text-center max-w-xs mx-auto">
                  AI-powered pitch tools for African founders. Join us and build your story!
                </p> */}
                <div className="space-y-2">
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="mt-1 text-base px-4 py-3 rounded-lg border border-gray-300   transition"
                    disabled={verifyEmail.status === 'pending' || isSubmitting}
                  />
                  <ErrorMessage name="email" component="div" className="text-red-600 text-xs font-medium mt-1" />
                </div>
                <Button type="submit" className="w-full h-12 text-[16px] font-semibold mt-6 rounded-lg shadow-md bg-primary hover:bg-primary/90 transition-all" disabled={verifyEmail.status === 'pending' || isSubmitting || !isValid || !dirty}>
                  {verifyEmail.status === 'pending' || isSubmitting ? 'Sending...' : 'Verify Email'}
                </Button>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground">Or</span>
                  </div>
                </div>
                <div className="text-center text-sm mt-4">
                  Already have an account?{' '}
                  <Link to="/signin" className="text-primary hover:underline font-medium">
                    Sign In
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        )
      ) : null}
    </div>
  );
} 