import { create } from "zustand";
import { Idea } from "@/types/models";

type IdeaStore = {
  ideas: Idea[];
  setIdeas: (ideas: Idea[]) => void;
  addIdea: (idea: Idea) => Promise<void>;
  updateIdea: (id: string, updates: Partial<Idea>) => Promise<void>;
  deleteIdea: (id: string) => Promise<void>;
  fetchIdeas: () => Promise<void>;
};

export const useIdeaStore = create<IdeaStore>((set) => ({
  ideas: [],

  setIdeas: (ideas) => set({ ideas }),

  addIdea: async (idea) => {
    try {
      const response = await fetch("/api/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(idea),
      });

      if (!response.ok) {
        throw new Error("Failed to add idea");
      }

      const newIdea = await response.json();
      set((state) => ({ ideas: [...state.ideas, newIdea] }));
    } catch (error) {
      console.error(error);
    }
  },

  updateIdea: async (id, updates) => {
    try {
      const response = await fetch(`/api/ideas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error("Failed to update idea");
      }

      const updatedIdea = await response.json();
      set((state) => ({
        ideas: state.ideas.map((idea) => (idea.id === id ? updatedIdea : idea)),
      }));
    } catch (error) {
      console.error(error);
    }
  },

  deleteIdea: async (id) => {
    try {
      const response = await fetch(`/api/ideas/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete idea");
      }

      set((state) => ({
        ideas: state.ideas.filter((idea) => idea.id !== id),
      }));
    } catch (error) {
      console.error(error);
    }
  },

  fetchIdeas: async () => {
    try {
      const response = await fetch("/api/ideas");
      if (!response.ok) {
        throw new Error("Failed to fetch ideas");
      }

      const ideas = await response.json();
      set({ ideas });
    } catch (error) {
      console.error(error);
    }
  },
}));
