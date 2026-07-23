import { NextResponse } from "next/server";

// Nexus Method Lead Pipeline list (ClickUp: Nexus Method → Pipeline → Lead Pipeline)
const LEAD_PIPELINE_LIST_ID = process.env.CLICKUP_LEAD_LIST_ID || "901416970838";

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

  const token = process.env.CLICKUP_TOKEN;
  if (!token) {
    console.error("CLICKUP_TOKEN is not configured");
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  const description = [
    "New website lead from nexusmethod.ai.",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "(not provided)"}`,
    "",
    "What they're dealing with:",
    message,
  ].join("\n");

  try {
    const res = await fetch(
      `https://api.clickup.com/api/v2/list/${LEAD_PIPELINE_LIST_ID}/task`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `Website lead: ${name}${company ? ` (${company})` : ""}`,
          description,
        }),
      },
    );
    if (!res.ok) {
      const detail = await res.text();
      console.error("ClickUp task create failed:", res.status, detail);
      return NextResponse.json({ error: "Could not save lead" }, { status: 502 });
    }
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Could not save lead" }, { status: 500 });
  }
}
