import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { Services } from "@/components/Services";
import { GalleryPreview } from "@/components/GalleryPreview";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import Contact from "@/components/ContactSection";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: {
    absolute:
      "פרגולות מומחים – פרגולות בהתאמה אישית | קבועות, נפתחות, אלומיניום ו-PVC",
  },
  description:
    "פרגולות איכותיות בהתאמה אישית בירושלים והסביבה. אלומיניום, PVC, פרגולות נפתחות וקבועות. שירות מקצועי, אחריות ולוחות זמנים ברורים.",
  alternates: { canonical: "/" },
  openGraph: {
    title:
      "פרגולות מומחים – פרגולות בהתאמה אישית | קבועות, נפתחות, אלומיניום ו-PVC",
    description:
      "פרגולות איכותיות בהתאמה אישית בירושלים והסביבה. אלומיניום, PVC, פרגולות נפתחות וקבועות. שירות מקצועי, אחריות ולוחות זמנים ברורים.",
    url: "/",
    images: [
      {
        url: "/images/hero3.jpg",
        width: 1200,
        height: 630,
        alt: "פרגולות בהתאמה אישית בירושלים",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "פרגולות מומחים – פרגולות בהתאמה אישית | קבועות, נפתחות, אלומיניום ו-PVC",
    description:
      "פרגולות איכותיות בהתאמה אישית בירושלים והסביבה. אלומיניום, PVC, פרגולות נפתחות וקבועות.",
    images: ["/images/hero3.jpg"],
  },
};

export default async function Home() {
  const settings = await getSiteSettings();
  const phoneNumber = (settings as Record<string, string | null>).phone_number ?? "0544481810";

  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 flex-col items-center">
        <Hero phoneNumber={phoneNumber} />
        <Services phoneNumber={phoneNumber} />
        <GalleryPreview />
        <WhyChooseUs phoneNumber={phoneNumber} />
        <Contact
          title="הצעת מחיר מהירה"
          subtitle="מלאו פרטים ונחזור אליכם עוד היום."
          showMap={false} // Sections often omit the map to keep the page light
          whatsappText="שלום! מעוניין בהצעת מחיר לפרגולת אלומיניום."
        />
      </div>
    </main>
  );
}
