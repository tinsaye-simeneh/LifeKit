import { create } from "zustand";
import { getSession, onAuthStateChange } from "../app/api/auth/route";

interface SessionState {
  session: {
    user: {
      email: string | null;
    };
  };
  setSession: (session: {
    user: {
      email: string | null;
    };
  }) => void;
  fetchSession: () => Promise<void>;
}

export const useSessionStore = create<SessionState>((set) => ({
  session: {
    user: {
      email: null,
    },
  },
  setSession: (session) => set({ session }),
  fetchSession: async () => {
    const session = await getSession();
    set({ session });
  },
}));

onAuthStateChange((newSession) => {
  useSessionStore.getState().setSession(newSession);
});
