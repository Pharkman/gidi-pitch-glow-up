export interface INewUser {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  newPassword?: string;
  oldPassword?: string;
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
  startupName: string;
  industry: string;
  moreInfo: string;
  brandColor: string;
  businessModel: string;
  competitions: string;
  problems: string; 
  solutions: string; 
  imageGenType: string
  features: string;
  team: {
    name: string;
    title: string;
    role: string;
  }[]; // array of objects
  scope: string;
  slides: string[]; 
}
