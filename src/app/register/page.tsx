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
import { useRouter } from "next/navigation";
import { signUp } from "@/utils/auth";
import { notifications } from "@mantine/notifications";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password) {
      notifications.show({
        title: "Error",
        message: "Please fill in all fields.",
        color: "red",
      });
      return;
    } else {
      try {
        setLoading(true);
        await signUp(email, password);

        setTimeout(() => {
          router.push("/login");
        }, 1000);
        setLoading(false);
        //eslint-disable-next-line
      } catch (error: any) {
        if (error.message === "Email already in use") {
          notifications.show({
            title: "Error",
            message: "Email already in use.",
            color: "red",
          });
        } else {
          notifications.show({
            title: "Error",
            message: "An error occurred. Please try again.",
            color: "red",
          });
        }
      }
    }
  };

  return (
    <Container my={40} className="w-full">
      <Title className="font-bold text-black flex justify-center items-center">
        Create Your Account
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{" "}
        <Anchor
          size="sm"
          component="button"
          onClick={() =>
            setTimeout(() => {
              router.push("/login");
            }, 1000)
          }
        >
          Login
        </Anchor>
      </Text>

      <Paper
        withBorder
        shadow="md"
        p={30}
        mt={30}
        radius="md"
        className="mx-auto md:w-96 w-full"
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
          onClick={handleSignUp}
          className="bg-blue-950 hover:bg-blue-900 disabled:bg-gray-300  disabled:cursor-not-allowed"
          disabled={!email || !password || loading}
        >
          {loading ? "Loading..." : "Sign Up"}
        </Button>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
