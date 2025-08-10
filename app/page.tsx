import { Hero } from "@/components/hero";
import { Services } from "@/components/Services";
import { GalleryPreview } from "@/components/GalleryPreview";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Testimonials } from "@/components/Testimonials";
import { ContactSection } from "@/components/ContactSection";
// {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 flex-col items-center">
        <Hero />
        <Services />
        <GalleryPreview />
        <WhyChooseUs />
        <Testimonials />
        <ContactSection />
      </div>
    </main>
  );
}