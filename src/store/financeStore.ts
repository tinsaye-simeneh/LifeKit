"use client";

import { create } from "zustand";
import { Finance } from "@/types/models";

type FinanceStore = {
  finances: Finance[];
  setFinances: (finances: Finance[]) => void;
  addFinance: (finance: Finance) => void;
  updateFinance: (id: string, updates: Partial<Finance>) => void;
  deleteFinance: (id: string) => void;
  fetchFinances: (userId?: string) => Promise<void>;
  //eslint-disable-next-line
  fetchFinance: (id: string) => Promise<any>;
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
    const response = await fetch(`/api/finance/update-finance?id=${id}`, {
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
  fetchFinances: async (userId) => {
    const response = await fetch(`/api/finance?user_id=${userId}`);
    if (response.ok) {
      const finances = await response.json();
      set({ finances });
    }
  },
  fetchFinance: async (id: string) => {
    const response = await fetch(`/api/finance/get-finance?id=${id}`, {
      method: "GET",
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch finance data");
    }
  },
}));
