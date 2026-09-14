# 💸 ExpenseFlow

A simple, beginner-friendly expense tracker built with **React + TypeScript**, styled with **Tailwind CSS**, backed by **Firebase** (Authentication + Firestore), and using **Zustand** for global state management.

Track your income and expenses, see your balance update in real time, and keep your data private and secure — all logged in with your own account.

---

## ✨ Features

- 🔐 **Email/password authentication** (sign up, log in, log out) via Firebase Auth
- 🛡️ **Protected & public routes** — logged-out users can't reach the dashboard, logged-in users can't revisit login/signup
- 🌍 **Global auth state** via Zustand — no prop drilling, no duplicate auth checks per screen
- 💰 **Add transactions** (amount, description, date, income/expense) through a popup modal
- 📡 **Real-time dashboard** — transactions and totals update live from Firestore, no page refresh needed
- 🔒 **Firestore security rules** — every user can only read/write their own data
- 📱 Clean, responsive UI built with Tailwind CSS

---

## 🧱 Tech Stack

| Layer            | Technology                          |
|-------------------|--------------------------------------|
| Frontend          | React + TypeScript (Vite)           |
| Styling           | Tailwind CSS                        |
| Routing           | React Router                        |
| State Management  | Zustand                             |
| Authentication    | Firebase Authentication             |
| Database          | Cloud Firestore                     |
| Icons             | lucide-react                        |

---

## 📁 Project Structure

```
src/
├── assets/                # Images used in the UI
├── config/
│   └── Firebase.js        # Firebase project connection (auth + Firestore)
├── routes/
│   ├── Protectedroute.tsx # Blocks logged-out users from protected pages
│   └── Publicroute.tsx    # Blocks logged-in users from public-only pages
├── screen/
│   ├── Home.tsx           # Landing page
│   ├── Login.tsx          # Login screen
│   ├── Signup.tsx         # Sign up screen
│   └── Dashboard.tsx      # Main app screen (transactions, totals, logout)
├── store/
│   └── Authstore.ts       # Zustand store holding the logged-in user
├── types.ts                # Shared TypeScript types (User, Transaction, etc.)
└── App.tsx                 # Route definitions and auth listener
```

---

## 🔄 How the App Works — Full Flow

### 1. App starts → auth listener kicks in
When the app loads, `App.tsx` attaches a single Firebase listener (`onAuthStateChanged`) that watches whether someone is logged in or not. Every time that status changes, it updates one global Zustand store (`useAuthStore`). Every screen reads from this same store — nobody re-checks Firebase individually.

### 2. Routing decides what you see
Every route in `App.tsx` is wrapped in one of two guards:

- **`PublicRoute`** — wraps `/`, `/login`, `/signup`. If you're already logged in, it redirects you straight to `/dashboard` instead of showing these pages.
- **`ProtectedRoute`** — wraps `/dashboard`. If you're *not* logged in, it redirects you to `/login`.

This means a logged-out user physically cannot reach the dashboard by typing the URL, and a logged-in user can't accidentally sit on the login page.

### 3. Signing up
`Signup.tsx` collects a name, email, and password, then calls Firebase's `createUserWithEmailAndPassword`. On success, it saves the name to the user's Firebase profile and sends them to `/dashboard`. The auth listener from step 1 picks up the new session automatically.

### 4. Logging in
`Login.tsx` calls `signInWithEmailAndPassword`. If the credentials are wrong, Firebase returns an error which is shown inline. On success, the user is redirected to `/dashboard`.

### 5. The Dashboard — reading data
Once on the dashboard, a Firestore query runs:

```ts
query(
  collection(db, "transactions"),
  where("uid", "==", user.uid),
  orderBy("date", "desc")
)
```

This is wrapped in `onSnapshot`, which means it's a **live listener** — any time a transaction is added, edited, or removed in Firestore, the dashboard updates instantly without a manual refresh. Totals (income, expenses, balance) are calculated on the fly from whatever transactions are currently loaded.

### 6. Adding a transaction
Tapping **"Add Transaction"** opens a popup with three required fields — amount, description, and date — plus an Income/Expense toggle. On submit, it calls Firestore's `addDoc`, saving the transaction tagged with the current user's `uid`. Because of the live listener from step 5, the new transaction and updated totals appear on screen immediately.

