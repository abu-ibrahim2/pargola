// app/admin/gallery/GalleryAdmin.tsx
"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { FaTrash } from "react-icons/fa";

type Item = {
  name: string;
  publicUrl: string;
  thumbPath?: string;
  thumbUrl?: string;
};

export default function GalleryAdmin({
  initialItems,
}: {
  initialItems: Item[];
}) {
  const supabase = useMemo(() => createClient(), []);
  const [items, setItems] = useState<Item[]>(initialItems);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [busy, setBusy] = useState(false);

  const allSelected =
    Object.keys(selected).length > 0 && Object.values(selected).every(Boolean);
  const noneSelected = !Object.values(selected).some(Boolean);

  const toggle = (name: string) => {
    setSelected((s) => ({ ...s, [name]: !s[name] }));
  };

  const toggleAll = () => {
    if (noneSelected || !allSelected) {
      // select all
      const map: Record<string, boolean> = {};
      items.forEach((it) => (map[it.name] = true));
      setSelected(map);
    } else {
      setSelected({});
    }
  };

  const removeSelected = async () => {
    const paths = items.filter((it) => selected[it.name]).map((it) => it.name);
    if (!paths.length) return;

    if (!confirm(`למחוק ${paths.length} קבצים? הפעולה בלתי הפיכה.`)) return;

    setBusy(true);
    try {
      // delete web files
      const { error: e1 } = await supabase.storage
        .from("gallery")
        .remove(paths);
      if (e1) throw e1;

      // delete thumbs if exist
      const thumbPaths = items
        .filter((it) => selected[it.name] && it.thumbPath)
        .map((it) => it.thumbPath!) as string[];
      if (thumbPaths.length) {
        await supabase.storage.from("gallery").remove(thumbPaths);
      }

      setItems((arr) => arr.filter((it) => !selected[it.name]));
      setSelected({});
    } catch (err) {
      console.error(err);
      alert("אירעה שגיאה במחיקה.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      {/* Actions */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <button
          onClick={toggleAll}
          className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold hover:bg-gray-50 transition"
        >
          {noneSelected || !allSelected ? "בחר הכל" : "בטל בחירה"}
        </button>

        <button
          onClick={removeSelected}
          disabled={noneSelected || busy}
          className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition disabled:opacity-50"
        >
          <FaTrash />
          מחק נבחרים
        </button>

        <span className="text-sm text-gray-500">
          נבחרו {Object.values(selected).filter(Boolean).length} /{" "}
          {items.length}
        </span>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-600">אין תמונות להצגה.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((it) => (
            <label
              key={it.name}
              className="group relative block aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl ring-1 ring-gray-200"
              title={it.name}
            >
              <input
                type="checkbox"
                className="peer sr-only"
                checked={!!selected[it.name]}
                onChange={() => toggle(it.name)}
              />
              <Image
                src={it.thumbUrl || it.publicUrl}
                alt={it.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
              {/* selection badge */}
              <div className="absolute top-2 right-2 rtl:left-2 rtl:right-auto">
                <span className="rounded-full bg-white/90 px-2 py-1 text-xs font-semibold ring-1 ring-gray-200 shadow peer-checked:bg-black peer-checked:text-white">
                  {selected[it.name] ? "נבחר" : "בחר"}
                </span>
              </div>
              {/* filename strip */}
              <div className="absolute inset-x-0 bottom-0 bg-black/40 px-2 py-1 text-[10px] text-white truncate">
                {it.name}
              </div>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
