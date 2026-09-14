import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import type { FirebaseError } from "firebase/app";
import { auth } from "../config/Firebase";

const SignUp = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName || !email || !username || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!agreed) {
      setError("Please agree to the Terms & Conditions");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await updateProfile(userCredential.user, { displayName: fullName });
      navigate("/dashboard");
    } catch (err: unknown) {
      console.log(err);
      const firebaseErr = err as FirebaseError;
      if (firebaseErr.code === "auth/email-already-in-use") {
        setError("An account with this email already exists");
      } else {
        setError("Could not create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <div className="hidden lg:flex lg:w-1/2 bg-emerald-50 px-16 py-12 flex-col">
        <div className="flex items-center gap-2">
          <div className="text-4xl">🌿</div>
          <h1 className="text-2xl font-bold text-emerald-900">
            Expense<span className="text-emerald-600">Tracker</span>
          </h1>
        </div>

        <div className="mt-32">
          <h2 className="text-5xl font-bold leading-tight text-emerald-950">
            Take Control of
            <br />
            Your Money
          </h2>

          <p className="mt-6 max-w-md text-lg leading-8 text-slate-600">
            Track your expenses, set budgets, and build better financial habits.
          </p>

          <div className="mt-14 space-y-8">
            <div className="flex items-center gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl">
                📊
              </div>
              <div>
                <h3 className="font-semibold text-emerald-950">
                  Track Expenses
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  See where your money goes in real time.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl">
                💳
              </div>
              <div>
                <h3 className="font-semibold text-emerald-950">Set Budgets</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Stay on track with your monthly goals.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl">
                🛡️
              </div>
              <div>
                <h3 className="font-semibold text-emerald-950">
                  Secure & Private
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Your data is safe with us.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto text-xl italic text-emerald-700">
          Small steps
          <br />
          towards big goals 🌿
        </div>
      </div>

      <div className="flex w-full lg:w-1/2 items-center justify-center px-5 py-10">
        <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-xl sm:p-10">
          <div className="text-center">
            <div className="text-5xl">🌿</div>
            <h2 className="mt-4 text-3xl font-bold text-emerald-950">
              Create Your Account
            </h2>
            <p className="mx-auto mt-3 max-w-md text-slate-500">
              Start tracking your expenses and reach your financial goals today.
            </p>
          </div>
          {error && (
            <div className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSignUp} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="h-12 w-full rounded-lg border border-slate-200 px-4 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="h-12 w-full rounded-lg border border-slate-200 px-4 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
                className="h-12 w-full rounded-lg border border-slate-200 px-4 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="h-12 w-full rounded-lg border border-slate-200 px-4 pr-12 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="h-12 w-full rounded-lg border border-slate-200 px-4 pr-12 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <input
                id="terms"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 h-4 w-4 accent-emerald-600"
              />
              <label htmlFor="terms" className="text-sm text-slate-500">
                I agree to the{" "}
                <a href="#" className="font-semibold text-emerald-600">
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="font-semibold text-emerald-600">
                  Privacy Policy
                </a>
              </label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-lg bg-emerald-600 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>

            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-sm text-slate-400">OR</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <button
              type="button"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-slate-200 font-medium text-slate-600 transition hover:bg-slate-50"
            >
              <span className="font-bold text-blue-500">G</span>
              Continue with Google
            </button>

            <p className="pt-3 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="font-semibold text-emerald-600 hover:text-emerald-700"
              >
                Log In
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
