// app/gallery/GalleryLightbox.tsx
"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaTimes, FaChevronRight, FaChevronLeft } from "react-icons/fa";

export default function GalleryLightbox({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [items, setItems] = useState<{ url: string; alt: string }[]>([]);

  // Extract image urls from buttons inside children on mount
  useEffect(() => {
    if (!containerRef.current) return;
    const btns = Array.from(
      containerRef.current.querySelectorAll<HTMLButtonElement>(
        "[data-gallery-index]"
      )
    );
    const imgs = btns.map((btn) => {
      const img = btn.querySelector("img");
      const url = img?.getAttribute("src") || "";
      const alt = img?.getAttribute("alt") || "";
      return { url, alt };
    });
    setItems(imgs);

    // Wire clicks
    const onClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const btn = target.closest(
        "[data-gallery-index]"
      ) as HTMLButtonElement | null;
      if (!btn) return;
      const i = Number(btn.dataset.galleryIndex || 0);
      setIndex(i);
      setOpen(true);
    };

    containerRef.current.addEventListener("click", onClick);
    return () => containerRef.current?.removeEventListener("click", onClick);
  }, []);

  const onNext = useCallback(() => {
    setIndex((i) => (i + 1) % items.length);
  }, [items.length]);
  const onPrev = useCallback(() => {
    setIndex((i) => (i - 1 + items.length) % items.length);
  }, [items.length]);

  // Close on ESC, navigate arrows
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onNext, onPrev]);

  const current = useMemo(() => items[index], [items, index]);

  return (
    <div ref={containerRef}>
      {children}

      {open && current && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute top-4 left-4 rtl:right-4 rtl:left-auto text-white/80 hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
          >
            <FaTimes className="h-6 w-6" />
          </button>

          <button
            type="button"
            aria-label="Previous"
            className="absolute left-4 rtl:right-auto rtl:left-auto rtl:left-4 text-white/80 hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
          >
            <FaChevronLeft className="h-7 w-7" />
          </button>

          <button
            type="button"
            aria-label="Next"
            className="absolute right-4 rtl:left-auto rtl:right-4 text-white/80 hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
          >
            <FaChevronRight className="h-7 w-7" />
          </button>

          <div
            className="relative w-full max-w-5xl aspect-[16/10]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={current.url}
              alt={current.alt}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
}
