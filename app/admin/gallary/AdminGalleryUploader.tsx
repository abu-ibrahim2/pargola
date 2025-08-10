// app/admin/gallery/AdminGalleryUploader.tsx
"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type UploadItem = {
  file: File;
  preview: string;
  progress: number;
  status: "idle" | "uploading" | "done" | "error";
  error?: string;
};

export default function AdminGalleryUploader() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [items, setItems] = useState<UploadItem[]>([]);
  const [uploading, setUploading] = useState(false);

  const supabase = useMemo(() => createClient(), []);

  const onFiles = useCallback((files: FileList | null) => {
    if (!files?.length) return;
    const imgs = Array.from(files).filter((f) =>
      /image\/(jpeg|png|webp|gif|avif)/i.test(f.type)
    );
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

  const toBlob = (canvas: HTMLCanvasElement, type: string, quality = 0.9) =>
    new Promise<Blob>((res) =>
      canvas.toBlob((b) => res(b as Blob), type, quality)
    );

  const resizeImage = async (file: File, maxW: number, maxH: number) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.src = objectUrl;
    await new Promise((r, rej) => {
      img.onload = () => r(true);
      img.onerror = rej;
    });

    const ratio = Math.min(maxW / img.width, maxH / img.height, 1);
    const targetW = Math.round(img.width * ratio);
    const targetH = Math.round(img.height * ratio);

    const canvas = document.createElement("canvas");
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0, targetW, targetH);

    const type = file.type === "image/png" ? "image/png" : "image/jpeg";
    const blob = await toBlob(canvas, type, 0.9);
    URL.revokeObjectURL(objectUrl);
    return blob;
  };

  const uploadAll = async () => {
    if (!items.length || uploading) return;
    setUploading(true);

    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = `${now.getMonth() + 1}`.padStart(2, "0");

    const updates = [...items];

    for (let i = 0; i < updates.length; i++) {
      updates[i].status = "uploading";
      updates[i].progress = 5;
      setItems([...updates]);

      try {
        const file = updates[i].file;
        const baseName = file.name.replace(/\.[^.]+$/, "");
        const webBlob = await resizeImage(file, 2000, 2000);
        updates[i].progress = 40;
        setItems([...updates]);
        const thumbBlob = await resizeImage(file, 500, 500);
        updates[i].progress = 65;
        setItems([...updates]);

        const webPath = `${yyyy}/${mm}/${baseName}-${Date.now()}.jpg`;
        const thumbPath = `thumbs/${yyyy}/${mm}/${baseName}-${Date.now()}.jpg`;

        const { error: webErr } = await supabase.storage
          .from("gallery")
          .upload(webPath, webBlob, { contentType: "image/jpeg" });
        if (webErr) throw webErr;
        updates[i].progress = 85;
        setItems([...updates]);

        const { error: thErr } = await supabase.storage
          .from("gallery")
          .upload(thumbPath, thumbBlob, { contentType: "image/jpeg" });
        if (thErr) throw thErr;

        updates[i].progress = 100;
        updates[i].status = "done";
        setItems([...updates]);
      } catch (err: any) {
        updates[i].status = "error";
        updates[i].error = err?.message || "שגיאה";
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
    <div className="rounded-3xl border border-gray-200 p-6 shadow-sm">
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
                <img
                  src={it.preview}
                  alt=""
                  className="h-full w-full object-cover"
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
                      שגיאה
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
              disabled={uploading}
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
        </>
      )}
    </div>
  );
}
