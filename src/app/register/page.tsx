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
import { signUp } from "../api/auth/route";
import Notification from "../../components/Notification";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    if (!email || !password) {
      <Notification
        color="red"
        title="Error"
        content="Please fill in all fields."
      />;
      return;
    } else {
      try {
        await signUp(email, password);

        <Notification
          color="green"
          title="Success"
          content="Account created successfully!"
        />;
        setTimeout(() => {
          router.push("/login");
        }, 1000);
        //eslint-disable-next-line
      } catch (error: any) {
        <Notification color="red" title="Error" content={error.message} />;
      }
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
          </Paper>
        </div>
      </Container>
    </div>
  );
};

export default RegisterPage;
