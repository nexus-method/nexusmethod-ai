import { NextResponse } from "next/server";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const company = String(body.company ?? "").trim();
  const message = String(body.message ?? "").trim();

  // Server-side honeypot: bots hitting the API directly may fill this.
  if (String(body.company_website ?? "").trim()) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  if (!name || name.length > 200) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  if (!email || !isValidEmail(email) || email.length > 320) {
    return NextResponse.json(
      { error: "A valid email is required" },
      { status: 400 },
    );
  }
  if (!message || message.length > 5000) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("Supabase env vars not configured");
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  try {
    // Insert server-side with the service_role key (bypasses RLS). The
    // service_role key is never exposed to the browser, and RLS blocks all
    // public/anon access to the leads table.
    const res = await fetch(`${url}/rest/v1/leads`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        name,
        email,
        company: company || null,
        message,
        source: "website_form",
      }),
    });
    if (!res.ok) {
      const detail = await res.text();
      console.error("Supabase insert failed:", res.status, detail);
      return NextResponse.json({ error: "Could not save lead" }, { status: 502 });
    }
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Could not save lead" }, { status: 500 });
  }
}
