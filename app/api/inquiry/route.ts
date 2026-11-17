const REQUIRED = ["name", "contact", "date", "guests", "drinkOrder"] as const;

export async function POST(request: Request) {
  const scriptUrl = process.env.INQUIRY_SCRIPT_URL;
  const secret = process.env.INQUIRY_SECRET;
  if (!scriptUrl || !secret) {
    return Response.json({ ok: false, error: "not configured" }, { status: 500 });
  }

  const data = await request.json().catch(() => null);
  if (!data || typeof data !== "object") {
    return Response.json({ ok: false, error: "invalid body" }, { status: 400 });
  }

  const required =
    data.drinkOrder === "yes" ? [...REQUIRED, "drinkTime"] : REQUIRED;
  if (required.some((field) => !String(data[field] ?? "").trim())) {
    return Response.json({ ok: false, error: "missing fields" }, { status: 400 });
  }

  const res = await fetch(scriptUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: String(data.name),
      contact: String(data.contact),
      date: String(data.date),
      guests: String(data.guests),
      drinkOrder: String(data.drinkOrder),
      drinkTime: data.drinkOrder === "yes" ? String(data.drinkTime) : "",
      message: String(data.message ?? ""),
      secret,
    }),
  });
  const result = await res.json().catch(() => null);
  if (!result?.ok) {
    return Response.json({ ok: false, error: "delivery failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
