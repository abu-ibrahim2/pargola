import { Hero } from "@/components/hero";
import { Services } from "@/components/Services";
import { GalleryPreview } from "@/components/GalleryPreview";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Testimonials } from "@/components/Testimonials";
import Contact from "@/components/ContactSection";
// {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 flex-col items-center">
        <Hero />
        <Services />
        <GalleryPreview />
        <WhyChooseUs />
        {/* <Testimonials /> */}
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
