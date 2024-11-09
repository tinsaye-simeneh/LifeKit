// app/register/page.tsx
"use client";

import { useState } from "react";
import { Button, TextInput, PasswordInput, Notification } from "@mantine/core";
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
    <div>
      <h1>Register</h1>
      <TextInput
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <PasswordInput
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleSignUp}>Register</Button>
      {notification && <Notification>{notification}</Notification>}
    </div>
  );
};

export default RegisterPage;
