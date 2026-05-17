import type { Metadata } from "next";
import Contact from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "צור קשר – הצעת מחיר לפרגולה",
  description:
    "צרו קשר לקבלת הצעת מחיר מותאמת אישית לפרגולה. נחזיר תוך שעות. שירות בירושלים, בית שמש, מודיעין והסביבה.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "צור קשר – הצעת מחיר לפרגולה",
    description:
      "צרו קשר לקבלת הצעת מחיר מותאמת אישית לפרגולה. נחזיר תוך שעות.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return <Contact asPage />;
}
