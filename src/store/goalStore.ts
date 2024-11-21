"use client";

import { create } from "zustand";
import { Goal } from "@/types/models";

type GoalStore = {
  goals: Goal[];
  setGoals: (goals: Goal[]) => void;
  addGoal: (goal: Goal) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  fetchGoals: (userId: string) => Promise<void>;
  fetchGoal: (id?: string) => Promise<Goal | undefined>;
};

export const useGoalStore = create<GoalStore>((set) => ({
  goals: [],

  setGoals: (goals) => set({ goals }),

  addGoal: async (goal) => {
    const response = await fetch("/api/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(goal),
    });

    if (response.ok) {
      const newGoal = await response.json();
      set((state) => ({ goals: [...state.goals, newGoal] }));
    }
  },

  updateGoal: async (id, updates) => {
    const response = await fetch(`/api/goals/update-goal?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (response.ok) {
      const updatedGoal = await response.json();
      set((state) => ({
        goals: state.goals.map((goal) => (goal.id === id ? updatedGoal : goal)),
      }));
    }
  },

  deleteGoal: async (id) => {
    const response = await fetch(`/api/goals/update-goal?id=${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      set((state) => ({
        goals: state.goals.filter((goal) => goal.id !== id),
      }));
    }
  },

  fetchGoals: async (userId) => {
    const response = await fetch(`/api/goals?user_id=${userId}`);
    if (response.ok) {
      const goals = await response.json();
      set({ goals });
    }
  },
  fetchGoal: async (id?: string) => {
    const response = await fetch(`/api/goals/get-goal?id=${id}`);
    if (response.ok) {
      return await response.json();
    }
  },
}));
