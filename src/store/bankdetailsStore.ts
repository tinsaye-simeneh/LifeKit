"use client";

import { create } from "zustand";
import { BankDetails } from "@/types/models";

type BankDetailsStore = {
  bankDetails: BankDetails[];
  setBankDetails: (bankDetails: BankDetails[]) => void;
  addBankDetail: (bankDetail: BankDetails) => void;
  updateBankDetail: (id: string, updates: Partial<BankDetails>) => void;
  deleteBankDetail: (id: string) => void;
  fetchBankDetails: (userId?: string) => Promise<void>;
  fetchBankDetail: (id: string) => Promise<BankDetails>;
};

export const useBankDetailsStore = create<BankDetailsStore>((set) => ({
  bankDetails: [],
  setBankDetails: (bankDetails) => set({ bankDetails }),

  addBankDetail: async (bankDetail) => {
    const response = await fetch("/api/bank-details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bankDetail),
    });

    if (response.ok) {
      const newBankDetail = await response.json();
      set((state) => ({ bankDetails: [...state.bankDetails, newBankDetail] }));
    }
  },

  updateBankDetail: async (id, updates) => {
    const response = await fetch(
      `/api/bank-details/update-bankdetail?id=${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      }
    );

    if (response.ok) {
      const updatedBankDetail = await response.json();
      set((state) => ({
        bankDetails: state.bankDetails.map((bankDetail) =>
          bankDetail.id === id ? updatedBankDetail : bankDetail
        ),
      }));
    }
  },

  deleteBankDetail: async (id) => {
    const response = await fetch(
      `/api/bank-details/update-bankdetail?id=${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      set((state) => ({
        bankDetails: state.bankDetails.filter(
          (bankDetail) => bankDetail.id !== id
        ),
      }));
    }
  },

  fetchBankDetails: async (userId) => {
    const response = await fetch(`/api/bank-details?user_id=${userId}`);
    if (response.ok) {
      const bankDetails = await response.json();
      set({ bankDetails });
    }
  },

  fetchBankDetail: async (id: string) => {
    const response = await fetch(`/api/bank-details/get-bankdetail?id=${id}`);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch bank detail");
    }
  },
}));
