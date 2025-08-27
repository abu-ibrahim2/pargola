// app/admin/analytics/page.tsx
import AnalyticsDashboard from "@/app/admin/analytics/AnalyticsDashboard";

export const dynamic = "force-dynamic"; // always fresh

export default function AdminAnalyticsPage() {
  return <AnalyticsDashboard />;
}
