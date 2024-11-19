"use client";

import { create } from "zustand";
import { Idea } from "@/types/models";

type IdeaStore = {
  ideas: Idea[];
  setIdeas: (ideas: Idea[]) => void;
  addIdea: (idea: Idea) => void;
  updateIdea: (id: string, updates: Partial<Idea>) => void;
  deleteIdea: (id: string) => void;
  fetchIdeas: (userId: string) => Promise<void>;
  fetchIdea: (id?: string) => Promise<Idea | undefined>;
};

export const useIdeaStore = create<IdeaStore>((set) => ({
  ideas: [],

  setIdeas: (ideas) => set({ ideas }),

  addIdea: async (idea) => {
    const response = await fetch("/api/ideas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(idea),
    });

    if (response.ok) {
      const newIdea = await response.json();
      set((state) => ({ ideas: [...state.ideas, newIdea] }));
    }
  },

  updateIdea: async (id, updates) => {
    const response = await fetch(`/api/ideas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (response.ok) {
      const updatedIdea = await response.json();
      set((state) => ({
        ideas: state.ideas.map((idea) => (idea.id === id ? updatedIdea : idea)),
      }));
    }
  },

  deleteIdea: async (id) => {
    const response = await fetch(`/api/ideas/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      set((state) => ({
        ideas: state.ideas.filter((idea) => idea.id !== id),
      }));
    }
  },

  fetchIdeas: async (userId) => {
    const response = await fetch(`/api/ideas?user_id=${userId}`);
    if (response.ok) {
      const ideas = await response.json();
      set({ ideas });
    }
  },
  fetchIdea: async (id?: string) => {
    const response = await fetch(`/api/ideas/${id}`);
    if (response.ok) {
      return await response.json();
    }
  },
}));
