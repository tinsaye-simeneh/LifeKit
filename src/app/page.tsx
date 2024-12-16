"use client";

import React from "react";
import { Card, Group, Text, Button, Container } from "@mantine/core";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter();
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
            onClick={() => router.push("/to-do")}
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

      <footer className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 text-white py-6 my-10 border-gray-4 border-t-2">
        <Container size="lg" className="text-center">
          <p>
            &copy; 2024 LifeKit. Made with ❤️ by
            <a
              href="https://github.com/HikmaAnwar"
              className="text-blue-500 underline"
            >
              {" "}
              Hikma
            </a>{" "}
            and{" "}
            <a
              href="https://github.com/tinsaye-simeneh"
              className="text-blue-500 underline"
            >
              Tinsaye
            </a>
          </p>
        </Container>
      </footer>
    </div>
  );
};

export default LandingPage;
