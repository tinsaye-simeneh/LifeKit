export type UUID = string;

export interface User {
  id: UUID;
  email: string;
  full_name: string;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: UUID;
  user_id: UUID;
  name: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "onProgress" | "completed";
  created_at: string;
  due_date?: string;
}

export interface Finance {
  id: UUID;
  user_id: UUID;
  amount: number;
  type: "expense" | "income";
  reason: string;
  date: string;
  payment_method: "cash" | "bank";
  remaining_balance: number;
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
  id: UUID;
  user_id: UUID;
  title: string;
  description: string;
  created_at: string;
  tags: string[];
}

export interface Goal {
  id: UUID;
  user_id: UUID;
  category: "skill" | "project" | "finance" | "personal";
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  status: "notStarted" | "onProgress" | "completed";
}

export interface PersonalNote {
  id: UUID;
  user_id: UUID;
  title?: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  user_id: UUID;
  bio: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
}
