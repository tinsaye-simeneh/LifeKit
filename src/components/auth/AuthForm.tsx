"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import {
  Button,
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Text,
  Anchor,
  LoadingOverlay,
} from "@mantine/core";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FcGoogle } from "react-icons/fc"; // Google Icon

interface AuthFormProps {
  type: "login" | "signup";
}

const schema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password should be at least 6 characters"),
});

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const { register, handleSubmit } = useForm<FieldValues>({
    resolver: zodResolver(schema),
  });

  // 🔹 Handle Email & Password Auth
  const handleAuthSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    setError("");

    try {
      let response;
      if (type === "login") {
        response = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
      } else {
        response = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
        });
      }

      const { error } = response;
      if (error) {
        setError(error.message);
      } else {
        router.push("/");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error("Authentication failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle Google OAuth Sign-in
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError(error.message);
      }
    } catch (error) {
      setError("Google sign-in failed. Try again.");
      console.error("Google Auth Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-800 h-[calc(100vh-4.2rem)]">
      <Paper
        shadow="md"
        radius="md"
        p="lg"
        withBorder
        className="max-w-sm w-full relative"
      >
        <LoadingOverlay visible={loading} />
        <Title order={2} className="text-center text-sky-500 mb-4">
          {type === "login" ? "Login" : "Sign Up"}
        </Title>

        {error && (
          <Text size="sm" mb="sm" className="text-red-500">
            {error}
          </Text>
        )}

        <form onSubmit={handleSubmit(handleAuthSubmit)} className="space-y-4">
          <TextInput
            label="Email"
            placeholder="Enter your email"
            {...register("email")}
            required
            className="text-black"
          />

          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            {...register("password")}
            required
            className="text-black"
          />

          <Button type="submit" fullWidth loading={loading} color="blue">
            {type === "login" ? "Login" : "Sign Up"}
          </Button>
        </form>

        <div className="flex items-center justify-center mt-4">
          <Button
            variant="default"
            fullWidth
            onClick={handleGoogleSignIn}
            className="mt-2"
          >
            <FcGoogle size={20} className="mr-2" />
            Continue with Google
          </Button>
        </div>

        <Text size="sm" mt="md" className="text-center text-black">
          {type === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <Anchor href={type === "login" ? "/signup" : "/login"}>
            {type === "login" ? "Sign up" : "Login"}
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
};

export default AuthForm;
