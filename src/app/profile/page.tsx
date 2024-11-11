"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { Button, TextInput, Textarea } from "@mantine/core";
import { useUserStore } from "@/store/userStore";

const ProfilePage = () => {
  const { profile, fetchProfile, updateProfile, uploadProfilePicture } =
    useUserStore();
  const [form, setForm] = useState({
    full_name: "",
    username: "",
    email: "",
    phone: "",
    bio: "",
    location: "",
    website: "",
    profile_picture_url: "",
  });

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (profile) {
      setForm({
        full_name: profile.full_name || "",
        username: profile.username || "",
        email: profile.email || "",
        phone: profile.phone || "",
        bio: profile.bio || "",
        location: profile.location || "",
        website: profile.website || "",
        profile_picture_url: profile.profile_picture_url || "",
      });
    }
  }, [profile]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await updateProfile(form);
  };

  const handlePictureUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const url = await uploadProfilePicture(file);
      if (url) {
        setForm((prev) => ({ ...prev, profile_picture_url: url }));
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <div className="mb-4">
        {form.profile_picture_url ? (
          <img
            src={form.profile_picture_url}
            alt="Profile Picture"
            className="w-24 h-24 rounded-full"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-200 rounded-full" />
        )}
        <input type="file" onChange={handlePictureUpload} className="mt-2" />
      </div>
      <TextInput
        label="Full Name"
        name="full_name"
        value={form.full_name}
        onChange={handleChange}
      />
      <TextInput
        label="Username"
        name="username"
        value={form.username}
        onChange={handleChange}
      />
      <TextInput label="Email" name="email" value={form.email} disabled />
      <TextInput
        label="Phone"
        name="phone"
        value={form.phone}
        onChange={handleChange}
      />
      <Textarea
        label="Bio"
        name="bio"
        value={form.bio}
        onChange={handleChange}
      />
      <TextInput
        label="Location"
        name="location"
        value={form.location}
        onChange={handleChange}
      />
      <TextInput
        label="Website"
        name="website"
        value={form.website}
        onChange={handleChange}
      />
      <Button onClick={handleUpdate} className="mt-4">
        Save Changes
      </Button>
    </div>
  );
};

export default ProfilePage;
