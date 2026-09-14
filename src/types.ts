import type { User } from "firebase/auth";
export type AppUser = User | null;

export interface Transaction {
  id: string;
  uid: string;
  amount: number;
  description: string;
  date: string; 
  type: "income" | "expense";
  createdAt?: any;
}

export interface AuthState {
  user: AppUser;
  loading: boolean;
  setUser: (user: AppUser) => void;
}