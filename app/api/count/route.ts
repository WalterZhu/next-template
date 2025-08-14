// app/api/count/route.ts
import { NextResponse } from "next/server";
import { getCount, increaseCount } from "../../../lib/count";

export async function GET() {
  try {
    const count = await getCount();
    return NextResponse.json({ count });
  } catch (error) {
    console.error("GET /api/count error:", error);
    return NextResponse.json({ error: "Failed to get count" }, { status: 500 });
  }
}

export async function POST() {
  try {
    const count = await increaseCount();
    return NextResponse.json({ count });
  } catch (error) {
    console.error("POST /api/count error:", error);
    return NextResponse.json(
      { error: "Failed to increase count" },
      { status: 500 }
    );
  }
}
