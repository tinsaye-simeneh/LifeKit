"use client";

import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider, Progress } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import "@mantine/tiptap/styles.css";
import Script from "next/script";
import GoogleAnalytics from "./GoogleAnalytics";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [isPageLoading, setIsPageLoading] = useState(false);

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

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-ZZYR54J0Q6`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `}
        </Script>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
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
          )}{" "}
          <Notifications position="top-right" zIndex={9999} />
          <Navbar />
          <GoogleAnalytics measurementId="G-ZZYR54J0Q6" />
          <AuthProvider>{children}</AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
