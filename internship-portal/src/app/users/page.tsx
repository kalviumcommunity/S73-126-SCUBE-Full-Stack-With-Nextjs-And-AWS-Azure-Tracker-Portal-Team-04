"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import AddUser from "./AddUser";

export default function UsersPage() {
  const { data, error, isLoading } = useSWR("/api/users", fetcher);

  // Force error boundary if API fails
  if (error) {
    throw error;
  }

  // SWR still needs a loading fallback for client rendering
  if (isLoading) {
    return <p className="p-6">Loading users...</p>;
  }

  // Extra safety
  if (!data) {
    throw new Error("Failed to load users");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      <ul className="mb-4">
        {data.map((user: any) => (
          <li key={user.id} className="border-b py-2">
            {user.name} — {user.email}
          </li>
        ))}
      </ul>

      <AddUser />
    </div>
  );
}
