export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/posts/1',
    { cache: 'no-store' }
  );
  const data = await res.json();

  return (
    <main>
      <h1>Dashboard</h1>
      <h3>{data.title}</h3>
      <p>{data.body}</p>
    </main>
  );
}
