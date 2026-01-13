export default function Home() {
  return (
    <main className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold">Welcome to Internship Portal 🚀</h1>
      <p className="mt-2">This is a public home page.</p>

      <div className="mt-6 flex gap-4">
        <a href="/login" className="text-blue-600 underline">
          Login
        </a>
        <a href="/dashboard" className="text-blue-600 underline">
          Dashboard
        </a>
        <a href="/users/1" className="text-blue-600 underline">
          User 1
        </a>
      </div>
    </main>
  );
}
