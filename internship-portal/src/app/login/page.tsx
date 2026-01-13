"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Login() {
  const router = useRouter();

  function handleLogin() {
    Cookies.set("token", "mock.jwt.token");
    router.push("/dashboard");
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Login Page
        </h1>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Project Name"
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="file"
            className="border rounded-lg px-3 py-2 text-sm"
          />

          <button
            onClick={handleLogin}
            className="bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg font-medium mt-2"
          >
            Login
          </button>
        </div>
      </div>
    </main>
  );
}
