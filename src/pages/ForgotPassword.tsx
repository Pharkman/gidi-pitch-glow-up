import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { colors } from "@/design-system/tokens";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import { useForgetPassword } from "@/lib/query";
import Spinner from "@/components/spinner";
import { toast } from "@/components/ui/use-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  
  // ✅ Correctly use the hook
  const { mutateAsync: forgetPassword, isPending } = useForgetPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    try {
      const res = await forgetPassword(email);

      toast({
        title: "Reset password email sent!",
        description: "Please check your inbox for the reset link.",
      });

      setMessage(
        res.message ||
          "If an account exists for this email, a reset link has been sent."
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-card border border-border rounded-xl shadow-md p-8 space-y-6 w-full max-w-md sm:w-[400px] md:w-[450px] lg:w-[500px]"
      >
        <Logo center />
        <h2
          className="text-3xl font-bold mb-1 text-center"
          style={{ color: "#000" }}
        >
          Forgot Password
        </h2>
        <span
          className="text-sm text-muted-foreground mb-4 block text-center"
          style={{ maxWidth: 260, margin: "0 auto 1rem auto" }}
        >
          AI-powered pitch tools for African founders
        </span>

        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        {message && (
          <div className="text-green-600 text-sm text-center">{message}</div>
        )}

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="mt-1"
          />
        </div>

        <Button
          type="submit"
          className="w-full h-12 text-lg mt-2"
          style={{ background: colors.brand, color: "#fff" }}
          disabled={isPending}
        >
          {isPending ? <Spinner /> : "Reset Password"}
        </Button>

        <div className="flex justify-between text-sm mt-2">
          <Link to="/reset-password" className="text-primary hover:underline">
            Reset password
          </Link>
          <Link to="/signup" className="text-primary hover:underline">
            Sign Up
          </Link>
        </div>

        <div className="text-center text-sm mt-2">
          <Link to="/signin" className="text-primary hover:underline">
            Back to Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
