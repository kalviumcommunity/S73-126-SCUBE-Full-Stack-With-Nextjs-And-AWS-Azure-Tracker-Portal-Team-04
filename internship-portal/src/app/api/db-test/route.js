import pool from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await pool.query("SELECT NOW()");
  return NextResponse.json({ serverTime: result.rows[0] });
}
