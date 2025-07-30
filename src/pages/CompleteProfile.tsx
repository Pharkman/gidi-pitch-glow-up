import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Logo from '@/components/Logo';
import { completeAuth } from '@/lib/query';
import Spinner from '@/components/spinner';

export default function CompleteProfile() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  console.log('token:', token);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#e0e7ef] w-full">
      <Formik
        initialValues={{
          firstname: '',
          lastname: '',
          password: '',
          confirmPassword: '',
          token: token || ''
        }}
        validationSchema={Yup.object({
          firstname: Yup.string()
            .trim()
            .required('First name is required'),
          lastname: Yup.string()
            .trim()
            .required('Last name is required'),
          password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm Password is required'),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          setError('');
          if (!token) {
            setError('Token is missing. Please use the correct link.');
            setSubmitting(false);
            return;
          }

          const { firstname, lastname, password, confirmPassword } = values;

          console.log('Submitting data:', {
            firstname,
            lastname,
            password,
            confirmPassword,
            token,
          });

          try {
            await completeAuth({
              firstname,
              lastname,
              password,
              confirmPassword,
              token,
            });
            navigate('/dashboard');
          } catch (err: any) {
            setError(err.message || 'Something went wrong');
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="bg-white border border-border rounded-2xl shadow-2xl p-10 space-y-8 w-full max-w-lg transition-all duration-300">
            <Logo center />
            <h2 className="text-3xl font-extrabold mb-2 text-center text-gray-900 tracking-tight">
              Complete Profile to Continue
            </h2>

            {error && (
              <div className="text-red-600 text-sm text-center font-medium">
                {error}
              </div>
            )}

            {/* Firstname */}
            <div className="space-y-2">
              <Field
                as={Input}
                id="firstname"
                name="firstname"
                type="text"
                placeholder="First Name"
              />
              <ErrorMessage
                name="firstname"
                component="div"
                className="text-red-600 text-xs font-medium mt-1"
              />
            </div>

            {/* Lastname */}
            <div className="space-y-2">
              <Field
                as={Input}
                id="lastname"
                name="lastname"
                type="text"
                placeholder="Last Name"
              />
              <ErrorMessage
                name="lastname"
                component="div"
                className="text-red-600 text-xs font-medium mt-1"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Field
                as={Input}
                id="password"
                name="password"
                type="password"
                placeholder="Password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-600 text-xs font-medium mt-1"
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Field
                as={Input}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-600 text-xs font-medium mt-1"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-[16px] font-semibold mt-6 rounded-lg shadow-md bg-primary hover:bg-primary/90 transition-all"
              disabled={isSubmitting || !isValid || !dirty}
            >
              {isSubmitting ? <Spinner /> : 'Sign In'}
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
