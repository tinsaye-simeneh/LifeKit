import { supabase } from "../../../utils/supabase";

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

export const onAuthStateChange = (callback: (session: any) => void) => {
  return supabase.auth.onAuthStateChange((_, session) => callback(session));
};