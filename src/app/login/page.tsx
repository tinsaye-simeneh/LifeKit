"use client";

import { useState } from "react";
import {
  Button,
  TextInput,
  PasswordInput,
  Container,
  Paper,
  Title,
  Text,
  Anchor,
} from "@mantine/core";
import { useSessionStore } from "../../store/sessionStore";
import CustomNotification from "../../components/Notification";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signInStore } = useSessionStore();

  const handleLogin = async () => {
    if (!email || !password) {
      CustomNotification({
        color: "red",
        title: "Error",
        content: "Please fill in all fields.",
        position: "top-right",
      });
      return;
    } else {
      try {
        await signInStore(email, password);
        window.open("/", "_self");

        CustomNotification({
          color: "green",
          title: "Success",
          content: "Logged in successfully!",
          position: "top-right",
        });

        //eslint-disable-next-line
      } catch (error: any) {
        CustomNotification({
          color: "red",
          title: "Error",
          content: error.message || "An error occurred.",
          position: "top-right",
        });
      }
    }
  };

  return (
    <Container my={40} className="w-full">
      <Title className="font-bold text-black flex justify-center items-center">
        Welcome Back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor
          size="sm"
          component="button"
          onClick={() => window.open("/register", "_self")}
        >
          Create account
        </Anchor>
      </Text>

      <Paper
        withBorder
        shadow="md"
        p={30}
        mt={30}
        radius="md"
        className="md:w-96 w-full mx-auto"
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
      </Paper>
    </Container>
  );
};

export default LoginPage;
