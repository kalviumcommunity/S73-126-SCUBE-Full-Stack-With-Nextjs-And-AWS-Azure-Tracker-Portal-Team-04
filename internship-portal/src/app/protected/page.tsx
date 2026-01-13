"use client";
import { useAuthContext } from "@/context/AuthContext";

export default function ProtectedPage() {
  const { login, logout, fetchWithAuth } = useAuthContext();

  const fetchData = async () => {
    const res = await fetchWithAuth("/api/protected");
    console.log("Protected data accessed");
  };

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Protected Route</h1>

      <button onClick={login} className="bg-green-600 text-white px-4 py-2 mr-2 rounded">
        Login
      </button>

      <button onClick={fetchData} className="bg-blue-600 text-white px-4 py-2 mr-2 rounded">
        Fetch Protected Data
      </button>

      <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded">
        Logout
      </button>
    </main>
  );
}
