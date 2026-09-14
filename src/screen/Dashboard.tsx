import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../config/Firebase.js";
import { useAuthStore } from "../store/Authstore.js";
import type { Transaction } from "../types";

const Dashboard = () => {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;

    const transactionsQuery = query(
      collection(db, "transactions"),
      where("uid", "==", user.uid),
      orderBy("date", "desc"),
    );

    const unsubscribe = onSnapshot(
      transactionsQuery,
      (snapshot) => {
        const list = snapshot.docs.map((docItem) => ({
          id: docItem.id,
          ...docItem.data(),
        })) as Transaction[];
        setTransactions(list);
      },
      (error) => {
        console.error("Error loading transactions:", error);
      },
    );

    return () => unsubscribe();
  }, [user]);

  const resetForm = () => {
    setAmount("");
    setDescription("");
    setDate("");
    setType("expense");
  };

  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("User not authenticated");
      return;
    }

    if (!amount || !description || !date) {
      alert("Please fill in all fields: amount, description, and date");
      return;
    }

    if (Number(amount) <= 0) {
      alert("Amount must be greater than zero");
      return;
    }

    try {
      setSaving(true);

      await addDoc(collection(db, "transactions"), {
        uid: user.uid,
        amount: Number(amount),
        description: description,
        date: date,
        type: type,
        createdAt: serverTimestamp(),
      });

      resetForm();
      setShowModal(false);
    } catch (err) {
      console.log(err);
      alert("Something went wrong while saving. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed left-0 top-0 h-screen w-64 border-r bg-white p-6">
        <h1 className="mb-10 text-2xl font-bold text-slate-800">
          Expense<span className="text-emerald-600">Tracker</span>
        </h1>

        <nav className="space-y-3">
          <button className="w-full rounded-xl bg-emerald-100 px-4 py-3 text-left font-medium text-emerald-700">
            🏠 Dashboard
          </button>

          <button className="w-full rounded-xl px-4 py-3 text-left text-slate-600 hover:bg-slate-100">
            💳 Transactions
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="w-full rounded-xl px-4 py-3 text-left text-slate-600 hover:bg-slate-100"
          >
            ➕ Add Transaction
          </button>

          <button className="w-full rounded-xl px-4 py-3 text-left text-slate-600 hover:bg-slate-100">
            ⚙️ Settings
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="absolute bottom-8 left-6 text-slate-600 hover:text-slate-800"
        >
          🚪 Log Out
        </button>
      </aside>

      <main className="ml-64 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">Welcome back!</h2>
            <p className="mt-1 text-slate-500">
              Here's a quick overview of your finances.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
              👤
            </div>
            <span className="font-medium text-slate-700">
              Hello, {user?.displayName || user?.email}
            </span>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total Income</p>
            <h3 className="mt-2 text-3xl font-bold text-slate-800">
              ${totalIncome.toFixed(2)}
            </h3>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total Expenses</p>
            <h3 className="mt-2 text-3xl font-bold text-slate-800">
              ${totalExpense.toFixed(2)}
            </h3>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Balance</p>
            <h3 className="mt-2 text-3xl font-bold text-slate-800">
              ${balance.toFixed(2)}
            </h3>
            <p className="mt-2 text-sm text-slate-500">Current balance</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="mb-6 text-xl font-semibold text-slate-800">
            Recent Transactions
          </h3>

          {transactions.length === 0 && (
            <p className="text-slate-500">
              No transactions yet. Tap "Add Transaction" to get started.
            </p>
          )}

          <div className="space-y-5">
            {transactions.map((t) => (
              <div key={t.id} className="flex items-center justify-between">
                <div>
                  {/* Shows the description if one was entered, otherwise falls back to the type */}
                  <p className="font-medium capitalize text-slate-700">
                    {t.description}
                  </p>
                  <p className="text-sm text-slate-400">{t.date}</p>
                </div>

                <span
                  className={
                    t.type === "income" ? "text-emerald-600" : "text-red-500"
                  }
                >
                  {t.type === "income" ? "+" : "-"} ${t.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="mb-5 text-xl font-bold text-slate-800">
              Add Transaction
            </h3>

            <form onSubmit={handleAddTransaction} className="space-y-4">
              {/* Amount */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 50"
                  required
                  className="h-11 w-full rounded-lg border border-slate-200 px-3 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Description
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Grocery shopping"
                  required
                  className="h-11 w-full rounded-lg border border-slate-200 px-3 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="h-11 w-full rounded-lg border border-slate-200 px-3 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Type
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setType("income")}
                    className={`flex-1 rounded-lg border py-2 font-medium ${
                      type === "income"
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                        : "border-slate-200 text-slate-500"
                    }`}
                  >
                    Income
                  </button>

                  <button
                    type="button"
                    onClick={() => setType("expense")}
                    className={`flex-1 rounded-lg border py-2 font-medium ${
                      type === "expense"
                        ? "border-red-500 bg-red-50 text-red-600"
                        : "border-slate-200 text-slate-500"
                    }`}
                  >
                    Expense
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setShowModal(false);
                  }}
                  className="flex-1 rounded-lg border border-slate-200 py-2 font-medium text-slate-600"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-lg bg-emerald-600 py-2 font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
