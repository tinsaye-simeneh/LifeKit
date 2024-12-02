export interface Session {
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  refresh_token?: string;
  user?: {
    id?: UUID;
    username?: string;
    email?: string;
    role?: string;
    email_confirmed_at?: string;
    last_sign_in_at?: string;
    app_metadata?: {
      provider?: string;
      providers?: string[];
    };
    user_metadata?: {
      email?: string;
      email_verified?: boolean;
      phone_verified?: boolean;
      sub?: UUID;
    };
  };
}

export type UUID = string;

export interface AuthFunctions {
  signUp: (email: string, password: string) => Promise<Session | null>;
  signInWithPassword: (
    email: string,
    password: string
  ) => Promise<Session | null>;
  signOut: () => Promise<void>;
}

export interface User {
  id?: UUID;
  email?: string;
  username?: string;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id?: UUID;
  user_id?: UUID;
  name?: string;
  priority?: "high" | "medium" | "low";
  status?: "pending" | "onProgress" | "completed";
  created_at?: string;
  due_date?: string;
  description?: string;
}

export interface Finance {
  id: UUID;
  user_id?: UUID;
  amount: number;
  type: "expense" | "income";
  reason: string;
  date: string;
  payment_method: "cash" | "bank";
  bank_name?: string;
}

export interface MonthlyExpense {
  id: UUID;
  user_id: UUID;
  month: string;
  year: number;
  total_expense: number;
  total_income: number;
  net_savings: number;
}

export interface Idea {
  id?: UUID;
  user_id?: UUID;
  title?: string;
  description?: string;
  created_at?: string;
}

export interface Goal {
  id?: UUID;
  user_id?: UUID;
  category?: "skill" | "project" | "finance" | "personal";
  title?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  status?: "notStarted" | "onProgress" | "completed";
}

export interface PersonalNote {
  id?: UUID;
  user_id?: UUID;
  title: string;
  content: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserProfile {
  user_id: UUID;
  bio: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
}
