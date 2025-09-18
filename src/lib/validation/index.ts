import * as Yup from 'yup';

export const signupSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("Required"),
})

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