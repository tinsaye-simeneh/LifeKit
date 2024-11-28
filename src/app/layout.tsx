"use client";

import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { useEffect, useState } from "react";
import { useSessionStore } from "@/store/sessionStore";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { Notifications } from "@mantine/notifications";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { session } = useSessionStore();
  const [loading, setLoading] = useState(true);
  const isAuthRoute = pathname === "/login" || pathname === "/register";

  useEffect(() => {
    if (!loading) {
      return;
    }

    const timeout = setTimeout(() => {
      if (isAuthRoute && session) {
        router.push("/");
      } else if (!isAuthRoute && !session) {
        router.push("/login");
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [isAuthRoute, session, router, loading]);

  if (loading) {
    return null;
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <Notifications position="top-right" zIndex={9999} />
          <Navbar />
          {isAuthRoute && !session ? children : session ? children : null}
        </MantineProvider>
      </body>
    </html>
  );
}
