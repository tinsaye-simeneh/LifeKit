// app/layout.tsx
"use client";

import { useEffect } from "react";
import { useSessionStore } from "../store/sessionStore";

const Layout = ({ children }) => {
  const { session, fetchSession } = useSessionStore();

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  return (
    <div>
      {session ? (
        <p>Welcome, {session.user.email}</p>
      ) : (
        <p>You are not logged in.</p>
      )}
      {children}
    </div>
  );
};

export default Layout;
