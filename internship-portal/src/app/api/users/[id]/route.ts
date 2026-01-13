import { NextResponse } from "next/server";
import { roles } from "@/config/roles";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const role = req.headers.get("x-user-role");

  console.log(`[RBAC] ${role} attempted DELETE user ${params.id}`);

  if (!role || !roles[role]?.includes("delete")) {
    return NextResponse.json(
      { success: false, message: "Access denied" },
      { status: 403 }
    );
  }

  await prisma.user.delete({ where: { id: Number(params.id) } });

  return NextResponse.json({ success: true });
}
