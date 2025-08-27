// app/api/analytics/track/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { labelFor, shouldSkipPath } from "@/lib/analytics/labels";

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY; // server-only
  if (!url || !key) {
    throw new Error(
      "Missing Supabase env vars: set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
  }
  return createClient(url, key);
}

export async function POST(req: NextRequest) {
  const {
    pathname = "/",
    title = "",
    referrer = "",
    lang = "",
    timezone = "",
    screen_w = 0,
    screen_h = 0,
  } = (await req.json().catch(() => ({}))) || {};

  // server guard too
  if (shouldSkipPath(String(pathname))) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const supabase = getClient();
  const ua = req.headers.get("user-agent") || "";
  const page_label = labelFor(String(pathname), String(title));

  const vid = req.cookies.get("vid")?.value ?? crypto.randomUUID();
  const sid = req.cookies.get("sid")?.value ?? crypto.randomUUID();

  await supabase.from("analytics_events").insert({
    pathname: String(pathname),
    referrer: String(referrer),
    lang: String(lang),
    timezone: String(timezone),
    screen_w: Number(screen_w) || 0,
    screen_h: Number(screen_h) || 0,
    user_agent: ua,
    visitor_id: vid,
    session_id: sid,
    page_label,
  });

  const res = NextResponse.json({ ok: true });
  const secure = process.env.NODE_ENV === "production";
  res.cookies.set("vid", vid, {
    httpOnly: true,
    sameSite: "lax",
    secure,
    maxAge: 60 * 60 * 24 * 180,
    path: "/",
  });
  res.cookies.set("sid", sid, {
    httpOnly: true,
    sameSite: "lax",
    secure,
    maxAge: 60 * 30,
    path: "/",
  });
  return res;
}
