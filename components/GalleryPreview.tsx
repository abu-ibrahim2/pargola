// app/components/GalleryPreview.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Obj = { name: string; id: string; updated_at?: string };

const PREVIEW_COUNT = 8; // how many images to show on the homepage

export function GalleryPreview() {
  const supabase = useMemo(() => createClient(), []);
  const [items, setItems] = useState<Obj[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Walk bucket folders recursively and collect files
  const walk = useCallback(
    async (prefix = ""): Promise<Obj[]> => {
      const res = await supabase.storage.from("pargola-images").list(prefix, {
        limit: 1000,
        sortBy: { column: "updated_at", order: "desc" }, // newest first
      });
      if (res.error || !res.data) return [];
      const out: Obj[] = [];
      for (const e of res.data) {
        if ((e as any).id) {
          out.push({
            name: e.name,
            id: (prefix ? `${prefix}/` : "") + e.name,
            updated_at: (e as any).updated_at,
          });
        } else if (e.name) {
          const nested = await walk(prefix ? `${prefix}/${e.name}` : e.name);
          out.push(...nested);
        }
      }
      return out;
    },
    [supabase]
  );

  const load = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const all = await walk("");
      setItems(all.slice(0, PREVIEW_COUNT)); // only keep the most recent N
    } catch {
      setError("שגיאה בטעינת התמונות");
    } finally {
      setLoading(false);
    }
  }, [walk]);

  useEffect(() => {
    load();
  }, [load]);

  const publicUrlFor = (path: string) =>
    supabase.storage.from("pargola-images").getPublicUrl(path).data.publicUrl;

  const altFromName = (name: string) =>
    name.replace(/\.[^.]+$/, "").replace(/[-_.]+/g, " ");

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

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {Array.from({ length: PREVIEW_COUNT }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] rounded-2xl bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center text-gray-600">
            אין תמונות להצגה כרגע.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {items.map((obj) => {
              const url = publicUrlFor(obj.id);
              return (
                <figure
                  key={obj.id}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-gray-200 bg-gray-100 shadow-sm transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <Image
                    src={url}
                    alt={altFromName(obj.name)}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                  {/* subtle gradient overlay */}
                  <figcaption className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </figure>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/gallery"
            className="inline-flex items-center justify-center rounded-2xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-900 shadow hover:bg-gray-50 transition"
          >
            צפו בגלריה המלאה
          </Link>
        </div>

        {/* Error (non-intrusive) */}
        {error && (
          <p className="mt-4 text-center text-sm text-red-600">{error}</p>
        )}
      </div>
    </section>
  );
}
