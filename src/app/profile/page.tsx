"use client";
import React, { useEffect } from "react";
import { useSessionStore } from "@/store/sessionStore";

const ProfilePage: React.FC = () => {
  const { session, fetchSession } = useSessionStore();

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  if (!session) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      {session ? (
        <div className="user-info">
          <p>
            <strong>Username:</strong> {session.user?.username}
          </p>
          <p>
            <strong>Email:</strong> {session.user?.email}
          </p>
        </div>
      ) : (
        <p>User not logged in.</p>
      )}
    </div>
  );
};

export default ProfilePage;
