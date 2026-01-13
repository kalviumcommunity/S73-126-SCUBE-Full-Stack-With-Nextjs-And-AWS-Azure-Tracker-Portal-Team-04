import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import redis from "@/lib/redis";
import { userSchema } from "@/lib/schemas/userSchema";
import { ZodError } from "zod";
import { logInfo, logError } from "@/lib/logger";

const USERS_CACHE_KEY = "users:list";
const CACHE_TTL = 60;

const headers = {
  "Access-Control-Allow-Origin": "http://localhost:3000",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function GET() {
  const requestId = crypto.randomUUID();

  logInfo("GET /api/users called", { requestId });

  try {
    const cachedUsers = await redis.get(USERS_CACHE_KEY);

    if (cachedUsers) {
      logInfo("Cache hit for users", {
        requestId,
        source: "redis",
      });

      return NextResponse.json(JSON.parse(cachedUsers), { headers });
    }

    logInfo("Cache miss, fetching users from DB", {
      requestId,
      source: "postgres",
    });

    const users = await prisma.user.findMany();

    await redis.set(USERS_CACHE_KEY, JSON.stringify(users), "EX", CACHE_TTL);

    logInfo("Users cached in Redis", {
      requestId,
      count: users.length,
      ttl: CACHE_TTL,
    });

    return NextResponse.json(users, { headers });
  } catch (error) {
    logError("Failed to fetch users", {
      requestId,
      error: (error as Error).message,
    });

    return NextResponse.json(
      { success: false, message: "Failed to fetch users" },
      { status: 500, headers }
    );
  }
}

export async function POST(req: Request) {
  const requestId = crypto.randomUUID();

  logInfo("POST /api/users called", { requestId });

  try {
    const body = await req.json();
    const data = userSchema.parse(body);

    const user = await prisma.user.create({ data });

    await redis.del(USERS_CACHE_KEY);

    logInfo("User created & cache invalidated", {
      requestId,
      userId: user.id,
      email: user.email,
    });

    return NextResponse.json(user, { status: 201, headers });
  } catch (error) {
    if (error instanceof ZodError) {
      logError("Validation failed while creating user", {
        requestId,
        errors: error.errors,
      });

      return NextResponse.json(
        {
          success: false,
          errors: error.errors.map((e) => ({
            field: e.path[0],
            message: e.message,
          })),
        },
        { status: 400, headers }
      );
    }

    logError("Server error while creating user", {
      requestId,
      error: (error as Error).message,
    });

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500, headers }
    );
  }
}
