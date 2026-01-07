export const revalidate = 60;

export default async function InternshipsPage() {
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/posts'
  );
  const data = await res.json();

  return (
    <main>
      <h1>Internship Listings</h1>
      <p>Revalidates every 60 seconds</p>

      <ul>
        {data.slice(0, 5).map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </main>
  );
}
