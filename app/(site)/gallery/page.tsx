// app/gallery/page.tsx
import GalleryGrid from "@/app/(site)/gallery/GalleryGrid";

export default function GalleryPage() {
  return (
    <main dir="rtl" className="min-h-screen">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">גלריה</h1>
          <p className="mt-2 text-gray-600">
            מבחר עבודות אחרונות שלנו. לחיצה על תמונה תפתח תצוגת מסך מלא.
          </p>
        </header>

        <GalleryGrid />
      </section>
    </main>
  );
}
