"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import {
  Button,
  Input,
  Label,
  Field,
  Fieldset,
  Legend,
} from "@headlessui/react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(schema),
  });

  const handleAuthSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);

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

  return (
    <div className="flex items-center justify-center bg-gray-800 h-[calc(100vh-4.2rem)]">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <Fieldset className="space-y-4">
          <Legend className="text-2xl font-bold text-center mb-6 text-sky-500">
            {type === "login" ? "Login" : "Sign Up"}
          </Legend>

          <Field className="mb-4">
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </Label>
            <Input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none text-sm focus:ring-2 focus:ring-indigo-500 text-black"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">
                {(errors.email as { message?: string }).message ||
                  "Invalid email"}
              </p>
            )}
          </Field>

          <Field className="mb-6">
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </Label>
            <Input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 text-black border text-sm border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">
                {(errors.password as { message?: string }).message ||
                  "Invalid password"}
              </p>
            )}
          </Field>

          <Button
            type="submit"
            className={`rounded bg-sky-600 py-2 w-full px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700 ${
              loading ? "opacity-50" : ""
            }`}
            onClick={handleSubmit(handleAuthSubmit)}
            disabled={loading}
          >
            {loading
              ? type === "login"
                ? "Logging in..."
                : "Signing up..."
              : type === "login"
              ? "Login"
              : "Sign Up"}
          </Button>
        </Fieldset>

        <p className="mt-4 text-center text-sm text-gray-600">
          {type === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <a
            href={type === "login" ? "/auth/signup" : "/auth/login"}
            className="text-blue-700 hover:underline"
          >
            {type === "login" ? "Sign up" : "Login"}
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
