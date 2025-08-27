// components/GalleryGrid.tsx
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { TfiReload } from "react-icons/tfi";
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";

type Obj = { name: string; id: string; updated_at?: string };

const PAGE_SIZE = 16; // how many to show at a time

export default function GalleryGrid() {
  const supabase = useMemo(() => createClient(), []);
  const [allItems, setAllItems] = useState<Obj[]>([]);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const visibleItems = useMemo(
    () => allItems.slice(0, visible),
    [allItems, visible]
  );

  const walk = useCallback(
    async (prefix = ""): Promise<Obj[]> => {
      const res = await supabase.storage.from("pargola-images").list(prefix, {
        limit: 1000,
        sortBy: { column: "updated_at", order: "desc" },
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
      const items = await walk("");
      setAllItems(items);
      setVisible(PAGE_SIZE);
    } catch {
      setError("שגיאה בטעינת הגלריה");
    } finally {
      setLoading(false);
    }
  }, [walk]);

  useEffect(() => {
    load();
  }, [load]);

  // Infinite "load more" when sentinel becomes visible
  useEffect(() => {
    if (!sentinelRef.current) return;
    const el = sentinelRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible((v) => Math.min(v + PAGE_SIZE, allItems.length));
          }
        }
      },
      { rootMargin: "600px 0px 600px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [allItems.length]);

  const publicUrlFor = (path: string) =>
    supabase.storage.from("pargola-images").getPublicUrl(path).data.publicUrl;

  // Lightbox state & controls
  const [lightIdx, setLightIdx] = useState<number | null>(null);
  const openLightbox = (idx: number) => setLightIdx(idx);
  const closeLightbox = () => setLightIdx(null);
  const next = () =>
    setLightIdx((i) =>
      i === null ? i : (i + 1) % Math.max(1, visibleItems.length)
    );
  const prev = () =>
    setLightIdx((i) =>
      i === null
        ? i
        : (i - 1 + Math.max(1, visibleItems.length)) %
          Math.max(1, visibleItems.length)
    );

  // Keyboard navigation inside lightbox
  useEffect(() => {
    if (lightIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightIdx, visibleItems.length]);

  // 🔒 Lock page scroll when lightbox is open (remove overflow-y)
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (lightIdx !== null) {
      const prevHtmlOverflowY = html.style.overflowY;
      const prevBodyOverflow = body.style.overflow;
      const prevOverscroll = html.style.overscrollBehaviorY;

      html.style.overflowY = "hidden";
      body.style.overflow = "hidden";
      html.style.overscrollBehaviorY = "contain";

      return () => {
        html.style.overflowY = prevHtmlOverflowY;
        body.style.overflow = prevBodyOverflow;
        html.style.overscrollBehaviorY = prevOverscroll;
      };
    }
  }, [lightIdx]);

  return (
    <div dir="rtl" className="relative">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {loading ? "טוען..." : `${allItems.length} תמונות`}
          {error && <span className="ml-2 text-red-600">{error}</span>}
        </div>
        <button
          onClick={load}
          className="flex flex-row gap-2 items-center rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold hover:bg-gray-50"
        >
          <TfiReload />
          רענון
        </button>
      </div>

      {/* Skeleton */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div
              key={i}
              className="aspect-[4/3] rounded-2xl bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      ) : visibleItems.length === 0 ? (
        <div className="text-gray-600">אין תמונות להצגה.</div>
      ) : (
        <>
          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {visibleItems.map((obj, idx) => {
              const url = publicUrlFor(obj.id);
              return (
                <button
                  key={obj.id}
                  onClick={() => openLightbox(idx)}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-gray-200 bg-gray-100"
                  title={obj.name}
                >
                  <Image
                    src={url}
                    alt={obj.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
              );
            })}
          </div>

          {/* Sentinel (for infinite load) */}
          <div ref={sentinelRef} className="h-10" />

          {/* Manual "Load more" fallback */}
          {visible < allItems.length && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={() =>
                  setVisible((v) => Math.min(v + PAGE_SIZE, allItems.length))
                }
                className="rounded-xl border border-gray-300 px-6 py-2 text-sm font-semibold hover:bg-gray-50"
              >
                טען עוד
              </button>
            </div>
          )}
        </>
      )}

      {/* Lightbox */}
      {lightIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-[2px] flex items-center justify-center p-4 overscroll-none"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          {/* Close button (top-right to avoid overlapping left arrow) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            className="absolute top-4 right-4 md:right-6 rounded-full p-2 bg-white/10 hover:bg-white/20 z-20"
            aria-label="סגור"
          >
            <IoClose className="text-white" size={28} />
          </button>

          {/* Prev (left side) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 rounded-full p-3 bg-white/10 hover:bg-white/20 z-20"
            aria-label="הקודם"
          >
            <IoChevronBack className="text-white" size={32} />
          </button>

          {/* Next (right side) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 rounded-full p-3 bg-white/10 hover:bg-white/20 z-20"
            aria-label="הבא"
          >
            <IoChevronForward className="text-white" size={32} />
          </button>

          {/* Image container (kept below arrows) */}
          <div
            className="relative w-full max-w-6xl h-[70vh] z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={publicUrlFor(visibleItems[lightIdx].id)}
              alt={visibleItems[lightIdx].name}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
}