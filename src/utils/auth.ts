import { supabase } from "./supabase";
import { Session } from "@/types/models";

export const signUp = async (email: string, password: string) => {
  return await supabase.auth.signUp({ email, password });
};

export const signInWithPassword = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password });
};

export const getSession = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session;
};

export const onAuthStateChange = (
  callback: (session: Session | null) => void
) => {
  return supabase.auth.onAuthStateChange((_, session) => callback(session));
};

export const clearSession = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out:", error.message);
  } else {
    console.log("Session cleared successfully.");
  }
};
