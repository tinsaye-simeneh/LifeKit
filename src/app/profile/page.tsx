"use client";
import { useEffect } from "react";
import { useSessionStore } from "../../store/sessionStore";

const UserProfilePage = () => {
  const { session, fetchSession } = useSessionStore();

  useEffect(() => {
    // Fetch session and profile on page load if not already done
    if (!session) {
      fetchSession();
    }

    // Log session after it has been fetched
    console.log(session);
  }, [session, fetchSession]);

  if (!session) return <p>Loading session...</p>;
  if (!session.userProfile) return <p>Loading profile...</p>;

  const { userProfile, user } = session;

  // Access user data directly (email, phone, etc.)
  const userData = user || {};

  return (
    <div className="p-4">
      <img
        src={userProfile.avatar_url}
        alt="User Avatar"
        className="w-32 h-32 rounded-full"
      />
      <h1 className="text-2xl font-bold">{userProfile.bio}</h1>
      <p>Joined: {new Date(userProfile.created_at).toLocaleDateString()}</p>
      <p>
        Last updated: {new Date(userProfile.updated_at).toLocaleDateString()}
      </p>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">User Information:</h2>
        <ul>
          {/* Access email and phone directly from userData */}
          <li>
            <strong>Email:</strong> {userData.email || "Not available"}
          </li>
          <li>
            <strong>Phone:</strong> {userData.phone || "Not available"}
          </li>
          <li>
            <strong>Email Verified:</strong>{" "}
            {userData.email_verified ? "Yes" : "No"}
          </li>
          <li>
            <strong>Phone Verified:</strong>{" "}
            {userData.phone_verified ? "Yes" : "No"}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfilePage;
