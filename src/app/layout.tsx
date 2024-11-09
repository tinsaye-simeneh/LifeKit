"use client";

import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { useEffect } from "react";
import { useSessionStore } from "@/store/sessionStore";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

// export const metadata = {
//   title: "Life kit",
//   description: "A collection of tools for life",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthRoute = pathname === "/login" || pathname === "/register";
  const { session, fetchSession } = useSessionStore();

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  useEffect(() => {
    if (!isAuthRoute && !session) {
      router.push("/login");
    } else if (isAuthRoute && session) {
      router.push("/");
    }
  }, [isAuthRoute, session, router]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          {isAuthRoute && !session ? children : session ? null : null}
        </MantineProvider>
      </body>
    </html>
  );
}
