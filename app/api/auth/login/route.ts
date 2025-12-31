import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = (await req.json()) as {
    email?: string;
    password?: string;
    remember?: boolean;
  };

  const email = (body.email || "").trim();
  const password = body.password || "";
  const remember = !!body.remember;

  // Basic validation
  if (!email || !password) {
    return NextResponse.json(
      { ok: false, message: "Email and password are required." },
      { status: 400 }
    );
  }

  // Mock check (demo)
  // Example valid user: admin@pm.com / admin123
  const isValid = email === "admin@pm.com" && password === "admin123";
  if (!isValid) {
    return NextResponse.json(
      { ok: false, message: "Invalid credentials." },
      { status: 401 }
    );
  }

  // Create a dummy session token (replace with real JWT/session)
  const token = "pm_session_dummy_token";

  const res = NextResponse.json({ ok: true });

  res.cookies.set({
    name: "pm_session",
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: remember ? 60 * 60 * 24 * 7 : 60 * 60 * 2, // 7 days vs 2 hours
  });

  return res;
}
