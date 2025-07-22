import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';

export default function SignIn() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#e0e7ef] w-full ">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid email address').required('Email is required'),
          password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        })}
        onSubmit={({ email, password }, { setSubmitting, setErrors }) => {
          setError('');
          if (!email || !password) {
            setErrors({ email: !email ? 'Email is required' : undefined, password: !password ? 'Password is required' : undefined });
            setSubmitting(false);
            return;
          }
          // Simulate successful login
          navigate('/dashboard');
        }}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="bg-white border border-border rounded-2xl shadow-2xl p-10 space-y-8 w-full max-w-lg transition-all duration-300">
            <Logo center />
            <h2 className="text-3xl font-extrabold mb-2 text-center text-gray-900 tracking-tight">
              Sign In to GidiPitch
            </h2>
            <p className="text-base text-muted-foreground mb-4 text-center max-w-xs mx-auto">
              Welcome back! Log in to access your AI-powered pitch tools.
            </p>
            {error && <div className="text-red-600 text-sm text-center font-medium">{error}</div>}
            <div className="space-y-2">
              <Field
                as={Input}
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="mt-1 text-base px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
              />
              <ErrorMessage name="email" component="div" className="text-red-600 text-xs font-medium mt-1" />
            </div>
            <div className="space-y-2">
              <Field
                as={Input}
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                className="mt-1 text-base px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
              />
              <ErrorMessage name="password" component="div" className="text-red-600 text-xs font-medium mt-1" />
            </div>
            <Button type="submit" className="w-full h-12 text-[16px] font-semibold mt-6 rounded-lg shadow-md bg-primary hover:bg-primary/90 transition-all" disabled={isSubmitting || !isValid || !dirty}>
              {isSubmitting ? 'Signing In...' : 'Sign In'}
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
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="text-primary hover:underline font-medium">
                Sign Up
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
} 