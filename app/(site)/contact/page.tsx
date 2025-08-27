// // app/contact/page.tsx
// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import {
//   FaPhoneAlt,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaWhatsapp,
// } from "react-icons/fa";

// export default function ContactPage() {
//   const [submitting, setSubmitting] = useState(false);

//   async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setSubmitting(true);
//     const form = e.currentTarget;
//     const data = Object.fromEntries(new FormData(form).entries());
//     // TODO: send to Supabase / email
//     console.log("Contact form:", data);
//     await new Promise((r) => setTimeout(r, 600));
//     setSubmitting(false);
//     alert("תודה! נחזור אליכם בהקדם.");
//     form.reset();
//   }

//   return (
//     <main dir="rtl" className="w-screen bg-white">
//       <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
//         <header className="mb-10 text-center">
//           <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
//             צרו קשר
//           </h1>
//           <p className="mt-3 text-gray-600">
//             נשמח לייעץ, למדוד ולהציע פתרון שמתאים בדיוק לחלל שלכם.
//           </p>
//         </header>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Left: details */}
//           <div className="space-y-5">
//             <InfoRow
//               icon={<FaPhoneAlt />}
//               text="050-000-0000"
//               href="tel:0500000000"
//             />
//             <InfoRow
//               icon={<FaEnvelope />}
//               text="info@pargola-jerusalem.co.il"
//               href="mailto:info@pargola-jerusalem.co.il"
//             />
//             <InfoRow icon={<FaMapMarkerAlt />} text="ירושלים והסביבה" />

//             <a
//               href={`https://wa.me/972500000000?text=${encodeURIComponent(
//                 "היי! אשמח להצעת מחיר לפרגולה בירושלים."
//               )}`}
//               target="_blank"
//               className="inline-flex items-center gap-2 rounded-2xl bg-green-600 px-6 py-3 font-semibold text-white shadow hover:opacity-90 transition w-fit"
//             >
//               <FaWhatsapp className="h-5 w-5" />
//               וואטסאפ מהיר
//             </a>

//             {/* Map (replace src with your location or hide if not needed) */}
//             <div className="mt-6 overflow-hidden rounded-3xl ring-1 ring-gray-200">
//               <iframe
//                 title="map"
//                 src="https://www.google.com/maps?q=Jerusalem&output=embed"
//                 className="w-full h-64"
//                 loading="lazy"
//               />
//             </div>
//           </div>

//           {/* Right: form */}
//           <form
//             onSubmit={onSubmit}
//             className="rounded-3xl border border-gray-200 p-6 shadow-sm"
//           >
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <Field label="שם מלא" name="fullName" required />
//               <Field label="טלפון" name="phone" type="tel" required />
//             </div>

//             <div className="mt-4">
//               <Field label="אימייל (לא חובה)" name="email" type="email" />
//             </div>

//             <div className="mt-4">
//               <label className="mb-1 block text-sm font-medium text-gray-700">
//                 מה תרצו לבנות?
//               </label>
//               <textarea
//                 name="message"
//                 rows={6}
//                 className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
//                 placeholder="ספרו לנו על הפרויקט, מידות משוערות, חומרים מועדפים ועוד…"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={submitting}
//               className="mt-6 w-full rounded-2xl bg-black px-6 py-3 font-semibold text-white shadow hover:opacity-90 transition disabled:opacity-50"
//             >
//               {submitting ? "שולח..." : "שלחו פנייה"}
//             </button>

//             <p className="mt-4 text-xs text-gray-500">
//               בלחיצה על “שלחו פנייה” הינכם מאשרים יצירת קשר בהתאם{" "}
//               <Link href="/privacy" className="underline">
//                 למדיניות הפרטיות
//               </Link>
//               .
//             </p>
//           </form>
//         </div>
//       </section>
//     </main>
//   );
// }

// function InfoRow({
//   icon,
//   text,
//   href,
// }: {
//   icon: React.ReactNode;
//   text: string;
//   href?: string;
// }) {
//   const content = (
//     <div className="flex items-center gap-3">
//       <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 ring-1 ring-gray-200">
//         {icon}
//       </span>
//       <span className="text-gray-800">{text}</span>
//     </div>
//   );
//   return href ? (
//     <a href={href} className="block hover:opacity-90 transition">
//       {content}
//     </a>
//   ) : (
//     content
//   );
// }

// function Field({
//   label,
//   name,
//   type = "text",
//   required,
// }: {
//   label: string;
//   name: string;
//   type?: string;
//   required?: boolean;
// }) {
//   return (
//     <div>
//       <label className="mb-1 block text-sm font-medium text-gray-700">
//         {label}
//       </label>
//       <input
//         type={type}
//         name={name}
//         required={required}
//         className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
//       />
//     </div>
//   );
// }

import Contact from "@/components/ContactSection";

export default function ContactPage() {
  return <Contact asPage />;
}
