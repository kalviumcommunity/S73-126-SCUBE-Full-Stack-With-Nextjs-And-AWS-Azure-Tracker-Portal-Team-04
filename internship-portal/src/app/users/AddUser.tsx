"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/lib/fetcher";
import toast from "react-hot-toast";
import Loader from "@/components/ui/Loader";

export default function AddUser() {
  const { data } = useSWR("/api/users", fetcher);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const addUser = async () => {
    if (!name) return;

    toast.loading("Saving...");
    setLoading(true);

    // Optimistic UI
    mutate(
      "/api/users",
      [...data, { id: Date.now(), name, email: "temp@user.com" }],
      false
    );

    try {
      await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: `${name.toLowerCase()}@mail.com`,
        }),
      });

      toast.success("User added!");
      mutate("/api/users");
      setName("");
    } catch {
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="mt-4">
      {loading && <Loader />}
      <input
        className="border px-2 py-1 mr-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <button
        onClick={addUser}
        className="bg-blue-600 text-white px-3 py-1 rounded"
      >
        Add User
      </button>
    </div>
  );
}
