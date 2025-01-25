"use client";

import { create } from "zustand";
import { Temp } from "@/types/models";

type TempStore = {
  temp: Temp[];
  setTemps: (temp: Temp[]) => void;
  addTemp: (temp: Temp) => void;
  updateTemp: (id: string, updates: Partial<Temp>) => void;
  deleteTemp: (id: string) => void;
  fetchTemps: (userId: string) => Promise<void>;
  fetchTemp: (id?: string) => Promise<Temp | undefined>;
};

export const useTempStore = create<TempStore>((set) => ({
  temp: [],
  setTemps: (temp) => set({ temp }),
  addTemp: async (temp) => {
    const response = await fetch("/api/temp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(temp),
    });

    if (response.ok) {
      const newTemp = await response.json();
      set((state) => ({ temp: [...state.temp, newTemp] }));
    }
  },
  updateTemp: async (id, updates) => {
    const response = await fetch(`/api/temp/update-temp?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });

    if (response.ok) {
      const updatedTemp = await response.json();
      set((state) => ({
        temp: state.temp.map((temp) => (temp.id === id ? updatedTemp : temp)),
      }));
    }
  },
  deleteTemp: async (id) => {
    const response = await fetch(`/api/temp/update-temp?id=${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      set((state) => ({
        temp: state.temp.filter((temp) => temp.id !== id),
      }));
    }
  },
  fetchTemps: async (userId) => {
    const response = await fetch(`/api/temp?user_id=${userId}`);
    const temp = await response.json();
    set({ temp });
  },
  fetchTemp: async (id) => {
    if (!id) return;
    const response = await fetch(`/api/temp/get-temp?id=${id}`);
    return await response.json();
  },
}));
