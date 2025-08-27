// app/layout.tsx
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { createClient } from "@/lib/supabase/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

async function getSettings() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("site_settings")
    .select("site_title")
    .single();
  return data ?? null;
}

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  const brand = s?.site_title?.trim() || "פרגולות מומחים";
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const titleDefault = `${brand} – פרגולות בהתאמה אישית | קבועות, נפתחות, אלומיניום ו-PVC`;
  const descriptionDefault = `פרגולות איכותיות בהתאמה אישית: אלומיניום, PVC, פרגולות נפתחות וקבועות. שירות מקצועי ואמין עם אחריות.`;

  return {
    metadataBase: new URL(base),
    title: { default: titleDefault, template: `%s | ${brand}` },
    description: descriptionDefault,
    openGraph: {
      title: titleDefault,
      description: descriptionDefault,
      url: base,
      siteName: brand,
      images: [
        {
          url: "/images/hero3.jpg",
          width: 1200,
          height: 630,
          alt: "פרגולות בהתאמה אישית",
        },
      ],
      locale: "he_IL",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: titleDefault,
      description: descriptionDefault,
      images: ["/images/hero3.jpg"],
    },
    robots: { index: true, follow: true },
    alternates: { canonical: base },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
