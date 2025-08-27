// // app/components/Footer.tsx
// import Link from "next/link";
// import {
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaFacebookF,
//   FaInstagram,
//   FaYoutube,
//   FaWhatsapp,
// } from "react-icons/fa";

// export default function Footer() {
//   const year = new Date().getFullYear();

//   return (
//     <footer dir="rtl" className="w-screen bg-gray-950 text-gray-300 px-4">
//       {/* top */}
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
//           {/* brand */}
//           <div>
//             <h3 className="text-white text-2xl font-extrabold">
//               פרגולה בירושלים
//             </h3>
//             <p className="mt-3 text-sm text-gray-400">
//               תכנון, ייצור והתקנה של פרגולות איכות בהתאמה אישית – שירות בכל
//               ירושלים והסביבה.
//             </p>
//             <div className="mt-5 flex items-center gap-3">
//               <a
//                 href="https://wa.me/972500000000"
//                 target="_blank"
//                 className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-white text-sm font-semibold hover:opacity-90 transition"
//               >
//                 <FaWhatsapp className="h-4 w-4" />
//                 וואטסאפ מהיר
//               </a>
//               <a
//                 href="tel:0500000000"
//                 className="inline-flex items-center gap-2 rounded-xl bg-white text-gray-900 px-4 py-2 text-sm font-semibold hover:opacity-90 transition"
//               >
//                 התקשרו
//               </a>
//             </div>
//           </div>

//           {/* quick links */}
//           <div>
//             <h4 className="text-white font-semibold">ניווט</h4>
//             <ul className="mt-4 space-y-2 text-sm">
//               <li>
//                 <Link href="/" className="hover:text-white">
//                   דף הבית
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/gallery" className="hover:text-white">
//                   גלריה
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/about" className="hover:text-white">
//                   אודות
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/contact" className="hover:text-white">
//                   צור קשר
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* services */}
//           <div>
//             <h4 className="text-white font-semibold">שירותים</h4>
//             <ul className="mt-4 space-y-2 text-sm">
//               <li>
//                 <Link
//                   href="/services/custom-design"
//                   className="hover:text-white"
//                 >
//                   תכנון בהתאמה אישית
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/services/production" className="hover:text-white">
//                   ייצור פרגולות
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/services/installation"
//                   className="hover:text-white"
//                 >
//                   התקנה מקצועית
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/services/maintenance" className="hover:text-white">
//                   שירות ותחזוקה
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* contact */}
//           <div>
//             <h4 className="text-white font-semibold">יצירת קשר</h4>
//             <ul className="mt-4 space-y-3 text-sm">
//               <li className="flex items-center gap-3">
//                 <FaPhone className="h-4 w-4 text-gray-400" />
//                 <a href="tel:0500000000" className="hover:text-white">
//                   050-000-0000
//                 </a>
//               </li>
//               <li className="flex items-center gap-3">
//                 <FaEnvelope className="h-4 w-4 text-gray-400" />
//                 <a
//                   href="mailto:info@pargola-jerusalem.co.il"
//                   className="hover:text-white"
//                 >
//                   info@pargola-jerusalem.co.il
//                 </a>
//               </li>
//               <li className="flex items-center gap-3">
//                 <FaMapMarkerAlt className="h-4 w-4 text-gray-400" />
//                 <span>ירושלים והסביבה</span>
//               </li>
//             </ul>

//             {/* socials */}
//             <div className="mt-5 flex items-center gap-4">
//               <a href="#" aria-label="Facebook" className="hover:text-white">
//                 <FaFacebookF className="h-5 w-5" />
//               </a>
//               <a href="#" aria-label="Instagram" className="hover:text-white">
//                 <FaInstagram className="h-5 w-5" />
//               </a>
//               <a href="#" aria-label="YouTube" className="hover:text-white">
//                 <FaYoutube className="h-5 w-5" />
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* divider */}
//       <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

//       {/* bottom */}
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
//           <p className="text-xs text-gray-400">
//             © {year} פרגולה בירושלים. כל הזכויות שמורות.
//           </p>
//           <div className="flex items-center gap-4 text-xs text-gray-400">
//             <Link href="/privacy" className="hover:text-white">
//               מדיניות פרטיות
//             </Link>
//             <span className="opacity-50">•</span>
//             <Link href="/terms" className="hover:text-white">
//               תנאים והגבלות
//             </Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// app/components/Footer.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import { createClient } from "@/lib/supabase/client";

type SiteSettings = {
  site_title: string | null;
  address: string | null;
  contact_email: string | null;
  phone_number: string | null;
  whatsapp_number: string | null;
  facebook_url: string | null;
  instagram_handle: string | null;
};

