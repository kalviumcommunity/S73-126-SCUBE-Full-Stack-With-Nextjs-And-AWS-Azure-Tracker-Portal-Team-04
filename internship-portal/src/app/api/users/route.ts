import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import redis from "@/lib/redis";
import { userSchema } from "@/lib/schemas/userSchema";
import { ZodError } from "zod";

const USERS_CACHE_KEY = "users:list";
const CACHE_TTL = 60;

const headers = {
  "Access-Control-Allow-Origin": "http://localhost:3000",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function GET() {
  try {
    const cachedUsers = await redis.get(USERS_CACHE_KEY);

    if (cachedUsers) {
      console.log("Cache Hit");
      return NextResponse.json(JSON.parse(cachedUsers), { headers });
    }

    console.log("Cache Miss - Fetching from DB");
    const users = await prisma.user.findMany();

    await redis.set(
      USERS_CACHE_KEY,
      JSON.stringify(users),
      "EX",
      CACHE_TTL
    );

    return NextResponse.json(users, { headers });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch users" },
      { status: 500, headers }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = userSchema.parse(body);

    const user = await prisma.user.create({ data });

    // Invalidate cache after write
    await redis.del(USERS_CACHE_KEY);

    return NextResponse.json(user, { status: 201, headers });
  } catch (error) {
    if (error instanceof ZodError) {
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

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500, headers }
    );
  }
}
