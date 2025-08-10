// app/components/Header.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiPhone, FiMenu, FiX } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const nav = [
  { href: "/", label: "דף הבית" },
  { href: "/gallery", label: "גלריה" },
  { href: "/about", label: "אודות" },
  { href: "/contact", label: "צור קשר" },
  { href: "/admin", label: "ניהול" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const linkCls = (href: string) =>
    `text-sm md:text-base transition-colors ${
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
              className="text-2xl font-extrabold tracking-tight text-gray-900"
              aria-label="פרגולה בירושלים - דף הבית"
            >
              פרגולה בירושלים
            </Link>
          </div>

          {/* Center: Nav */}
          <div className="hidden lg:flex items-center justify-center">
            <ul className="flex items-center gap-6 rtl:space-x-reverse">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkCls(item.href)}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Left: Contact */}
          <div className="flex items-center justify-end gap-3">
            {/* Phone (always visible; full number on md+) */}
            <Link
              href="tel:02-567-8912"
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium text-gray-800 hover:border-blue-500 hover:text-blue-600"
            >
              <FiPhone className="shrink-0" />
              <span className="hidden md:inline">02-567-8912</span>
              <span className="md:hidden sr-only">התקשרו</span>
            </Link>

            {/* WhatsApp */}
            <Link
              href="https://wa.me/972528611934"
              target="_blank"
              className="inline-flex items-center justify-center rounded-full border px-3 py-1.5 text-sm font-medium text-gray-800 hover:border-green-600 hover:text-green-600"
              aria-label="שלחו וואטסאפ"
            >
              <FaWhatsapp className="text-lg" />
              <span className="sr-only">WhatsApp</span>
            </Link>

            {/* Mobile menu toggle (shows center nav) */}
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
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block px-2 py-2 rounded-md ${linkCls(item.href)}`}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
