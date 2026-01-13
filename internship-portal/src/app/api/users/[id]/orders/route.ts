import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const orders = await prisma.order.findMany({
    where: { userId: Number(params.id) },
  });

  return NextResponse.json(orders);
}
