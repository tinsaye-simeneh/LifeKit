"use client";

import { useState } from "react";
import {
  Button,
  TextInput,
  PasswordInput,
  Notification,
  Container,
  Paper,
  Title,
  Text,
  Anchor,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { signUp } from "../api/auth/route";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      setNotification("Account created successfully!");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
      //eslint-disable-next-line
    } catch (error: any) {
      setNotification(
        `Error: ${
          error.message
            ? error.message
            : "Something went wrong, please try again."
        }`
      );
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-start justify-center pt-4">
      <Container my={40} className="w-full">
        <Title className="font-bold text-black flex justify-center items-center">
          Create Your Account
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Already have an account?{" "}
          <Anchor
            size="sm"
            component="button"
            onClick={() => window.open("/login", "_self")}
          >
            Login
          </Anchor>
        </Text>

        <div className="max-w-3xl mx-auto">
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              classNames={{
                label: "text-black",
                input: "text-gray-600",
              }}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              mt="md"
              classNames={{
                label: "text-black",
                input: "text-gray-600",
              }}
            />
            <Button
              fullWidth
              mt="xl"
              onClick={handleSignUp}
              className="bg-blue-950 hover:bg-blue-900"
            >
              Register
            </Button>
            {notification && (
              <Notification
                color={notification.startsWith("Error") ? "red" : "green"}
                mt="md"
              >
                {notification}
              </Notification>
            )}
          </Paper>
        </div>
      </Container>
    </div>
  );
};

export default RegisterPage;
