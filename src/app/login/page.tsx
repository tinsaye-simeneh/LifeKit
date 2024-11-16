"use client";

import { useState } from "react";
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
    <div className="min-h-screen bg-gray-100 flex items- justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Login
        </h1>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
          {notification && (
            <div
              className={`mt-4 px-4 py-2 rounded-lg ${
                notification.startsWith("Error")
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {notification}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
