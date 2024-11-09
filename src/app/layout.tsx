"use client";

import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { useEffect } from "react";
import { useSessionStore } from "@/store/sessionStore";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthRoute = pathname === "/login" || pathname === "/register";
  const { session } = useSessionStore();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isAuthRoute && session) {
        router.push("/");
      } else if (!isAuthRoute && !session) {
        router.push("/login");
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [isAuthRoute, session, router, pathname]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <Navbar />
          {isAuthRoute && !session ? children : session ? children : null}
        </MantineProvider>
      </body>
    </html>
  );
}
