"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import AddUser from "./AddUser";

export default function UsersPage() {
  const { data, error, isLoading } = useSWR("/api/users", fetcher);

  if (error) return <p className="text-red-600">Failed to load users</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      <ul className="mb-4">
        {data.map((u: any) => (
          <li key={u.id}>
            {u.name} — {u.email}
          </li>
        ))}
      </ul>

      <AddUser />
    </div>
  );
}
