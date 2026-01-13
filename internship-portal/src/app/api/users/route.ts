import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import redis from "@/lib/redis";
import { userSchema } from "@/lib/schemas/userSchema";
import { ZodError } from "zod";

const USERS_CACHE_KEY = "users:list";
const CACHE_TTL = 60; // seconds

export async function GET() {
  try {
    // 1️⃣ Check Redis cache
    const cachedUsers = await redis.get(USERS_CACHE_KEY);

    if (cachedUsers) {
      console.log("Cache Hit");
      return NextResponse.json(JSON.parse(cachedUsers));
    }

    // 2️⃣ Cache miss → fetch from DB
    console.log("Cache Miss - Fetching from DB");
    const users = await prisma.user.findMany();

    // 3️⃣ Store in Redis with TTL
    await redis.set(
      USERS_CACHE_KEY,
      JSON.stringify(users),
      "EX",
      CACHE_TTL
    );

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = userSchema.parse(body);

    // 4️⃣ Create user in DB
    const user = await prisma.user.create({ data });

    // 5️⃣ Invalidate cache after write
    await redis.del(USERS_CACHE_KEY);

    return NextResponse.json(user, { status: 201 });
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
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
