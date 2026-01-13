import { handleError } from "@/lib/errorHandler";

export async function GET() {
  try {
    throw new Error("Test error from centralized error handler");
  } catch (error) {
    return handleError(error, "GET /api/test/error");
  }
}
