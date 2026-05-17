// app/admin/analytics/page.tsx
import type { Metadata } from "next";
import AnalyticsDashboard from "@/app/admin/analytics/AnalyticsDashboard";

export const metadata: Metadata = { title: "אנליטיקס" };
export const dynamic = "force-dynamic"; // always fresh

export default function AdminAnalyticsPage() {
  return <AnalyticsDashboard />;
}
