"use client";

import React from "react";
import { Card, Group, Text, Button, Container } from "@mantine/core";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("Service Worker registration failed: ", registrationError);
      });
  });
}

const LandingPage = () => {
  const router = useRouter();
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
        className="max-w-xs py-6 md:max-w-sm bg-gradient-to-r from-blue-50 to-blue-100 mx-auto my-16"
      >
        <Text size="xl" className="mb-4">
          Select a Category
        </Text>
        <Group grow>
          <Button
            variant="filled"
            color="blue"
            onClick={() => router.push("/to-do")}
          >
            Todo
          </Button>
          <Button
            variant="filled"
            color="green"
            onClick={() => router.push("/finance")}
            px={10}
          >
            Finance
          </Button>
          <Button
            variant="filled"
            color="yellow"
            onClick={() => router.push("/goals")}
          >
            Goals
          </Button>
        </Group>
        <Group grow className="mt-4">
          <Button
            variant="filled"
            color="purple"
            onClick={() => router.push("/ideas")}
          >
            Ideas
          </Button>
          <Button
            variant="filled"
            color="red"
            onClick={() => router.push("/notes")}
          >
            Notes
          </Button>
        </Group>
      </Card>

      <Footer />
    </div>
  );
};

export default LandingPage;
