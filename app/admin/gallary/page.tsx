// // app/admin/gallery/page.tsx
// import { createClient } from "@/lib/supabase/server";
// import AdminGalleryUploader from "./AdminGalleryUploader";
// import GalleryAdmin from "./GalleryAdmin";

// export default async function AdminGalleryPage() {
//   const supabase = await createClient();

//   const items = await listAllImagesWithThumbs(supabase);

//   return (
//     <section dir="rtl" className="w-full">
//       <AdminGalleryUploader /> {/* Upload new images */}
//       <GalleryAdmin initialItems={items} /> {/* Manage/delete */}
//     </section>
//   );
// }

// async function listAllImagesWithThumbs(
//   supabase: ReturnType<typeof createClient>
// ) {
//   // helper to list a folder
//   async function list(path: string) {
//     const { data, error } = await supabase.storage.from("gallery").list(path, {
//       limit: 1000,
//       sortBy: { column: "name", order: "desc" },
//     });
//     if (error) return [];
//     return data ?? [];
//   }

//   // gather web images from /YYYY/MM
//   const root = await list(""); // returns files/folders at root (years + maybe files)
//   const years = root.filter((e) => e.id === "folder" && e.name !== "thumbs");

//   const webFiles: { path: string }[] = [];

//   // list each year/month
//   for (const y of years) {
//     const months = await list(`${y.name}`);
//     for (const m of months.filter((e) => e.id === "folder")) {
//       const files = await list(`${y.name}/${m.name}`);
//       for (const f of files.filter((e) => e.id === "file")) {
//         webFiles.push({ path: `${y.name}/${m.name}/${f.name}` });
//       }
//     }
//   }

//   // map to items with publicUrl and thumb
//   const items: Item[] = webFiles.map(({ path }) => {
//     const { data: webUrl } = supabase.storage
//       .from("gallery")
//       .getPublicUrl(path);
//     const thumbPath = `thumbs/${path}`;
//     const { data: thUrl } = supabase.storage
//       .from("gallery")
//       .getPublicUrl(thumbPath);
//     return {
//       name: path,
//       publicUrl: webUrl.publicUrl,
//       thumbPath,
//       thumbUrl: thUrl.publicUrl,
//     };
//   });

//   // newest first (by path naming with Date.now in your uploader)
//   return items;
// }

import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page