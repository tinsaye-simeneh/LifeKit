import { create } from "zustand";
import { supabase } from "@/utils/supabase";

type UserProfile = {
  id: string;
  full_name: string;
  username: string;
  email: string;
  phone?: string;
  bio?: string;
  location?: string;
  website?: string;
  profile_picture_url?: string;
};

type UserStore = {
  profile: UserProfile | null;
  fetchProfile: (userId: string) => Promise<void>;
  updateProfile: (
    userId: string,
    updates: Partial<UserProfile>
  ) => Promise<void>;
  uploadProfilePicture: (file: File) => Promise<string | null>;
};

export const useUserStore = create<UserStore>((set) => ({
  profile: null,
  fetchProfile: async (userId) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) console.error("Error fetching profile:", error.message);
    else set({ profile: data });
  },
  updateProfile: async (userId, updates) => {
    const { data, error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", userId);

    if (error) console.error("Error updating profile:", error.message);
    else set({ profile: data });
  },
  uploadProfilePicture: async (file) => {
    const filePath = `profile-pictures/${file.name}`;
    const { data, error } = await supabase.storage
      .from("profile-pictures")
      .upload(filePath, file);

    if (error) {
      console.error("Error uploading profile picture:", error.message);
      return null;
    }

    return data
      ? `${
          supabase.storage.from("profile-pictures").getPublicUrl(filePath)
            .publicURL
        }`
      : null;
  },
}));
