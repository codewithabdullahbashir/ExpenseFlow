import { useState } from "react";
import {
  Wallet,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  BarChart3,
  ShieldCheck,
  Target,
} from "lucide-react";

import expense from "../assets/expense.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Login clicked");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl overflow-hidden rounded-3xl bg-white shadow-xl md:min-h-[calc(100vh-4rem)]">
        <div className="relative hidden w-1/2 overflow-hidden bg-emerald-50 p-10 lg:block">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-emerald-100" />

          <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-emerald-100" />

          <div className="relative z-10 flex h-full flex-col">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg">
                <Wallet size={30} />
              </div>

              <h1 className="text-3xl font-bold text-slate-900">
                Expense<span className="text-emerald-500">Tracker</span>
              </h1>
            </div>

            {/* Tagline */}
            <div className="mt-10">
              <h2 className="max-w-md text-4xl font-bold leading-tight text-slate-900">
                Track your expenses,
                <br />
                build better habits,
                <br />
                achieve your goals.
              </h2>

              <p className="mt-5 max-w-md text-lg leading-8 text-slate-500">
                Take control of your money and make smarter financial decisions
                every day.
              </p>
            </div>

            {/* Illustration */}
            <div className="relative mx-auto mt-8 flex h-full w-full max-w-md items-end justify-center">
              <img
                src={expense}
                alt="Expense tracker"
                className="h-full w-full object-contain"
              />
            </div>

            {/* Features */}
            <div className="mt-auto grid grid-cols-3 gap-5 pt-8">
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <BarChart3 size={23} />
                </div>

                <h3 className="mt-3 font-semibold text-slate-800">
                  Easy Tracking
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Know where your money goes
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <ShieldCheck size={23} />
                </div>

                <h3 className="mt-3 font-semibold text-slate-800">Secure</h3>

                <p className="mt-1 text-sm text-slate-500">
                  Your data is safe with us
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Target size={23} />
                </div>

                <h3 className="mt-3 font-semibold text-slate-800">
                  Reach Goals
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Save more, live better
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex w-full flex-col p-6 sm:p-10 md:p-14 lg:w-1/2">
          {/* Sign Up */}
          <div className="flex justify-end text-sm text-slate-500">
            <span>Don't have an account?</span>

            <button className="ml-2 font-semibold text-emerald-600 hover:text-emerald-700">
              Sign Up
              <ArrowRight className="ml-1 inline-block" size={16} />
            </button>
          </div>

          {/* Login Content */}
          <div className="mx-auto my-auto w-full max-w-md">
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-slate-900">
                Welcome Back 👋
              </h2>

              <p className="mt-3 text-base leading-7 text-slate-500">
                Login to your account and continue
                <br />
                tracking your expenses.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-slate-200 bg-white py-4 pl-12 pr-12 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Login */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-emerald-500 py-4 font-semibold text-white shadow-lg shadow-emerald-100 transition hover:bg-emerald-600 active:scale-[0.99]"
              >
                Login
                <ArrowRight size={20} />
              </button>
            </form>

            {/* Divider */}
            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />

              <span className="text-sm text-slate-400">OR</span>

              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Create Account */}
            <p className="mt-8 text-center text-sm text-slate-500">
              New here?
              <button className="ml-2 font-semibold text-emerald-600 hover:text-emerald-700">
                Create an account
                <ArrowRight className="ml-1 inline-block" size={15} />
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
