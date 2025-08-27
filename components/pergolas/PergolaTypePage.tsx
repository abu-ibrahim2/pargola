// // components/pergolas/PergolaTypePage.tsx
// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { PERGOLAS, PergolaType } from "./config";
// import { FaCheckCircle, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

// type Props = {
//   type: PergolaType;
//   whatsappNumber?: string | null;
//   phoneNumber?: string | null;
// };

// export default function PergolaTypePage({
//   type,
//   whatsappNumber,
//   phoneNumber,
// }: Props) {
//   return (
//     <main dir="rtl" className="w-screen bg-white">
//       {/* Hero */}
//       <section className="w-full bg-gray-50">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
//           <nav className="text-sm text-gray-500 mb-4">
//             <Link href="/" className="hover:text-blue-600">
//               דף הבית
//             </Link>
//             <span className="mx-2">/</span>
//             <Link href="/pergolas" className="hover:text-blue-600">
//               פרגולות
//             </Link>
//             <span className="mx-2">/</span>
//             <span className="text-gray-800">{type.title}</span>
//           </nav>

//           <div className="flex flex-col lg:flex-row gap-8 items-start">
//             <div className="flex-1">
//               <span className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1">
//                 {type.badge}
//               </span>
//               <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">
//                 {type.title}
//               </h1>
//               <p className="mt-2 text-lg text-gray-700">{type.subtitle}</p>
//               <p className="mt-4 text-gray-700 leading-relaxed">
//                 {type.description}
//               </p>

//               {/* CTA */}
//               <div className="mt-6 flex flex-wrap gap-3">
//                 {phoneNumber && (
//                   <Link
//                     href={`tel:${phoneNumber}`}
//                     className="inline-flex items-center gap-2 rounded-xl bg-blue-600 text-white px-5 py-2.5 hover:bg-blue-700 transition"
//                   >
//                     <FaPhoneAlt />
//                     קבלו ייעוץ טלפוני
//                   </Link>
//                 )}
//                 {whatsappNumber && (
//                   <Link
//                     href={`https://wa.me/${whatsappNumber.replace(
//                       /^0/,
//                       "972"
//                     )}`}
//                     target="_blank"
//                     className="inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-gray-800 hover:border-green-600 hover:text-green-600 transition"
//                   >
//                     <FaWhatsapp />
//                     דברו איתנו ב-WhatsApp
//                   </Link>
//                 )}
//               </div>
//             </div>

//             {/* Hero image */}
//             <div className="w-full lg:w-[42%] overflow-hidden rounded-2xl border bg-white shadow-sm">
//               <div className="relative w-full aspect-[4/3]">
//                 <Image
//                   src={type.images[0]?.src || "/images/placeholder.jpg"}
//                   alt={type.images[0]?.alt || type.title}
//                   fill
//                   className="object-cover"
//                   sizes="(max-width: 1024px) 100vw, 42vw"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features */}
//       <section className="w-full">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
//           <h2 className="text-2xl font-bold text-gray-900 mb-6">
//             למה לבחור בסוג הזה?
//           </h2>
//           <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {type.features.map((f) => (
//               <li
//                 key={f}
//                 className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition"
//               >
//                 <div className="flex items-start gap-3">
//                   <FaCheckCircle className="mt-1 shrink-0" />
//                   <p className="text-gray-800">{f}</p>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </section>

//       {/* Gallery */}
//       <section className="w-full bg-gray-50">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
//           <h2 className="text-2xl font-bold text-gray-900 mb-6">
//             השראה ותמונות
//           </h2>
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
//             {type.images.map((img) => (
//               <div
//                 key={img.src}
//                 className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white border group"
//               >
//                 <Image
//                   src={img.src}
//                   alt={img.alt}
//                   fill
//                   className="object-cover group-hover:scale-[1.02] transition-transform"
//                   sizes="(max-width: 1024px) 100vw, 33vw"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Bottom CTA */}
//       <section className="w-full">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
//           <div className="rounded-3xl border bg-gradient-to-br from-gray-50 to-white p-6 sm:p-10 shadow-sm">
//             <div className="flex flex-col lg:flex-row items-center gap-6">
//               <div className="flex-1">
//                 <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
//                   רוצים הצעת מחיר מותאמת לפרגולה מסוג “{type.badge}”?
//                 </h3>
//                 <p className="mt-2 text-gray-700">
//                   ספרו לנו על השטח, הגודל והסגנון – ונחזור אליכם עם הצעה מדויקת.
//                 </p>
//               </div>
//               <div className="flex gap-3">
//                 {phoneNumber && (
//                   <Link
//                     href={`tel:${phoneNumber}`}
//                     className="inline-flex items-center gap-2 rounded-xl bg-blue-600 text-white px-5 py-2.5 hover:bg-blue-700 transition"
//                   >
//                     <FaPhoneAlt />
//                     התקשרו עכשיו
//                   </Link>
//                 )}
//                 {whatsappNumber && (
//                   <Link
//                     href={`https://wa.me/${whatsappNumber.replace(
//                       /^0/,
//                       "972"
//                     )}`}
//                     target="_blank"
//                     className="inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-gray-800 hover:border-green-600 hover:text-green-600 transition"
//                   >
//                     <FaWhatsapp />
//                     WhatsApp
//                   </Link>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

