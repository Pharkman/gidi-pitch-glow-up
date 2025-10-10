// src/lib/query.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { INewUser, IVerifyUser, OnboardingPayload, ResetPasswordPayload } from "../types";

import { QUERY_KEYS } from "../queryKeys";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;
// lib/api.ts

export const getUserDetails = async () => {
  try {
    const response = await fetch('https://gidipitch-backend.onrender.com/api/auth/user', {
      method: 'GET',
      credentials: 'include', // assuming you're using cookies for auth
      headers: {
        'Content-Type': 'application/json',
      }, 
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user details');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    return null;
  }
};



export const useWaitlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email }: { email: string }) => {
       console.log("🚀 Sending payload to backend:", { email });
      try {
        const res = await fetch(`${BASE_URL}/waitlist/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err?.message || "Failed to join waitlist");
        }

        toast.success(res.message || "Successfully joined waitlist");

        return res.json();
      } catch (error: unknown) {
        console.error(error);
        if (error instanceof Error) {
          toast.error(error.message || "Failed to join waitlist");
        } else {
          toast.error("Failed to join waitlist");
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_PEOPLE] });
    },
  });
};


export const useGetPeople = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PEOPLE],
    queryFn: async () => {
      try {
        const res = await fetch(`${BASE_URL}/waitlist/count`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err?.message || 'Failed to get people');
        }

        return res.json();
      } catch (error: unknown) {
        console.error(error);
        if (error instanceof Error) {
          toast.error(error.message || 'Failed to get people');
        } else {
          toast.error('Failed to get people');
        }
      }
    }
  });
};


export const useCreateUserAccount = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async ({ email, password }: INewUser) => {
      try {
        const res = await fetch(`${BASE_URL}/auth/local`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password})
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        console.log(data);
        if (data.error) throw new Error(data.error);
         if (data?.user?.email) {
          localStorage.setItem("registeredEmail", data.user.email);
        toast.success("Account created successfully!");
        navigate('/auth/verify');
        }

        return data;
      } catch (error: unknown) {
        console.error(error);
        if (error instanceof Error) {
          toast.error(error.message || 'Failed to create user');
        } else {
          toast.error('Failed to create user');
        }
      }
    }
  });
};

export const useVerifyEmail = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async ({ email, otp }: IVerifyUser) => {
      try {
        const res = await fetch(`${BASE_URL}/auth/email/verify`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, otp }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to verify email");
        console.log("verify response:", data);

        if (data.error) throw new Error(data.error);

        toast.success(`${data.message}`);
        navigate("/onboarding/about-startup");

        return data;
      } catch (error: unknown) {
        console.error(error);
        if (error instanceof Error) {
          toast.error(error.message || "Failed to verify email");
        } else {
          toast.error("Failed to verify email");
        }
      }
    },
  });
};



export const useGoogleLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`${BASE_URL}/auth/google`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        console.log(data);
        if (data.error) throw new Error(data.error);

        toast.success(`${data.message}`);
        navigate('/onboarding/about-startup');

        return data;
      } catch (error: unknown) {
        console.error(error);
        if (error instanceof Error) {
          toast.error(error.message || 'Failed to create user');
        } else {
          toast.error('Failed to create user');
        }
      }
    }
  });
};



export const useOnboardingFlow = () => {
  return useMutation({
    mutationFn: async (payload: OnboardingPayload) => {
      
      const res = await fetch(`${BASE_URL}/auth`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result?.error || "Onboarding failed");
      }
      return result;
    },
     onSuccess: (data: any) => {
      toast.success(data?.message ?? "Onboarding step saved 🎉");

      console.log("Cookies:", document.cookie);
    },
    onError: (error: any) => {
      toast.error(error?.message ?? "Failed to complete onboarding step ❌");
    },
  });
};


// export const useOnboardingFlow = () => {
//   return useMutation({
//     mutationFn: async (payload: OnboardingPayload) => {
//       // Grab token from cookie
//       const allCookies = document.cookie;
//       const match = allCookies.match(/(^| )token=([^;]+)/);
//       const token = match ? match[2] : null;

//       const res = await fetch(`${BASE_URL}/auth`, {
//         method: "PUT",
//         headers: { 
//           "Content-Type": "application/json",
//           ...(token ? { Authorization: `Bearer ${token}` } : {}) // 🔑 attach token if found
//         },
//         body: JSON.stringify(payload),
//         credentials: "include",
//       });

//       const result = await res.json();
//       if (!res.ok) {
//         throw new Error(result?.error || "Onboarding failed");
//       }
//       return result;
//     },
//     onSuccess: (data: any) => {
//       toast.success(data?.message ?? "Onboarding step saved 🎉");
//     },
//     onError: (error: any) => {
//       toast.error(error?.message ?? "Failed to complete onboarding step ❌");
//     },
//   });
// };


export const useForgetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      const res = await fetch(`${BASE_URL}/auth/password/forgot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to send reset link");
      }

      return result;
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async ({ newPassword, confirmPassword, token }: ResetPasswordPayload) => {
      const res = await fetch(`${BASE_URL}/auth/password/reset?token=${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword, confirmPassword }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to reset password");
      }

      return result;
    },
  });
};

export const useLoginUser = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ email, password }: INewUser) => {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
         credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Login failed");
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Login successful");
      navigate("/dashboard");
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Login failed. Please try again.");
      }
    },
  });
};

export const useGetTokenFromQuery = () => {
  return useMutation({
    mutationFn: async ({ token }: { token: string }) => {
      const res = await fetch(`${BASE_URL}/auth/set-cookie/?token=${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to set cookie");
      }
      return result;
    },
  });
};

export const useGetUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/auth/user`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
      });

      const result = await res.json();
      
      if (!res.ok) {
        throw new Error(result.message || "Failed to get user");
      }
      return result;
    },
  });
}

export async function logout() {
  try {
    const res = await fetch(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err?.message || 'Logout failed');
    }

    window.location.href = '/signin';
  } catch (error) {
    console.error('Logout error:', error);
    alert('Failed to log out');
  }
}
