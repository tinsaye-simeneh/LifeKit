"use client";

import { useRouter } from "next/navigation";
import { Button, Container, Title, Text } from "@mantine/core";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <Container size="md" className="text-center">
        <Title order={1} className="text-4xl font-bold mb-4 text-gray-800">
          404 - Page Not Found
        </Title>
        <Text size="lg" className="text-gray-600 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </Text>
        <Button
          size="lg"
          className="bg-blue-500 hover:bg-blue-600 text-white"
          onClick={() => router.push("/")}
        >
          Go Back to Home
        </Button>
      </Container>
    </div>
  );
}
