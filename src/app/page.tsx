"use client";

import React, { useEffect } from "react";
import { Card, Text, Button, Container } from "@mantine/core";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";

const menuItems = [
  { label: "Todo", color: "blue", path: "/to-do" },
  { label: "Finance", color: "green", path: "/finance" },
  { label: "Goals", color: "yellow", path: "/goals" },
  { label: "Ideas", color: "purple", path: "/ideas" },
  { label: "Notes", color: "red", path: "/notes" },
  { label: "Temp", color: "gray", path: "/temp" },
];

const LandingPage = () => {
  const router = useRouter();

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((registration) => {
            console.log("Service Worker registered: ", registration);
          })
          .catch((registrationError) => {
            console.log(
              "Service Worker registration failed: ",
              registrationError
            );
          });
      });
    }
  }, []);

  return (
    <div className="flex flex-col bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 h-screen p-2">
      <Container size="lg" className="text-center my-16">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
          Welcome to LifeKit
        </h1>
        <p className="text-base mb-6">
          Your ultimate toolkit for a balanced, healthy, and productive life.
          Discover how LifeKit empowers you to live your best life.
        </p>
        <Button
          variant="filled"
          color="yellow"
          size="lg"
          onClick={() => router.push("/to-do")}
        >
          Get Started
        </Button>
      </Container>

      <Card
        shadow="md"
        radius="md"
        withBorder
        className="max-w-md md:w-full w-80 bg-white mx-auto my-10"
      >
        <Text size="xl" className="mb-4">
          Select a Category
        </Text>
        <div className="grid grid-cols-3 gap-2">
          {menuItems.map((item) => (
            <Button
              key={item.label}
              variant="filled"
              color={item.color}
              onClick={() => router.push(item.path)}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </Card>

      <Footer />
    </div>
  );
};

export default LandingPage;
