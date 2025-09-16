export interface INewUser {
  email: string;
  password: string;
}

export interface IVerifyUser {
  email: string;
  otp: string;
}

export interface OnboardingPayload {
  team_size?: string;
  startup_goal?: string[];
  goals?: string[];
  industry?: string;
  target_audience?: string;
}

export interface ResetPasswordPayload  {
  newPassword: string;
  confirmPassword: string;
  token: string;
};