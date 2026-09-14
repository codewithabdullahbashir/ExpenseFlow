import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-emerald-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-sm">
        {/* Logo */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-4xl">
          🌿
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-slate-800">
          Expense<span className="text-emerald-600">Tracker</span>
        </h1>

        <h2 className="mt-8 text-2xl font-bold text-slate-800">
          Take Control of Your Money
        </h2>

        <p className="mt-3 text-slate-500">
          Track your expenses, manage your budget, and build better financial
          habits.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/login")}
          className="mt-8 w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700"
        >
          Get Started
        </button>

        <p className="mt-5 text-sm text-slate-400">
          Simple • Secure • Easy to use
        </p>
      </div>
    </div>
  );
};

export default Home;
