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

export async function completeAuth({ username, password, token }: { username: string; password: string; token: string }) {
  const res = await fetch('https://gidipitch-backend.onrender.com/auth/complete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, token }),
  });
  if (!res.ok) throw new Error('Failed to complete authentication');
  return res.json();
} 