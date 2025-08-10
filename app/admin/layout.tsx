// app/admin/layout.tsx
import { ReactNode } from "react";
import AdminLayout from "@/app/layouts/AdminLayout"; // wherever you put it
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "ניהול אתר | Pargola in Jerusalem",
};

export default async function AdminSegmentLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();

  // Get the currently logged-in user
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // Redirect if not logged in or not the admin email
  if (error || !user || user.email !== "abuibrahimkaloti@gmail.com") {
    redirect("/auth/login");
  }
  // Do NOT render <html> or <body> here (only at root)
  return <AdminLayout>{children}</AdminLayout>;
}
