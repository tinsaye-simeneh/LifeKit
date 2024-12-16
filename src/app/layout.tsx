"use client";

import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider, Progress } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useSessionStore } from "@/store/sessionStore";
import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { session } = useSessionStore();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const isAuthRoute = pathname === "/login" || pathname === "/register";

  useEffect(() => {
    if (!loading) {
      return;
    }

    const timeout = setTimeout(() => {
      if (isAuthRoute && session) {
        setTimeout(() => window.open("/", "_self"), 500);
      } else if (!isAuthRoute && !session) {
        setTimeout(() => window.open("/login", "_self"), 500);
      }
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [isAuthRoute, session, loading]);

  useEffect(() => {
    const handleStart = () => {
      setIsPageLoading(true);
      setProgress(20);
    };

    const handleComplete = () => {
      setProgress(100);
      setTimeout(() => {
        setIsPageLoading(false);
        setProgress(0);
      }, 300);
    };

    handleStart();
    const timeout = setTimeout(handleComplete, 1000);
    return () => clearTimeout(timeout);
  }, [pathname]);

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
          {isPageLoading && (
            <Progress
              value={progress}
              color="blue"
              size="xs"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
              }}
            />
          )}
          <Notifications position="top-right" zIndex={9999} />
          <Navbar />
          {isAuthRoute && !session ? children : session ? children : null}
        </MantineProvider>
      </body>
    </html>
  );
}
