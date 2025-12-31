import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = (await req.json()) as {
    fullName?: string;
    email?: string;
    password?: string;
  };

  const fullName = (body.fullName || "").trim();
  const email = (body.email || "").trim().toLowerCase();
  const password = body.password || "";

  if (!fullName || !email || !password) {
    return NextResponse.json(
      { ok: false, message: "Full name, email, and password are required." },
      { status: 400 }
    );
  }

  if (!email.includes("@")) {
    return NextResponse.json(
      { ok: false, message: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { ok: false, message: "Password must be at least 8 characters." },
      { status: 400 }
    );
  }

  // TODO: Save user in DB / call backend service here.
  // For demo, always succeed:
  return NextResponse.json({ ok: true });
}
