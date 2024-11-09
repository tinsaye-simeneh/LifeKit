import { create } from "zustand";
import { getSession, onAuthStateChange } from "../app/api/auth/route";
import { Session } from "@/types/models";

interface SessionState {
  session: Session | null | undefined;
  setSession: (session: Session | null | undefined) => void;
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

onAuthStateChange((newSession) => {
  useSessionStore.getState().setSession(newSession);
});
