// // app/pergolas/[slug]/page.tsx
// import { notFound } from "next/navigation";
// import {
//   PERGOLAS,
//   ALL_PERGOLA_SLUGS,
//   PergolaSlug,
// } from "@/components/pergolas/config";
// import PergolaTypePage from "@/components/pergolas/PergolaTypePage";
// import { createClient } from "@/lib/supabase/server";

// // For static params (optional, helps prebuild pages)
// export function generateStaticParams() {
//   return ALL_PERGOLA_SLUGS.map((slug) => ({ slug }));
// }

// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: PergolaSlug };
// }) {
//   const data = PERGOLAS[params.slug];
//   if (!data) return {};
//   const title = `${data.title} | פרגולות`;
//   const description = data.subtitle || data.description.slice(0, 120);
//   return {
//     title,
//     description,
//     openGraph: {
//       title,
//       description,
//       images: data.images?.length ? [{ url: data.images[0].src }] : [],
//     },
//   };
// }

// export default async function Page({
//   params,
// }: {
//   params: { slug: PergolaSlug };
// }) {
//   const type = PERGOLAS[params.slug];
//   if (!type) notFound();

//   // Optional: pull phone & whatsapp from Supabase
//   const supabase = await createClient();
//   const { data } = await supabase
//     .from("site_settings")
//     .select("phone_number, whatsapp_number")
//     .eq("id", "site-default")
//     .maybeSingle();

//   return (
//     <PergolaTypePage
//       type={type}
//       phoneNumber={data?.phone_number || null}
//       whatsappNumber={data?.whatsapp_number || null}
//     />
//   );
// }

// app/pergolas/[slug]/page.tsx
import { notFound } from "next/navigation";
import {
  PERGOLAS,
  ALL_PERGOLA_SLUGS,
  PergolaSlug,
} from "@/components/pergolas/config";
import PergolaTypePage from "@/components/pergolas/PergolaTypePage";
import { createClient } from "@/lib/supabase/server";
import { listAllFilesRecursive } from "@/lib/storage/listAllFiles";

// ⚠️ match your bucket name from the screenshot:
const BUCKET = "pargola-images";

export const revalidate = 60;

export function generateStaticParams() {
  return ALL_PERGOLA_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: PergolaSlug };
}) {
  const data = PERGOLAS[params.slug];
  if (!data) return {};
  const title = `${data.title} | פרגולות`;
  const description = data.subtitle || data.description.slice(0, 120);
  return { title, description };
}

export default async function Page({
  params,
}: {
  params: { slug: PergolaSlug };
}) {
  const type = PERGOLAS[params.slug];
  if (!type) notFound();

  const supabase = await createClient();

  // Phone/WhatsApp for CTAs
  const { data: settings } = await supabase
    .from("site_settings")
    .select("phone_number, whatsapp_number")
    .eq("id", "site-default")
    .maybeSingle();

  // Recursively list files under e.g. "pergolas/fixed"
  const files = await listAllFilesRecursive(
    supabase,
    BUCKET,
    `pergolas/${type.slug}` // you can add year/month inside, the code will still find files
  );

  // Build public URLs (bucket is Public in your screenshot)
  const images = files.map((f) => {
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(f.name);
    return {
      src: data.publicUrl,
      alt: `${type.title} - ${f.name.split("/").pop()}`,
    };
  });

  return (
    <PergolaTypePage
      type={type}
      images={images}
      phoneNumber={settings?.phone_number || null}
      whatsappNumber={settings?.whatsapp_number || null}
    />
  );
}
