"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

type UploadItem = {
  file: File;
  preview: string;
  progress: number;
  status: "idle" | "uploading" | "done" | "error";
  error?: string;
  path?: string; // stored path in bucket
};

// match your bucket name from Supabase
const BUCKET = "pargola-images";

// slugs used by /pergolas/[slug] pages
type TypeSlug = "fixed" | "opening" | "pvc" | "aluminum-auto" | "european";

const TYPE_OPTIONS: { slug: TypeSlug; label: string }[] = [
  { slug: "fixed", label: "פרגולה קבועה" },
  { slug: "opening", label: "פרגולה נפתחת" },
  { slug: "pvc", label: "פרגולה נפתחת PVC" },
  { slug: "aluminum-auto", label: "פרגולה נפתחת מאלומיניום אוטומטית" },
  { slug: "european", label: "מערכת אירופאית" },
];

export default function AdminGalleryUploader() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [items, setItems] = useState<UploadItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [typeSlug, setTypeSlug] = useState<TypeSlug>("fixed"); // default, can change
  const supabase = useMemo(() => createClient(), []);

  const onFiles = useCallback((files: FileList | null) => {
    if (!files?.length) return;
    const imgs = Array.from(files).filter((f) => /image\//i.test(f.type));
    const mapped = imgs.map((f) => ({
      file: f,
      preview: URL.createObjectURL(f),
      progress: 0,
      status: "idle" as const,
    }));
    setItems((prev) => [...prev, ...mapped]);
  }, []);

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onFiles(e.dataTransfer.files);
  };

  const uploadAll = async () => {
    if (!items.length || uploading) return;
    setUploading(true);

    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = `${now.getMonth() + 1}`.padStart(2, "0");

    const updates = [...items];

    for (let i = 0; i < updates.length; i++) {
      const it = updates[i];
      try {
        it.status = "uploading";
        it.progress = 50; // simple midpoint (SDK has no streaming progress)
        setItems([...updates]);

        const safeName = it.file.name.replace(/\s+/g, "-").toLowerCase();
        const filename = `${crypto.randomUUID()}-${safeName}`;
        // Path the pergola pages expect:
        // pargola-images/pergolas/<slug>/<YYYY>/<MM>/<uuid>-<name>
        const path = `pergolas/${typeSlug}/${yyyy}/${mm}/${filename}`;

        const { error } = await supabase.storage
          .from(BUCKET)
          .upload(path, it.file, {
            upsert: false,
            contentType: it.file.type,
          });

        if (error) throw error;

        it.progress = 100;
        it.status = "done";
        it.path = path;
        setItems([...updates]);
      } catch (err: any) {
        it.status = "error";
        it.error = err?.message || "שגיאה";
        setItems([...updates]);
      }
    }

    setUploading(false);
  };

  const clearAll = () => {
    items.forEach((i) => URL.revokeObjectURL(i.preview));
    setItems([]);
  };

  return (
    <div className="rounded-3xl border border-gray-200 p-6 shadow-sm" dir="rtl">
      {/* Type selector */}
      <div className="mb-4 grid gap-2">
        <label
          htmlFor="typeSlug"
          className="text-sm font-semibold text-gray-800"
        >
          סוג פרגולה (יעד העלאה)
        </label>
        <select
          id="typeSlug"
          value={typeSlug}
          onChange={(e) => setTypeSlug(e.target.value as TypeSlug)}
          className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm"
        >
          {TYPE_OPTIONS.map((t) => (
            <option key={t.slug} value={t.slug}>
              {t.label}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500">
          התמונות יישמרו ב־
          <span className="font-mono">
            {` ${BUCKET}/pergolas/${typeSlug}/YYYY/MM/`}
          </span>
        </p>
      </div>

      {/* Dropzone */}
      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-300 p-10 text-center hover:border-gray-400 transition"
      >
        <div className="text-gray-800 font-semibold">גררו תמונות לכאן</div>
        <div className="text-sm text-gray-600">או</div>
        <button
          onClick={() => inputRef.current?.click()}
          className="rounded-xl bg-black px-4 py-2 text-white text-sm font-semibold hover:opacity-90 transition"
        >
          בחרו קבצים
        </button>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          className="sr-only"
          onChange={(e) => onFiles(e.target.files)}
        />
      </div>

      {items.length > 0 && (
        <>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((it, idx) => (
              <div
                key={idx}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-gray-200 bg-gray-100"
              >
                <Image
                  src={it.preview}
                  alt=""
                  fill
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0">
                  {it.status === "uploading" && (
                    <div className="h-1 bg-gray-200">
                      <div
                        className="h-1 bg-black transition-all"
                        style={{ width: `${it.progress}%` }}
                      />
                    </div>
                  )}
                  {it.status === "error" && (
                    <div className="bg-red-600 text-white text-xs px-2 py-1">
                      {it.error ?? "שגיאה"}
                    </div>
                  )}
                  {it.status === "done" && (
                    <div className="bg-green-600 text-white text-xs px-2 py-1">
                      הועלה ✓
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={uploadAll}
              disabled={uploading || items.length === 0}
              className="rounded-xl bg-black px-5 py-2 text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {uploading ? "מעלה..." : "העלה הכל"}
            </button>
            <button
              onClick={clearAll}
              disabled={uploading}
              className="rounded-xl border border-gray-300 px-5 py-2 font-semibold hover:bg-gray-50 transition disabled:opacity-50"
            >
              נקה
            </button>
          </div>

          {/* (Optional) show where files will be stored */}
          <div className="mt-2 text-xs text-gray-500">
            יעד העלאה:{" "}
            <span className="font-mono">
              {`${BUCKET}/pergolas/${typeSlug}/YYYY/MM/<uuid>-<filename>`}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
