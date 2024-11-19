"use client";

import { create } from "zustand";
import {
  getSession,
  onAuthStateChange,
  signInWithPassword,
  signUp,
} from "@/utils/auth";
import { Session } from "@/types/models";

interface SessionState {
  session: Session | null | undefined;
  setSession: (session: Session | null | undefined) => void;
  fetchSession: () => Promise<void>;
  signInStore: (email: string, password: string) => void;
  signUpStore: (email: string, password: string) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  session: null,
  setSession: (session) => set({ session }),
  fetchSession: async () => {
    const session = await getSession();
    set({ session });
  },
  signInStore: async (email, password) => {
    await signInWithPassword(email, password);
    set({ session: await getSession() });
  },
  signUpStore: async (email, password) => {
    await signUp(email, password);
  },
}));

onAuthStateChange((newSession) => {
  useSessionStore.getState().setSession(newSession);
});
