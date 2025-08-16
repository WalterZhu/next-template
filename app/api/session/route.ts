import { NextRequest, NextResponse } from "next/server";
import { ensureSession, setSessionCookie } from "../../../lib/session";

export async function GET(request: NextRequest) {
  try {
    const { session, isNew } = await ensureSession(request);
    
    const response = NextResponse.json({ 
      session,
      isNew,
      message: isNew ? "New anonymous session created" : "Existing session found"
    });
    
    if (isNew) {
      setSessionCookie(response, session.id);
    }
    
    return response;
  } catch (error) {
    console.error("Error in session API:", error);
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 }
    );
  }
}