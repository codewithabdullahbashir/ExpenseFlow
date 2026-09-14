const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
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

          <button className="w-full rounded-xl px-4 py-3 text-left text-slate-600 hover:bg-slate-100">
            ➕ Add Transaction
          </button>

          <button className="w-full rounded-xl px-4 py-3 text-left text-slate-600 hover:bg-slate-100">
            ⚙️ Settings
          </button>
        </nav>

        <button className="absolute bottom-8 left-6 text-slate-600">
          🚪 Log Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
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

            <span className="font-medium text-slate-700">Hello, Abdullah</span>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total Income</p>

            <h3 className="mt-2 text-3xl font-bold text-slate-800">$1,250</h3>

            <p className="mt-2 text-sm text-emerald-600">
              +12% from last month
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total Expenses</p>

            <h3 className="mt-2 text-3xl font-bold text-slate-800">$850</h3>

            <p className="mt-2 text-sm text-red-500">+5% from last month</p>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Balance</p>

            <h3 className="mt-2 text-3xl font-bold text-slate-800">$400</h3>

            <p className="mt-2 text-sm text-slate-500">Current balance</p>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Chart */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-800">
                  Monthly Overview
                </h3>

                <p className="text-sm text-slate-500">Income and expenses</p>
              </div>

              <div className="text-sm text-slate-500">
                🟢 Income &nbsp; 🔴 Expenses
              </div>
            </div>

            {/* Simple Chart */}
            <div className="flex h-64 items-end justify-around gap-4 border-b border-slate-200">
              <div className="flex h-full items-end gap-2">
                <div
                  className="w-6 rounded-t-lg bg-emerald-400"
                  style={{ height: "45%" }}
                ></div>
                <div
                  className="w-6 rounded-t-lg bg-red-300"
                  style={{ height: "30%" }}
                ></div>
              </div>

              <div className="flex h-full items-end gap-2">
                <div
                  className="w-6 rounded-t-lg bg-emerald-400"
                  style={{ height: "55%" }}
                ></div>
                <div
                  className="w-6 rounded-t-lg bg-red-300"
                  style={{ height: "38%" }}
                ></div>
              </div>

              <div className="flex h-full items-end gap-2">
                <div
                  className="w-6 rounded-t-lg bg-emerald-400"
                  style={{ height: "60%" }}
                ></div>
                <div
                  className="w-6 rounded-t-lg bg-red-300"
                  style={{ height: "40%" }}
                ></div>
              </div>

              <div className="flex h-full items-end gap-2">
                <div
                  className="w-6 rounded-t-lg bg-emerald-400"
                  style={{ height: "70%" }}
                ></div>
                <div
                  className="w-6 rounded-t-lg bg-red-300"
                  style={{ height: "48%" }}
                ></div>
              </div>

              <div className="flex h-full items-end gap-2">
                <div
                  className="w-6 rounded-t-lg bg-emerald-400"
                  style={{ height: "75%" }}
                ></div>
                <div
                  className="w-6 rounded-t-lg bg-red-300"
                  style={{ height: "55%" }}
                ></div>
              </div>

              <div className="flex h-full items-end gap-2">
                <div
                  className="w-6 rounded-t-lg bg-emerald-400"
                  style={{ height: "85%" }}
                ></div>
                <div
                  className="w-6 rounded-t-lg bg-red-300"
                  style={{ height: "60%" }}
                ></div>
              </div>
            </div>

            <div className="mt-3 flex justify-around text-sm text-slate-500">
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-xl font-semibold text-slate-800">
              Recent Transactions
            </h3>

            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-700">Grocery Shopping</p>
                  <p className="text-sm text-slate-400">Sep 11, 2025</p>
                </div>

                <span className="text-red-500">- $45</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-700">Uber Ride</p>
                  <p className="text-sm text-slate-400">Sep 09, 2025</p>
                </div>

                <span className="text-red-500">- $12.50</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-700">Salary</p>
                  <p className="text-sm text-slate-400">Sep 10, 2025</p>
                </div>

                <span className="text-emerald-600">+ $1,500</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-700">Electricity Bill</p>
                  <p className="text-sm text-slate-400">Sep 08, 2025</p>
                </div>

                <span className="text-red-500">- $80</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-700">Online Shopping</p>
                  <p className="text-sm text-slate-400">Sep 07, 2025</p>
                </div>

                <span className="text-red-500">- $65</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
