"use client";
import React, { useEffect } from "react";
import { useSessionStore } from "@/store/sessionStore";

const ProfilePage: React.FC = () => {
  const { session, fetchSession } = useSessionStore();

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  if (!session) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="profile-page bg-gray-100 min-h-screen flex items-start justify-center pt-16">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-xl font-bold text-center text-gray-800 mb-3">
          Profile
        </h1>
        {session ? (
          <div className="user-info space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-gray-600 font-semibold mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={session.user?.username || ""}
                disabled
                className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 cursor-not-allowed"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-600 font-semibold mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={session.user?.email || ""}
                disabled
                className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 cursor-not-allowed"
              />
            </div>
          </div>
        ) : (
          <p className="text-center text-red-500">User not logged in.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
