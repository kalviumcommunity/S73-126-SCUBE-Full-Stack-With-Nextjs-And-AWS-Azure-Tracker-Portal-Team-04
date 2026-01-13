import { handleError } from "@/lib/errorHandler";

export async function GET() {
  try {
    throw new Error("Users route test error");
  } catch (error) {
    return handleError(error, "GET /api/test/users");
  }
}
