// stores/sessionStore.ts
import { create } from "zustand";
import { getSession, onAuthStateChange } from "@/api/auth";

interface SessionState {
  session: any;
  setSession: (session: any) => void;
  fetchSession: () => Promise<void>;
}

export const useSessionStore = create<SessionState>((set) => ({
  session: null,
  setSession: (session) => set({ session }),
  fetchSession: async () => {
    const session = await getSession();
    set({ session });
  },
}));

// Initialize auth state change listener
onAuthStateChange((newSession) => {
  useSessionStore.getState().setSession(newSession);
});
