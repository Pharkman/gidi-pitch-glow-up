import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { colors } from '@/design-system/tokens';
import { Link, useSearchParams } from 'react-router-dom';
import Logo from '@/components/Logo';
import { resetPassword } from '@/lib/query';
import { toast } from '@/components/ui/use-toast';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!token) {
      setError('Missing or invalid token.');
      return;
    }

    setLoading(true);

    try {
      await resetPassword({ password, confirmPassword, token });
      setMessage('Your password has been reset. You can now sign in.');
       toast({ title: 'Password reset successful!', description: 'You can now sign in with your new password.' });
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      toast({ title: 'Error', description: err.message || 'Failed to reset password', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-card border border-border rounded-xl shadow-md p-8 space-y-6 w-full max-w-md sm:w-[400px] md:w-[450px] lg:w-[500px]"
      >
        <Logo center />
        <h2 className="text-2xl font-bold mb-1 text-center" style={{ color: '#000' }}>
          Reset Password
        </h2>
        <span className="text-sm text-muted-foreground mb-4 block text-center" style={{ maxWidth: 260, margin: '0 auto 1rem auto' }}>
          AI-powered pitch tools for African founders
        </span>
        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        {message && <div className="text-green-600 text-sm text-center">{message}</div>}
        <div>
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="mt-1"
          />
        </div>
        <Button type="submit" className="w-full h-12 text-lg mt-2" style={{ background: colors.brand, color: '#fff' }} disabled={loading}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </Button>
        <div className="flex justify-between text-sm mt-2">
          <Link to="/signin" className="text-primary hover:underline">Sign In</Link>
          <Link to="/signup" className="text-primary hover:underline">Sign Up</Link>
        </div>
      </form>
    </div>
  );
}
