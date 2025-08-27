// lib/site-settings.ts
import { createClient } from "@/lib/supabase/server";

export async function getSiteSettings() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", "site-default")
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch site settings:", error.message);
    return { site_title: null };
  }

  return data ?? { site_title: null };
}
