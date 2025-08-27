// // components/AnalyticsTracker.tsx
// "use client";

// import { useEffect } from "react";
// import { usePathname } from "next/navigation";

// function send(payload: any) {
//   const json = JSON.stringify(payload);
//   if ("sendBeacon" in navigator) {
//     navigator.sendBeacon(
//       "/api/analytics/track",
//       new Blob([json], { type: "application/json" })
//     );
//   } else {
//     fetch("/api/analytics/track", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: json,
//       keepalive: true,
//     });
//   }
// }

// export default function AnalyticsTracker() {
//   const pathname = usePathname();

//   useEffect(() => {
//     if (!pathname) return;

//     // ⛔️ skip admin/auth/etc.
//     if (pathname.startsWith("/admin") || pathname.startsWith("/auth")) return;

//     // only the path (no query string)
//     const cleanPath = pathname;

//     send({
//       pathname: cleanPath,
//       title: document.title || "", // 👈 use the real page title
//       referrer: document.referrer || "",
//       lang: navigator.language || "",
//       timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
//       screen_w: window.screen?.width || 0,
//       screen_h: window.screen?.height || 0,
//     });
//   }, [pathname]);

//   return null;
// }

// components/AnalyticsTracker.tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { shouldSkipPath } from "@/lib/analytics/labels";

function send(payload: any) {
  const json = JSON.stringify(payload);
  if ("sendBeacon" in navigator) {
    navigator.sendBeacon(
      "/api/analytics/track",
      new Blob([json], { type: "application/json" })
    );
  } else {
    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: json,
      keepalive: true,
    });
  }
}

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || shouldSkipPath(pathname)) return;

    send({
      pathname,
      title: document.title || "",
      referrer: document.referrer || "",
      lang: navigator.language || "",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
      screen_w: window.screen?.width || 0,
      screen_h: window.screen?.height || 0,
    });
  }, [pathname]);

  return null;
}
