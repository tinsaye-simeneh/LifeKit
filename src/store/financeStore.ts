"use client";

import { create } from "zustand";
import { Finance } from "@/types/models";

type FinanceStore = {
  finances: Finance[];
  setFinances: (finances: Finance[]) => void;
  addFinance: (finance: Finance) => void;
  updateFinance: (id: string, updates: Partial<Finance>) => void;
  deleteFinance: (id: string) => void;
  fetchFinances: () => void;
};

export const useFinanceStore = create<FinanceStore>((set) => ({
  finances: [],
  setFinances: (finances) => set({ finances }),
  addFinance: async (finance) => {
    const response = await fetch("/api/finance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finance),
    });

    if (response.ok) {
      const newFinance = await response.json();
      set((state) => ({ finances: [...state.finances, newFinance] }));
    }
  },
  updateFinance: async (id, updates) => {
    const response = await fetch(`/api/finance/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });

    if (response.ok) {
      const updatedFinance = await response.json();
      set((state) => ({
        finances: state.finances.map((finance) =>
          finance.id === id ? updatedFinance : finance
        ),
      }));
    }
  },
  deleteFinance: async (id) => {
    const response = await fetch(`/api/finance/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      set((state) => ({
        finances: state.finances.filter((finance) => finance.id !== id),
      }));
    }
  },
  fetchFinances: async () => {
    const response = await fetch("/api/finance");
    if (response.ok) {
      const finances = await response.json();
      set({ finances });
    }
  },
}));
