import type { Metadata } from "next";
import AdminSettings from "@/components/AdminSettings";

export const metadata: Metadata = { title: "הגדרות אתר" };

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">הגדרות אתר</h1>
      <AdminSettings />
    </div>
  );
}
