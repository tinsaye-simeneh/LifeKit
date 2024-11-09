"use client";

import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { useEffect } from "react";
import { useSessionStore } from "@/store/sessionStore";

// export const metadata = {
//   title: "Life kit",
//   description: "A collection of tools for life",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, fetchSession } = useSessionStore();

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  console.log("session", session);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          {session ? (
            <p>Welcome {session.user.email}</p>
          ) : (
            <p>You are not logged in.</p>
          )}
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
