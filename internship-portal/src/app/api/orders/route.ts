import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { orderSchema } from "@/lib/schemas/orderSchema";
import { ZodError } from "zod";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 5;

  const orders = await prisma.order.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });

  return NextResponse.json({ page, limit, data: orders });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = orderSchema.parse(body);

    const order = await prisma.order.create({ data });
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          errors: error.errors.map(e => ({
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
