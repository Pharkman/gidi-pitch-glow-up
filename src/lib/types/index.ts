export interface INewUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface IVerifyUser {
  email: string;
  otp: string;
}

export interface OnboardingPayload {
  team_size?: string;
  startup_goal?: string;
  goals?: string[];
  industry?: string;
  target_audience?: string;
}

export interface ResetPasswordPayload  {
  newPassword: string;
  confirmPassword: string;
  token: string;
};

export interface CreatePitchDeck {
  startUpName: string;
  industry: string;
  brandColor: string;
  problems: string[]; // array of strings
  solutions: string[]; // array of strings
  features: {
    feature: string;
    description: string;
  }[]; // array of objects
  founders: {
    name: string;
    title: string;
    role: string;
  }[]; // array of objects
  scope: string;
  slides: string[]; // array of strings
}
