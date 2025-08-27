// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { FiPhone, FiMenu, FiX } from "react-icons/fi";
// import { FaWhatsapp } from "react-icons/fa";
// import { createClient } from "@/lib/supabase/client";

// type SiteSettings = {
//   site_title: string | null;
//   phone_number: string | null;
//   whatsapp_number: string | null;
// };

// const nav = [
//   { href: "/", label: "דף הבית" },
//   { href: "/gallery", label: "גלריה" },
//   { href: "/about", label: "אודות" },
//   { href: "/contact", label: "צור קשר" },
//   { href: "/admin", label: "ניהול" },
// ];

// export default function Header() {
//   const supabase = useMemo(() => createClient(), []);
//   const [settings, setSettings] = useState<SiteSettings>({
//     site_title: "",
//     phone_number: "",
//     whatsapp_number: "",
//   });
//   const [loading, setLoading] = useState(true);
//   const [open, setOpen] = useState(false);
//   const pathname = usePathname();

//   useEffect(() => {
//     const loadSettings = async () => {
//       setLoading(true);
//       const { data, error } = await supabase
//         .from("site_settings")
//         .select("site_title, phone_number, whatsapp_number")
//         .eq("id", "site-default")
//         .maybeSingle();

//       if (!error && data) {
//         setSettings(data);
//       }
//       setLoading(false);
//     };

//     loadSettings();
//   }, [supabase]);

//   const linkCls = (href: string) =>
//     `text-sm md:text-base transition-colors ${
//       pathname === href
//         ? "text-blue-600 font-semibold"
//         : "text-gray-700 hover:text-blue-600"
//     }`;

//   return (
//     <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
//       <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" dir="rtl">
//         {/* Bar */}
//         <div className="grid grid-cols-2 lg:grid-cols-3 items-center h-16">
//           {/* Right: Logo */}
//           <div className="flex items-center justify-start">
//             <Link
//               href="/"
//               className="text-2xl font-extrabold tracking-tight text-gray-900"
//               aria-label={`${settings.site_title || "האתר"} - דף הבית`}
//             >
//               {loading ? "..." : settings.site_title || "האתר"}
//             </Link>
//           </div>

//           {/* Center: Nav */}
//           <div className="hidden lg:flex items-center justify-center">
//             <ul className="flex items-center gap-6 rtl:space-x-reverse">
//               {nav.map((item) => (
//                 <li key={item.href}>
//                   <Link href={item.href} className={linkCls(item.href)}>
//                     {item.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Left: Contact */}
//           <div className="flex items-center justify-end gap-3">
//             {/* Phone */}
//             {settings.phone_number && (
//               <Link
//                 href={`tel:${settings.phone_number}`}
//                 className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium text-gray-800 hover:border-blue-500 hover:text-blue-600"
//               >
//                 <FiPhone className="shrink-0" />
//                 <span className="hidden md:inline">
//                   {settings.phone_number}
//                 </span>
//                 <span className="md:hidden sr-only">התקשרו</span>
//               </Link>
//             )}

//             {/* WhatsApp */}
//             {settings.whatsapp_number && (
//               <Link
//                 href={`https://wa.me/${settings.whatsapp_number.replace(
//                   /^0/,
//                   "972"
//                 )}`}
//                 target="_blank"
//                 className="inline-flex items-center justify-center rounded-full border px-3 py-1.5 text-sm font-medium text-gray-800 hover:border-green-600 hover:text-green-600"
//                 aria-label="שלחו וואטסאפ"
//               >
//                 <FaWhatsapp className="text-lg" />
//                 <span className="sr-only">WhatsApp</span>
//               </Link>
//             )}

//             {/* Mobile menu toggle */}
//             <button
//               className="lg:hidden inline-flex items-center justify-center rounded-full border p-2 text-gray-800 hover:border-gray-400"
//               onClick={() => setOpen((s) => !s)}
//               aria-label="תפריט"
//             >
//               {open ? <FiX /> : <FiMenu />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Nav */}
//         {open && (
//           <div className="lg:hidden border-t pb-3">
//             <ul className="flex flex-col gap-2 py-3">
//               {nav.map((item) => (
//                 <li key={item.href}>
//                   <Link
//                     href={item.href}
//                     className={`block px-2 py-2 rounded-md ${linkCls(
//                       item.href
//                     )}`}
//                     onClick={() => setOpen(false)}
//                   >
//                     {item.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </nav>
//     </header>
//   );
// }

"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiPhone, FiMenu, FiX } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { createClient } from "@/lib/supabase/client";

type SiteSettings = {
  site_title: string | null;
  phone_number: string | null;
  whatsapp_number: string | null;
};

const nav = [
  { href: "/", label: "דף הבית" },
  {
    label: "פרגולות",
    dropdown: [
      { href: "/pergolas/fixed", label: "פרגולה קבועה" },
      { href: "/pergolas/opening", label: "פרגולה נפתחת" },
      { href: "/pergolas/pvc", label: "פרגולה נפתחת PVC" },
      {
        href: "/pergolas/aluminum-auto",
        label: "פרגולה נפתחת מאלומיניום אוטומטית",
      },
      { href: "/pergolas/european", label: "מערכת אירופאית" },
    ],
  },
  { href: "/gallery", label: "גלריה" },
  { href: "/about", label: "אודות" },
  { href: "/contact", label: "צור קשר" },
];

