import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { colors } from '@/design-system/tokens';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // Require first name, last name, email, and password
    if (!firstName || !lastName || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    // Simulate successful registration
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-card border border-border rounded-xl shadow-md p-8 space-y-6 w-full max-w-md sm:w-[400px] md:w-[450px] lg:w-[500px]"
      >
        <Logo center />
        <h2 className="text-2xl font-bold mb-1 text-center" style={{ color: '#000' }}>
          Create Your Account
        </h2>
        <span className="text-sm text-muted-foreground mb-4 block text-center" style={{ maxWidth: 260, margin: '0 auto 1rem auto' }}>
          AI-powered pitch tools for African founders
        </span>
        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            placeholder="First Name"
            required
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            placeholder="Last Name"
            required
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
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
        <Button type="submit" className="w-full h-12 text-lg mt-2" style={{ background: colors.brand, color: '#fff' }}>
          Sign Up
        </Button>
        <div className="text-center text-sm mt-2">
          Already have an account?{' '}
          <Link to="/signin" className="text-primary hover:underline">
            Sign In
          </Link>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <Link to="/forgot-password" className="text-primary hover:underline">Forgot password?</Link>
        </div>
      </form>
    </div>
  );
} 