"use client";

import React from "react";
import { Card, Group, Text, Button, Container } from "@mantine/core";

const LandingPage = () => {
  return (
    <div className="flex flex-col bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900">
      <section className=" text-white py-20 px-6 text-center">
        <Container size="lg">
          <h1 className="text-4xl font-bold mb-4">Welcome to LifeKit</h1>
          <p className="text-lg mb-6">
            Your ultimate toolkit for a balanced, healthy, and productive life.
            Discover how LifeKit empowers you to live your best life.
          </p>
          <Button
            variant="filled"
            color="yellow"
            size="lg"
            onClick={() => (window.location.href = "/to-do")}
          >
            Get Started
          </Button>
        </Container>
      </section>

      <Card
        shadow="md"
        radius="md"
        withBorder
        className="max-w-sm bg-gradient-to-r from-blue-50 to-blue-100 mx-auto"
      >
        <Text size="xl" className="mb-4">
          Select a Category
        </Text>
        <Group grow>
          <Button
            variant="filled"
            color="blue"
            onClick={() => (window.location.href = "/to-do")}
          >
            Todo
          </Button>
          <Button
            variant="filled"
            color="green"
            onClick={() => (window.location.href = "/finance")}
            px={10}
          >
            Finance
          </Button>
          <Button
            variant="filled"
            color="yellow"
            onClick={() => (window.location.href = "/goals")}
          >
            Goals
          </Button>
        </Group>
        <Group grow className="mt-4">
          <Button
            variant="filled"
            color="purple"
            onClick={() => (window.location.href = "/ideas")}
          >
            Ideas
          </Button>
          <Button
            variant="filled"
            color="red"
            onClick={() => (window.location.href = "/notes")}
          >
            Notes
          </Button>
        </Group>
      </Card>

      <footer className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 text-white py-6 my-12 border-gray-4 border">
        <Container size="lg" className="text-center">
          <p>&copy; 2024 LifeKit. All rights reserved.</p>
        </Container>
      </footer>
    </div>
  );
};

export default LandingPage;