### 7. Logging out
Tapping **"Log Out"** calls Firebase's `signOut`, which clears the session. The auth listener detects this, updates the Zustand store, and `ProtectedRoute` immediately redirects away from the dashboard to `/login`.

---

## 🧭 How to Use the App (End User Guide)

### 1. Create an account
- Open the app — you'll land on the **Home** page.
- Click **"Get Started"**, then **"Create an account"** on the login page.
- Fill in your full name, email, username, and a password, agree to the terms, and click **Sign Up**.
- You'll be taken straight to your **Dashboard**.

### 2. Log in (if you already have an account)
- From the Home page, click **"Get Started"**.
- Enter your email and password and click **Login**.
- You'll land on your Dashboard.

### 3. View your dashboard
As soon as you log in, you'll see:
- **Total Income**, **Total Expenses**, and **Balance** cards at the top
- A **Recent Transactions** list below, showing every transaction you've added, newest first

If you haven't added anything yet, it'll simply say *"No transactions yet."*

### 4. Add a transaction
- Click **"➕ Add Transaction"** in the sidebar.
- A popup appears with four fields:
  - **Amount** — how much money (e.g. 50)
  - **Description** — what it was for (e.g. "Grocery shopping")
  - **Date** — pick the date it happened
  - **Type** — choose **Income** (money coming in) or **Expense** (money going out)
- Click **Save**.
- The popup closes and your new transaction appears instantly at the top of the list — your totals update automatically too.

To cancel without saving, click **Cancel** — nothing is added.

### 5. Track your balance
Your **Balance** is simply Total Income minus Total Expenses, recalculated every time you add a transaction. A rising balance means you're saving more than you're spending.

### 6. Log out
- Click **"🚪 Log Out"** at the bottom of the sidebar.
- You're signed out and taken back to the Login page.
- Your data isn't lost — everything is safely stored under your account, so it'll all be there the next time you log back in.

### 7. Trying to skip a step?
- If you're not logged in and try to visit the dashboard directly, you'll be sent to the Login page instead.
- If you're already logged in and try to visit the Login or Sign Up page, you'll be sent straight to your Dashboard instead — no need to log in twice.

---

## 🔒 Firestore Security Rules

Every transaction document is only readable/writable by the user who created it:

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /transactions/{transactionId} {
      allow read, update, delete: if request.auth != null
                                    && resource.data.uid == request.auth.uid;
      allow create: if request.auth != null
                     && request.resource.data.uid == request.auth.uid;
    }
  }
}
```

---

## ⚙️ Getting Started

### 1. Clone and install
```bash
git clone <your-repo-url>
cd ExpenseFlow
npm install
```

### 2. Set up Firebase
1. Create a project at [console.firebase.google.com](https://console.firebase.google.com)
2. Register a web app and copy the config object into `src/config/Firebase.js`
3. Enable **Authentication → Sign-in method → Email/Password**
4. Create a **Firestore Database**
5. Paste the security rules above into **Firestore → Rules** and publish

### 3. Create the required Firestore index
Firestore needs a composite index for the dashboard's query (filtering by `uid` + sorting by `date`). Either:
- Run the app, try to load the dashboard, and click the index-creation link that appears in your browser console, **or**
- Manually create one under **Firestore → Indexes**: Collection `transactions`, fields `uid` (Ascending) + `date` (Descending)

### 4. Run the app
```bash
npm run dev
```

---

## 🗺️ Routes Summary

| Route         | Access           | Screen       |
|---------------|------------------|--------------|
| `/`           | Logged-out only  | Home         |
| `/login`      | Logged-out only  | Login        |
| `/signup`     | Logged-out only  | Signup       |
| `/dashboard`  | Logged-in only   | Dashboard    |
| any other path| —               | Redirects to `/` |

---

## 📌 Notes

- Firestore is currently open in **test mode security + custom rules** — review and tighten the rules above before deploying publicly.
- The Firebase config values in `Firebase.js` are safe to be public — Firebase's real protection comes from the security rules, not from hiding the API key.
