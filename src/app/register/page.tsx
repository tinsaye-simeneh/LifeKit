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
import { signUp } from "../api/auth/route";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    const { error } = await signUp(email, password);
    if (error) {
      setNotification(`Error: ${error.message}`);
    } else {
      setNotification(
        "Registration successful! Please check your email to confirm."
      );
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-start justify-center pt-4">
      <Container size={600} my={40}>
        <Title align="center" className="font-bold text-black">
          Create Your Account
        </Title>
        <Text size="sm" align="center" mt={5} color="dimmed">
          Enter your details to register
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
              className="bg-blue-950 hover:bg-blue-700"
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
