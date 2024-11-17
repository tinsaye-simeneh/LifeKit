"use client";

import { create } from "zustand";
import {
  getSession,
  onAuthStateChange,
  signInWithPassword,
  signUp,
} from "../app/api/auth/route";
import { Session } from "@/types/models";

interface SessionState {
  session: Session | null | undefined;
  setSession: (session: Session | null | undefined) => void;
  fetchSession: () => Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signInStore: (email: string, password: string) => Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signUpStore: (email: string, password: string) => Promise<any>;
}

export const useSessionStore = create<SessionState>((set) => ({
  session: null,
  setSession: (session) => set({ session }),
  fetchSession: async () => {
    const session = await getSession();
    set({ session });
  },
  signInStore: async (email, password) => {
    const { data, error } = await signInWithPassword(email, password);
    if (error) {
      console.error("Error signing in:", error.message);
    } else {
      set({ session: data.session });
    }
  },
  signUpStore: async (email, password) => {
    const { data, error } = await signUp(email, password);
    if (error) {
      console.error("Error signing up:", error.message);
    } else {
      set({ session: data.session });
    }
  },
}));

onAuthStateChange((newSession) => {
  useSessionStore.getState().setSession(newSession);
});
