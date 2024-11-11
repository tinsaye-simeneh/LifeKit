"use client";

import { useEffect, useState } from "react";
import { useSessionStore } from "@/store/sessionStore";
import { Button, TextInput, Textarea } from "@mantine/core";

const ProfilePage = () => {
  const session = useSessionStore((state) => state.session);
  const [profile, setProfile] = useState({
    bio: "",
    location: "",
    website: "",
    avatar_url: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    if (!session) return;

    try {
      const response = await fetch("/api/profile");
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [session]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Your Profile</h1>
      <div className="mt-4">
        <TextInput
          label="Bio"
          name="bio"
          value={profile.bio}
          onChange={handleChange}
          placeholder="Tell us about yourself"
        />
        <TextInput
          label="Location"
          name="location"
          value={profile.location}
          onChange={handleChange}
          placeholder="Your location"
          className="mt-4"
        />
        <TextInput
          label="Website"
          name="website"
          value={profile.website}
          onChange={handleChange}
          placeholder="https://yourwebsite.com"
          className="mt-4"
        />
        <TextInput
          label="Avatar URL"
          name="avatar_url"
          value={profile.avatar_url}
          onChange={handleChange}
          placeholder="https://yourimageurl.com/avatar.jpg"
          className="mt-4"
        />
        <Button onClick={handleSave} loading={loading} className="mt-6">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
