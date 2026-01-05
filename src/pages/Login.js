import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff, Lock, Mail, Loader2 } from "lucide-react";
import { loginUser } from "../lib/auth"; // assuming you have the auth logic like described before

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      loginUser(email, password); // Mock login function
      navigate("/dashboard"); // Redirect to dashboard after login
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-50 to-zinc-100 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200 p-6 sm:p-8">
        <h1 className="text-2xl font-semibold text-zinc-900">Sign in</h1>
        <p className="mt-1 text-sm text-zinc-600">Access Provider Management</p>

        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-zinc-600 hover:bg-zinc-50"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </label>

          <button
            disabled={loading}
            className="w-full rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 disabled:opacity-60"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing in…
              </span>
            ) : (
              "Sign in"
            )}
          </button>

          <p className="text-center text-sm text-zinc-600">
            Don’t have an account?{" "}
            <a href="/register" className="font-medium text-zinc-900 hover:underline">
              Create one
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
