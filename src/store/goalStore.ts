import { create } from "zustand";
import { Goal } from "@/types/models";

type GoalStore = {
  goals: Goal[];
  setGoals: (goals: Goal[]) => void;
  addGoal: (goal: Goal) => Promise<void>;
  updateGoal: (id: string, updates: Partial<Goal>) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;
  fetchGoals: () => Promise<void>;
};

export const useGoalStore = create<GoalStore>((set) => ({
  goals: [],

  setGoals: (goals) => set({ goals }),

  addGoal: async (goal) => {
    try {
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(goal),
      });

      if (!response.ok) {
        throw new Error("Failed to add goal");
      }

      const newGoal = await response.json();
      set((state) => ({ goals: [...state.goals, newGoal] }));
    } catch (error) {
      console.error(error);
    }
  },

  updateGoal: async (id, updates) => {
    try {
      const response = await fetch(`/api/goals/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error("Failed to update goal");
      }

      const updatedGoal = await response.json();
      set((state) => ({
        goals: state.goals.map((goal) => (goal.id === id ? updatedGoal : goal)),
      }));
    } catch (error) {
      console.error(error);
    }
  },

  deleteGoal: async (id) => {
    try {
      const response = await fetch(`/api/goals/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete goal");
      }

      set((state) => ({
        goals: state.goals.filter((goal) => goal.id !== id),
      }));
    } catch (error) {
      console.error(error);
    }
  },

  fetchGoals: async () => {
    try {
      const response = await fetch("/api/goals");
      if (!response.ok) {
        throw new Error("Failed to fetch goals");
      }

      const goals = await response.json();
      set({ goals });
    } catch (error) {
      console.error(error);
    }
  },
}));
