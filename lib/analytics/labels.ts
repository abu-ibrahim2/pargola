// lib/analytics/labels.ts

// paths to skip from analytics (admin/auth)
export function shouldSkipPath(pathname: string) {
  return /^\/(admin|auth)(\/|$)/.test(pathname || "");
}

// mapping from path → human label (covers Hebrew/English variants)
const PATH_LABELS: Array<[RegExp, string]> = [
  [/^\/$/, "דף הבית"],
  [/^\/about(\/|$)|^\/אודות(\/|$)/, "אודות"],
  [/^\/contact(\/|$)|^\/צור-קשר(\/|$)|^\/צור_קשר(\/|$)/, "צור קשר"],
  [/^\/gallery(\/|$)|^\/גלריה(\/|$)/, "גלריה"],
  [/^\/services(\/|$)|^\/שירותים(\/|$)/, "שירותים"],
];

// clean up raw <title> like "Page | Site Name"
function cleanTitle(title?: string) {
  const t = (title || "").trim();
  if (!t) return "";
  // ignore generic starter titles
  if (/Next\.js and Supabase Starter Kit/i.test(t)) return "";
  return t.replace(/\s*\|\s*.*$/, ""); // keep left side of "Title | Site"
}

// final label resolver used by both routes
export function labelFor(pathname: string, title?: string) {
  // 1) path mapping first
  for (const [re, label] of PATH_LABELS) if (re.test(pathname)) return label;

  // 2) cleaned title if present
  const cleaned = cleanTitle(title);
  if (cleaned) return cleaned;

  // 3) last-segment fallback (prettified)
  const seg = decodeURIComponent(
    (pathname || "").split("/").filter(Boolean).pop() || ""
  );
  if (!seg) return "דף הבית";
  return seg.replace(/[-_]/g, " ");
}