export default function Header() {
  const supabase = useMemo(() => createClient(), []);
  const [settings, setSettings] = useState<SiteSettings>({
    site_title: "",
    phone_number: "",
    whatsapp_number: "",
  });
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(
    null
  );
  const pathname = usePathname();

  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("site_settings")
        .select("site_title, phone_number, whatsapp_number")
        .eq("id", "site-default")
        .maybeSingle();

      if (!error && data) {
        setSettings(data);
      }
      setLoading(false);
    };

    loadSettings();
  }, [supabase]);

  const linkCls = (href: string) =>
    `whitespace-nowrap text-sm md:text-base transition-colors ${
      pathname === href
        ? "text-blue-600 font-semibold"
        : "text-gray-700 hover:text-blue-600"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" dir="rtl">
        {/* Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-3 items-center h-16">
          {/* Right: Logo */}
          <div className="flex items-center justify-start">
            <Link
              href="/"
              className="text-2xl font-extrabold tracking-tight text-gray-900 whitespace-nowrap"
              aria-label={`${settings.site_title || "האתר"} - דף הבית`}
            >
              {loading ? "..." : settings.site_title || "האתר"}
            </Link>
          </div>

          {/* Center: Desktop Nav */}
          <div className="hidden lg:flex items-center justify-center">
            <ul className="flex items-center gap-6 rtl:space-x-reverse">
              {nav.map((item) =>
                (item as any).dropdown ? (
                  <li key={(item as any).label} className="relative group">
                    <button
                      className={`whitespace-nowrap ${linkCls(
                        "#"
                      )} flex items-center gap-1`}
                    >
                      {(item as any).label}
                    </button>
                    {/* Desktop Dropdown (flush to trigger) */}
                    <ul className="absolute right-0 hidden group-hover:block bg-white shadow-lg border rounded-md min-w-[180px] top-full z-50">
                      {(item as any).dropdown.map((sub: any) => (
                        <li key={sub.href}>
                          <Link
                            href={sub.href}
                            className="block px-4 py-2 text-sm hover:bg-gray-100 whitespace-nowrap"
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={(item as any).href}>
                    <Link
                      href={(item as any).href}
                      className={linkCls((item as any).href)}
                    >
                      {(item as any).label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Left: Contact + Mobile Menu Toggle */}
          <div className="flex items-center justify-end gap-3">
            {/* Phone */}
            {settings.phone_number && (
              <Link
                href={`tel:${settings.phone_number}`}
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium text-gray-800 hover:border-blue-500 hover:text-blue-600"
              >
                <FiPhone className="shrink-0" />
                <span className="hidden md:inline whitespace-nowrap">
                  {settings.phone_number}
                </span>
                <span className="md:hidden sr-only">התקשרו</span>
              </Link>
            )}

            {/* WhatsApp */}
            {settings.whatsapp_number && (
              <Link
                href={`https://wa.me/${settings.whatsapp_number.replace(
                  /^0/,
                  "972"
                )}`}
                target="_blank"
                className="inline-flex items-center justify-center rounded-full border px-3 py-1.5 text-sm font-medium text-gray-800 hover:border-green-600 hover:text-green-600"
                aria-label="שלחו וואטסאפ"
              >
                <FaWhatsapp className="text-lg" />
                <span className="sr-only">WhatsApp</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden inline-flex items-center justify-center rounded-full border p-2 text-gray-800 hover:border-gray-400"
              onClick={() => setOpen((s) => !s)}
              aria-label="תפריט"
            >
              {open ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {open && (
          <div className="lg:hidden border-t pb-3">
            <ul className="flex flex-col gap-2 py-3">
              {nav.map((item) =>
                (item as any).dropdown ? (
                  <li key={(item as any).label}>
                    <button
                      className="w-full text-right px-2 py-2 flex justify-between items-center font-normal" // not bold on mobile
                      onClick={() =>
                        setMobileDropdownOpen((prev) =>
                          prev === (item as any).label
                            ? null
                            : (item as any).label
                        )
                      }
                    >
                      <span className="whitespace-nowrap">
                        {(item as any).label}
                      </span>
                      <span className="text-gray-500">
                        {mobileDropdownOpen === (item as any).label ? "▲" : "▼"}
                      </span>
                    </button>
                    {mobileDropdownOpen === (item as any).label && (
                      <ul className="pl-4">
                        {(item as any).dropdown.map((sub: any) => (
                          <li key={sub.href}>
                            <Link
                              href={sub.href}
                              className="block px-2 py-1 text-sm text-gray-700 hover:text-blue-600 whitespace-nowrap"
                              onClick={() => setOpen(false)}
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ) : (
                  <li key={(item as any).href}>
                    <Link
                      href={(item as any).href}
                      className={`block px-2 py-2 rounded-md ${linkCls(
                        (item as any).href
                      )} whitespace-nowrap`}
                      onClick={() => setOpen(false)}
                    >
                      {(item as any).label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
