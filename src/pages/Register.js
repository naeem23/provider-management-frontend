import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff, Lock, Mail, User, Loader2 } from "lucide-react";
import { registerUser } from "../lib/auth";

export default function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function onSubmit(e) {
    e.preventDefault();
    setError(null);

    if (password.length < 8) return setError("Password must be at least 8 characters.");
    if (password !== confirmPassword) return setError("Passwords do not match.");
    if (!agree) return setError("You must accept the terms.");

    setLoading(true);
    try {
      registerUser(fullName, email, password);
      navigate("/login");
    } catch (err) {
      setError(err?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-zinc-50 to-zinc-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200 p-6 sm:p-8">
        <h1 className="text-2xl font-semibold text-zinc-900">Create account</h1>
        <p className="mt-1 text-sm text-zinc-600">Register to access Provider Management</p>

        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-zinc-800">Full name</span>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <input
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 px-10 py-2.5 text-sm outline-none focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100"
                placeholder="Your name"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-zinc-800">Email</span>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 px-10 py-2.5 text-sm outline-none focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100"
                placeholder="name@example.com"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-zinc-800">Password</span>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 px-10 pr-10 py-2.5 text-sm outline-none focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100"
                placeholder="At least 8 characters"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-zinc-600 hover:bg-zinc-50"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-zinc-800">Confirm password</span>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 px-10 pr-10 py-2.5 text-sm outline-none focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100"
                placeholder="Re-enter password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-zinc-600 hover:bg-zinc-50"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </label>

          <label className="flex items-start gap-2 text-sm text-zinc-700">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-zinc-300"
            />
            <span>I agree to the Terms and Privacy Policy.</span>
          </label>

          <button
            disabled={loading}
            className="w-full rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 disabled:opacity-60"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating…
              </span>
            ) : (
              "Create account"
            )}
          </button>

          <p className="text-center text-sm text-zinc-600">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-zinc-900 hover:underline">
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
