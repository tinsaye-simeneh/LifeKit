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
} from "@mantine/core";
import { useSessionStore } from "../../store/sessionStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState("");
  const { signInStore } = useSessionStore();

  const handleLogin = async () => {
    try {
      await signInStore(email, password);
      window.open("/", "_self");
      setNotification("Login successful!");
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
    <div className="bg-white flex items-start justify-center pt-4 w-full min-h-screen">
      <Container my={40} className="w-full">
        <Title className="font-bold text-black flex justify-center items-center">
          Welcome Back!
        </Title>
        <Text className="text-gray-500 flex justify-center items-center mt-5 text-sm">
          Enter your credentials to continue
        </Text>

        <div className="mx-auto">
          <Paper
            withBorder
            shadow="md"
            p={30}
            mt={30}
            radius="md"
            className="md:w-80 w-full mx-auto"
          >
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
              onClick={handleLogin}
              className="bg-blue-950 hover:bg-blue-900"
            >
              Login
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

export default LoginPage;
