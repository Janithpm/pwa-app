import { getDb } from "@/db";
import { usersTable } from "@/db/schema/test-schema";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function GET(_request: Request) {
  const db = getDb();
  const users = await db.select().from(usersTable)

  return NextResponse.json({ users, message: 'success' });
}
