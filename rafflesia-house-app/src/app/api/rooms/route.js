import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";

export async function GET() {
  const db = await getDb();
  const rooms = await db.collection("rooms").find({}).limit(100).toArray();
  return NextResponse.json(rooms);
}

export async function POST(req) {
  const payload = await req.json();
  const doc = {
    number: payload.number ?? null,
    type: payload.type ?? null,
    price: payload.price ?? null,
    status: payload.status ?? "available", // available | occupied | cleaning
    createdAt: new Date(),
  };

  const db = await getDb();
  const result = await db.collection("rooms").insertOne(doc);
  return NextResponse.json({ insertedId: result.insertedId }, { status: 201 });
}
