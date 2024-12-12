"use client";

import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider, Progress } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useSessionStore } from "@/store/sessionStore";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { session } = useSessionStore();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const isAuthRoute = pathname === "/login" || pathname === "/register";

  // Redirect logic for auth routes
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

  // Progress loader logic using pathname change
  useEffect(() => {
    const handleStart = () => {
      setIsPageLoading(true);
      setProgress(20); // Start progress at 20%
    };

    const handleComplete = () => {
      setProgress(100); // Complete progress
      setTimeout(() => {
        setIsPageLoading(false);
        setProgress(0); // Reset progress after a short delay
      }, 300); // Smooth transition
    };

    // Simulate the "start" when pathname changes
    handleStart();
    const timeout = setTimeout(handleComplete, 1000); // Adjust timeout duration for realistic progress

    return () => clearTimeout(timeout); // Cleanup timeout
  }, [pathname]); // Trigger when the pathname changes

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
          {/* Progress Bar */}
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
