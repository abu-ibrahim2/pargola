// app/gallery/page.tsx
import Image from "next/image";
import { createClient } from "@/lib/supabase/server"; // adjust to your setup
import GalleryLightbox from "@/app/gallery/GalleryLightbox";

type GalleryItem = {
  name: string;
  url: string;
  width?: number;
  height?: number;
};

export const revalidate = 60; // revalidate static page every 60s

export default async function GalleryPage() {
  const supabase = await createClient();

  // List files in the bucket's root. If you store in a folder, pass the path instead of "".
  const { data: files, error } = await supabase.storage
    .from("gallery")
    .list("", {
      limit: 200,
      offset: 0,
      sortBy: { column: "name", order: "desc" },
    });

  if (error) {
    console.error(error);
  }

  const items: GalleryItem[] =
    files
      ?.filter((f) => /\.(png|jpe?g|webp|gif|avif)$/i.test(f.name))
      .map((f) => {
        // PUBLIC bucket (recommended): get a stable public URL
        const { data } = supabase.storage.from("gallery").getPublicUrl(f.name);
        return { name: f.name, url: data.publicUrl };
      }) ?? [];

  return (
    <section dir="rtl" className="w-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <header className="mb-10 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
            גלריה
          </h1>
          <p className="mt-3 text-gray-600">
            כמה מעבודות הפרגולות שביצענו בירושלים והסביבה.
          </p>
        </header>

        {items.length === 0 ? (
          <p className="text-center text-gray-500">אין עדיין תמונות להצגה.</p>
        ) : (
          <GalleryGrid items={items} />
        )}
      </div>
    </section>
  );
}

function GalleryGrid({ items }: { items: { url: string; name: string }[] }) {
  return (
    <GalleryLightbox>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {items.map((it, i) => (
          <button
            key={it.name}
            data-gallery-index={i}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-gray-200"
          >
            <Image
              src={it.url}
              alt={it.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition duration-300 group-hover:scale-105"
              priority={i < 4}
            />
            <span className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
          </button>
        ))}
      </div>
    </GalleryLightbox>
  );
}
