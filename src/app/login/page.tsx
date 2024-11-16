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
import { useRouter } from "next/navigation";
import { signInWithPassword } from "../api/auth/route";
import { useSessionStore } from "../../store/sessionStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState("");
  const router = useRouter();
  const setSession = useSessionStore((state) => state.setSession);

  const handleLogin = async () => {
    const { data, error } = await signInWithPassword(email, password);
    if (error) {
      setNotification(`Error: ${error.message}`);
    } else {
      setSession(data.session);
      setNotification("Login successful!");
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-start justify-center pt-4">
      <Container size={1000} my={30}>
        <Title align="center" className="font-bold text-black">
          Welcome Back!
        </Title>
        <Text size="sm" align="center" mt={5} color="dimmed">
          Enter your credentials to continue
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
