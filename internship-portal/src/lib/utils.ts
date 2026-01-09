/**
 * Returns the database connection URL.
 * This is a server-side only utility.
 * Throws an error if the environment variable is missing.
 */
export function getDatabaseUrl(): string {
  const dbUrl = process.env.DATABASE_URL;

  if (!dbUrl) {
    throw new Error("DATABASE_URL is not defined");
  }

  return dbUrl;
}
