// src/lib/query.ts

export async function verifyEmaill(email: string) {
  const res = await fetch('https://gidipitch-backend.onrender.com/api/auth/init', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error('Failed to send magic link');
  return res.json();
}

export async function completeAuth({
  firstname,
  lastname,
  password,
  confirmPassword,
  token,
}: {
  firstname: string;
  lastname: string;
  password: string;
  confirmPassword: string;
  token: string;
}) {
  const res = await fetch(
    `https://gidipitch-backend.onrender.com/api/auth/local?token=${token}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstname, lastname, password, confirmPassword, token }),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.message || 'Failed to complete authentication');
  }

  return res.json();
}


export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const res = await fetch('https://gidipitch-backend.onrender.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || 'Login failed');
  }

  // ✅ Store token and user in localStorage for auth protection
  if (data.token && data.user) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }

  return data;
}


export async function forgotPassword(email: string): Promise<{ message: string }> {
  const response = await fetch('https://gidipitch-backend.onrender.com/api/auth/forgot-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong');
  }

  return response.json();
}


export async function resetPassword({
  password,
  confirmPassword,
  token,
}: {
  password: string;
  confirmPassword: string;
  token: string;
}) {
  const res = await fetch(
    'https://gidipitch-backend.onrender.com/api/auth/password/reset',
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, confirmPassword, token }),
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || 'Failed to reset password');
  }

  return res.json();
}


// lib/logout.ts
export async function logout() {
  try {
    const res = await fetch('https://gidipitch-backend.onrender.com/api/auth/logout', {
      method: 'POST',
      credentials: 'include', // important if you're using cookies for auth
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err?.message || 'Logout failed');
    }

    // Optional: Clear tokens from localStorage or cookies
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Optional: Redirect
    window.location.href = '/login';
  } catch (error) {
    console.error('Logout error:', error);
    alert('Failed to log out');
  }
}

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
