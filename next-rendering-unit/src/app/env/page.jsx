export default function EnvPage() {
  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Environment Details</h1>

      <div style={{ marginTop: "20px" }}>
        <p><strong>App Name:</strong> {process.env.NEXT_PUBLIC_APP_NAME}</p>
        <p><strong>Environment:</strong> {process.env.NEXT_PUBLIC_ENV_NAME}</p>
        <p><strong>Node ENV:</strong> {process.env.NODE_ENV}</p>
      </div>

      <p style={{ marginTop: "30px", color: "gray" }}>
        ⚠️ No secrets are exposed. Only public environment variables are shown.
      </p>
    </main>
  );
}
