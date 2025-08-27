// // app/api/analytics/stats/route.ts
// export const runtime = "nodejs";
// export const dynamic = "force-dynamic";

// import { NextRequest, NextResponse } from "next/server";
// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!
// );

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const period = Number(searchParams.get("period") || 30);
//   const since = new Date();
//   since.setDate(since.getDate() - period);

//   const { data: events = [] } = await supabase
//     .from("analytics_events")
//     .select("*")
//     .gte("created_at", since.toISOString());

//   const filtered = (events as any[]).filter(
//     (e) =>
//       typeof e.pathname === "string" &&
//       !e.pathname.startsWith("/admin") &&
//       !e.pathname.startsWith("/auth")
//   );

//   const totalPageViews = filtered.length;

//   const uniq = new Set<string>();
//   const activeNowSet = new Set<string>();
//   const now = Date.now();

//   const topPagesMap = new Map<string, number>();
//   const topRefMap = new Map<string, number>();
//   const last7Map = new Map<string, number>();
//   for (let i = 6; i >= 0; i--) {
//     const d = new Date();
//     d.setDate(d.getDate() - i);
//     last7Map.set(d.toISOString().slice(0, 10), 0);
//   }

//   for (const e of filtered) {
//     if (e.visitor_id) uniq.add(e.visitor_id);
//     if (
//       e.created_at &&
//       now - new Date(e.created_at).getTime() <= 5 * 60 * 1000
//     ) {
//       if (e.session_id) activeNowSet.add(e.session_id);
//     }

//     const label = e.page_label || "עמוד";
//     topPagesMap.set(label, (topPagesMap.get(label) || 0) + 1);

//     const ref = e.referrer || "(ישיר)";
//     topRefMap.set(ref, (topRefMap.get(ref) || 0) + 1);

//     const day = (e.created_at || "").slice(0, 10);
//     if (last7Map.has(day)) last7Map.set(day, (last7Map.get(day) || 0) + 1);
//   }

//   const topPages = [...topPagesMap.entries()]
//     .sort((a, b) => b[1] - a[1])
//     .slice(0, 5)
//     .map(([name, count]) => ({ name, count })); // 👈 name = human label

//   const topReferrers = [...topRefMap.entries()]
//     .sort((a, b) => b[1] - a[1])
//     .slice(0, 5)
//     .map(([referrer, count]) => ({ referrer, count }));

//   const last7Days = [...last7Map.entries()].map(([date, count]) => ({
//     date,
//     count,
//   }));

//   return NextResponse.json({
//     totalPageViews,
//     uniqueVisitors: uniq.size,
//     activeNow: activeNowSet.size,
//     topPages,
//     topReferrers,
//     last7Days,
//   });
// }

// app/api/analytics/stats/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { labelFor, shouldSkipPath } from "@/lib/analytics/labels";

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing Supabase env vars: set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
  }
  return createClient(url, key);
}

export async function GET(req: NextRequest) {
  const supabase = getClient();
  const { searchParams } = new URL(req.url);
  const period = Number(searchParams.get("period") || 30);

  const since = new Date();
  since.setDate(since.getDate() - period);

  const { data: events = [] } = await supabase
    .from("analytics_events")
    .select("*")
    .gte("created_at", since.toISOString());

  const filtered = (events as any[]).filter(
    (e) => typeof e.pathname === "string" && !shouldSkipPath(e.pathname)
  );

  const totalPageViews = filtered.length;
  const uniq = new Set<string>();
  const activeNowSet = new Set<string>();
  const now = Date.now();

  const topPagesMap = new Map<string, number>();
  const topRefMap = new Map<string, number>();

  // init last 7 days
  const last7Map = new Map<string, number>();
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    last7Map.set(d.toISOString().slice(0, 10), 0);
  }

  for (const e of filtered) {
    if (e.visitor_id) uniq.add(e.visitor_id);
    if (
      e.created_at &&
      now - new Date(e.created_at).getTime() <= 5 * 60 * 1000
    ) {
      if (e.session_id) activeNowSet.add(e.session_id);
    }

    const label = e.page_label || labelFor(e.pathname, "");
    topPagesMap.set(label, (topPagesMap.get(label) || 0) + 1);

    const ref = e.referrer || "(ישיר)";
    topRefMap.set(ref, (topRefMap.get(ref) || 0) + 1);

    const day = (e.created_at || "").slice(0, 10);
    if (last7Map.has(day)) last7Map.set(day, (last7Map.get(day) || 0) + 1);
  }

  const topPages = [...topPagesMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));

  const topReferrers = [...topRefMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([referrer, count]) => ({ referrer, count }));

  const last7Days = [...last7Map.entries()].map(([date, count]) => ({
    date,
    count,
  }));

  return NextResponse.json({
    totalPageViews,
    uniqueVisitors: uniq.size,
    activeNow: activeNowSet.size,
    topPages,
    topReferrers,
    last7Days,
  });
}
