import * as Yup from 'yup';

export const signupSchema = Yup.object({
  firstname: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  lastname: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one symbol"
    )
    .required("Password is required"),
});


export const onboardingSchema_about = Yup.object().shape({
  industry: Yup.string().required("Please select your industry"),
  team_size: Yup.string().required("Please enter your current team size"),
});

export const onboardingSchema_shape = Yup.object().shape({
  target_audience: Yup.string().required("Target audience is required"),
  goals: Yup.array().min(1, "Select at least one goal"),
})

export const signinSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Must be at least 6 characters")
    .required("Required"),
})

export const resetPasswordSchema = Yup.object({
  newPassword: Yup.string()
    .min(6, "Must be at least 6 characters")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Required"),
})