// components/pergolas/PergolaTypePage.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { PergolaType } from "./config";
import { FaCheckCircle, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

type ImageItem = { src: string; alt: string };
type Props = {
  type: PergolaType;
  images: ImageItem[]; // now provided by the page (from Supabase)
  whatsappNumber?: string | null;
  phoneNumber?: string | null;
};

export default function PergolaTypePage({
  type,
  images,
  whatsappNumber,
  phoneNumber,
}: Props) {
  const hero = images[0] || { src: "/images/placeholder.jpg", alt: type.title };

  return (
    <main dir="rtl" className="w-screen bg-white">
      {/* Hero */}
      <section className="w-full bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <nav className="text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-blue-600">
              דף הבית
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800">{type.title}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              <span className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1">
                {type.badge}
              </span>
              <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">
                {type.title}
              </h1>
              <p className="mt-2 text-lg text-gray-700">{type.subtitle}</p>
              <p className="mt-4 text-gray-700 leading-relaxed">
                {type.description}
              </p>

              {/* CTA */}
              <div className="mt-6 flex flex-wrap gap-3">
                {phoneNumber && (
                  <Link
                    href={`tel:${phoneNumber}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 text-white px-5 py-2.5 hover:bg-blue-700 transition"
                  >
                    <FaPhoneAlt />
                    קבלו ייעוץ טלפוני
                  </Link>
                )}
                {whatsappNumber && (
                  <Link
                    href={`https://wa.me/${whatsappNumber.replace(
                      /^0/,
                      "972"
                    )}`}
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-gray-800 hover:border-green-600 hover:text-green-600 transition"
                  >
                    <FaWhatsapp />
                    דברו איתנו ב-WhatsApp
                  </Link>
                )}
              </div>
            </div>

            {/* Hero image */}
            <div className="w-full lg:w-[42%] overflow-hidden rounded-2xl border bg-white shadow-sm">
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={hero.src}
                  alt={hero.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            למה לבחור בסוג הזה?
          </h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {type.features.map((f) => (
              <li
                key={f}
                className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="mt-1 shrink-0" />
                  <p className="text-gray-800">{f}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Gallery */}
      <section className="w-full bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            השראה ותמונות
          </h2>

          {images.length === 0 ? (
            <div className="rounded-xl border bg-white p-6 text-gray-600">
              אין תמונות לזו הקטגוריה עדיין. בקרוב נעדכן!
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {images.map((img) => (
                <div
                  key={img.src}
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white border group"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="rounded-3xl border bg-gradient-to-br from-gray-50 to-white p-6 sm:p-10 shadow-sm">
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  רוצים הצעת מחיר מותאמת לפרגולה מסוג “{type.badge}”?
                </h3>
                <p className="mt-2 text-gray-700">
                  ספרו לנו על השטח, הגודל והסגנון – ונחזור אליכם עם הצעה מדויקת.
                </p>
              </div>
              <div className="flex gap-3">
                {phoneNumber && (
                  <Link
                    href={`tel:${phoneNumber}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 text-white px-5 py-2.5 hover:bg-blue-700 transition"
                  >
                    <FaPhoneAlt />
                    התקשרו עכשיו
                  </Link>
                )}
                {whatsappNumber && (
                  <Link
                    href={`https://wa.me/${whatsappNumber.replace(
                      /^0/,
                      "972"
                    )}`}
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-gray-800 hover:border-green-600 hover:text-green-600 transition"
                  >
                    <FaWhatsapp />
                    WhatsApp
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
