"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import AddUser from "./AddUser";

export default function UsersPage() {
  const { data, error, isLoading } = useSWR("/api/users", fetcher);

  // 🔐 Simulated logged-in user role (change for testing)
  const userRole: "admin" | "editor" | "viewer" = "editor";

  // Trigger Next.js error boundary
  if (error) {
    throw error;
  }

  if (isLoading) {
    return <p className="p-6">Loading users...</p>;
  }

  if (!data) {
    throw new Error("Failed to load users");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      <ul className="space-y-3 mb-6">
        {data.map((user: any) => (
          <li
            key={user.id}
            className="border p-3 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>

            {/* 🔐 Role-based UI */}
            <div className="space-x-2">
              {["admin", "editor"].includes(userRole) && (
                <button className="bg-yellow-500 text-white px-3 py-1 rounded">
                  Edit
                </button>
              )}

              {userRole === "admin" && (
                <button className="bg-red-600 text-white px-3 py-1 rounded">
                  Delete
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Only admin & editor can create users */}
      {["admin", "editor"].includes(userRole) && <AddUser />}
    </div>
  );
}