export default function Footer() {
  const supabase = useMemo(() => createClient(), []);
  const [settings, setSettings] = useState<SiteSettings>({
    site_title: "",
    address: "",
    contact_email: "",
    phone_number: "",
    whatsapp_number: "",
    facebook_url: "",
    instagram_handle: "",
  });
  const [loading, setLoading] = useState(true);

  const year = new Date().getFullYear();

  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("site_settings")
        .select(
          "site_title, address, contact_email, phone_number, whatsapp_number, facebook_url, instagram_handle"
        )
        .eq("id", "site-default")
        .maybeSingle();

      if (!error && data) {
        setSettings(data);
      }
      setLoading(false);
    };

    loadSettings();
  }, [supabase]);

  return (
    <footer dir="rtl" className="w-screen bg-gray-950 text-gray-300 px-4">
      {/* top */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* brand */}
          <div>
            <h3 className="text-white text-2xl font-extrabold">
              {loading ? "..." : settings.site_title || "האתר"}
            </h3>
            <p className="mt-3 text-sm text-gray-400">
              תכנון, ייצור והתקנה של פרגולות איכות בהתאמה אישית – שירות בכל
              ירושלים והסביבה.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {settings.whatsapp_number && (
                <a
                  href={`https://wa.me/${settings.whatsapp_number.replace(
                    /^0/,
                    "972"
                  )}`}
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-white text-sm font-semibold hover:opacity-90 transition"
                >
                  <FaWhatsapp className="h-4 w-4" />
                  וואטסאפ מהיר
                </a>
              )}
              {settings.phone_number && (
                <a
                  href={`tel:${settings.phone_number}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-white text-gray-900 px-4 py-2 text-sm font-semibold hover:opacity-90 transition"
                >
                  התקשרו
                </a>
              )}
            </div>
          </div>

          {/* quick links */}
          <div>
            <h4 className="text-white font-semibold">ניווט</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white">
                  דף הבית
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white">
                  גלריה
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  אודות
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  צור קשר
                </Link>
              </li>
            </ul>
          </div>

          {/* services */}
          <div>
            <h4 className="text-white font-semibold">שירותים</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                  תכנון בהתאמה אישית
              </li>
              <li>
                  ייצור פרגולות
              </li>
              <li>
                  התקנה מקצועית
              </li>
              <li>
                  שירות ותחזוקה
              </li>
            </ul>
          </div>

          {/* contact */}
          <div>
            <h4 className="text-white font-semibold">יצירת קשר</h4>
            <ul className="mt-4 space-y-3 text-sm">
              {settings.phone_number && (
                <li className="flex items-center gap-3">
                  <FaPhone className="h-4 w-4 text-gray-400" />
                  <a
                    href={`tel:${settings.phone_number}`}
                    className="hover:text-white"
                  >
                    {settings.phone_number}
                  </a>
                </li>
              )}
              {settings.contact_email && (
                <li className="flex items-center gap-3">
                  <FaEnvelope className="h-4 w-4 text-gray-400" />
                  <a
                    href={`mailto:${settings.contact_email}`}
                    className="hover:text-white"
                  >
                    {settings.contact_email}
                  </a>
                </li>
              )}
              {settings.address && (
                <li className="flex items-center gap-3">
                  <FaMapMarkerAlt className="h-4 w-4 text-gray-400" />
                  <span>{settings.address}</span>
                </li>
              )}
            </ul>

            {/* socials */}
            <div className="mt-5 flex items-center gap-4">
              {settings.facebook_url && (
                <a
                  href={settings.facebook_url}
                  aria-label="Facebook"
                  target="_blank"
                  className="hover:text-white"
                >
                  <FaFacebookF className="h-5 w-5" />
                </a>
              )}
              {settings.instagram_handle && (
                <a
                  href={`https://instagram.com/${settings.instagram_handle.replace(
                    /^@/,
                    ""
                  )}`}
                  aria-label="Instagram"
                  target="_blank"
                  className="hover:text-white"
                >
                  <FaInstagram className="h-5 w-5" />
                </a>
              )}
              <a href="#" aria-label="YouTube" className="hover:text-white">
                <FaYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* bottom */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">
            © {year} {settings.site_title || "האתר"}. כל הזכויות שמורות.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <Link href="/privacy" className="hover:text-white">
              מדיניות פרטיות
            </Link>
            <span className="opacity-50">•</span>
            <Link href="/terms" className="hover:text-white">
              תנאים והגבלות
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
