// app/admin/gallery/AdminGalleryGrid.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { TfiReload } from "react-icons/tfi";

import { createClient } from "@/lib/supabase/client";

type Obj = { name: string; id: string; updated_at?: string };

export default function AdminGalleryGrid() {
  const supabase = useMemo(() => createClient(), []);
  const [items, setItems] = useState<Obj[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const walk = async (prefix = ""): Promise<Obj[]> => {
    const res = await supabase.storage.from("pargola-images").list(prefix, {
      limit: 1000,
      sortBy: { column: "updated_at", order: "desc" },
    });
    if (res.error || !res.data) return [];
    const out: Obj[] = [];
    for (const e of res.data) {
      // folder if no id; file if has id
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
  };

  const load = async () => {
    setLoading(true);
    const all = await walk("");
    setItems(all);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const publicUrlFor = (path: string) =>
    supabase.storage.from("pargola-images").getPublicUrl(path).data.publicUrl;

  const remove = async (path: string) => {
    const ok = window.confirm("האם למחוק את התמונה הזאת לצמיתות?");
    if (!ok) return;
    setDeleting(path);
    await supabase.storage.from("pargola-images").remove([path]);
    setItems((s) => s.filter((x) => x.id !== path));
    setDeleting(null);
  };

  return (
    <div dir="rtl" className="p-6">
      <div className="mb-4 flex items-center justify-between">
        {/* no title; compact tools on the left */}
        <div className="text-sm text-gray-500">
          {loading ? "טוען..." : `${items.length} תמונות`}
        </div>
        <button
          onClick={load}
          className="flex flex-row gap-2 items-center rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold hover:bg-gray-50"
        >
          <TfiReload />
          רענון
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[4/3] rounded-2xl bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-gray-600">אין תמונות עדיין.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((obj) => {
            const url = publicUrlFor(obj.id);
            return (
              <div
                key={obj.id}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-gray-200 bg-gray-100"
                title={obj.name}
              >
                <Image src={url} alt={obj.name} fill className="object-cover" />
                {/* hover overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity group-hover:opacity-100" />
                {/* bottom bar */}
                <div className="absolute inset-x-2 bottom-2 flex items-center gap-2">
                  <div className="min-w-0 flex-1 rounded-lg bg-black/55 px-2 py-1 text-[11px] text-white/90 backdrop-blur-sm">
                    <span className="block truncate">{obj.name}</span>
                  </div>
                  <button
                    onClick={() => remove(obj.id)}
                    disabled={deleting === obj.id}
                    className="rounded-lg bg-red-600 px-3 py-1 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-60"
                  >
                    {deleting === obj.id ? "מוחק..." : "מחק"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}