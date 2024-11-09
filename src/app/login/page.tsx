"use client";

import { useState } from "react";
import { Button, TextInput, PasswordInput, Notification } from "@mantine/core";
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
    <div>
      <h1>Login</h1>
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
      <Button onClick={handleLogin}>Login</Button>
      {notification && <Notification>{notification}</Notification>}
    </div>
  );
};

export default LoginPage;
