// app/components/GalleryPreview.tsx
import Image from "next/image";
import Link from "next/link";

type Item = { src: string; alt: string };

const items: Item[] = [
  { src: "/images/gallery/g1.jpg", alt: "פרגולה מעץ בחצר" },
  { src: "/images/gallery/g2.jpg", alt: "פרגולת אלומיניום מודרנית" },
  { src: "/images/gallery/g3.jpg", alt: "פרגולה עם כיסוי פוליקרבונט" },
  { src: "/images/gallery/g4.jpg", alt: "פרגולה למרפסת בירושלים" },
  { src: "/images/gallery/g5.jpg", alt: "פרגולה לבנה בסגנון נקי" },
  { src: "/images/gallery/g6.jpg", alt: "פרגולה מרחפת מעל דק" },
];

export function GalleryPreview() {
  return (
    <section dir="rtl" className="w-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <header className="mb-10 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
            הצצות מהעבודות שלנו
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            מגוון פרויקטים שביצענו – עץ, אלומיניום ופוליקרבונט בהתאמה מלאה
            ללקוח.
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {items.map(({ src, alt }, i) => (
            <figure
              key={i}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-200"
            >
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition duration-300 group-hover:scale-105"
                priority={i < 2}
              />
              <figcaption className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
            </figure>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/gallery"
            className="inline-flex items-center justify-center rounded-2xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-900 shadow hover:bg-gray-50 transition"
          >
            צפו בגלריה המלאה
          </Link>
        </div>
      </div>
    </section>
  );
}
