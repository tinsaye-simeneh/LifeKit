"use client";
import React, { useEffect } from "react";
import { useSessionStore } from "../path/to/sessionStore";

const ProfilePage: React.FC = () => {
  const { session, fetchSession } = useSessionStore();

  // Fetch session data on component mount
  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  // If session data is not loaded yet, display a loading message
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
          {/* Add other user information here as needed */}
        </div>
      ) : (
        <p>User not logged in.</p>
      )}
    </div>
  );
};

export default ProfilePage;
