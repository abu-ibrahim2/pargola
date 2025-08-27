// app/admin/layout.tsx
"use client";

import { useState, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LogoutButton } from "@/components/logout-button";
import { FaImages, FaCog, FaChartLine, FaBars, FaTimes } from "react-icons/fa";

const navItems = [
  { href: "/admin/gallery", label: "גלריה", Icon: FaImages },
  { href: "/admin/analytics", label: "סטטיסטיקות", Icon: FaChartLine },
  { href: "/admin/settings", label: "הגדרות", Icon: FaCog },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // close mobile menu on route change
  useEffect(() => setOpen(false), [pathname]);

  return (
    <main dir="rtl" className="min-h-screen w-full bg-gray-50">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        <header className="sticky top-0 z-40 mb-4 sm:mb-6 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="flex items-center justify-between px-3 sm:px-5 py-3">
            <h1 className="text-lg sm:text-xl font-extrabold text-gray-900">
              ניהול אתר
            </h1>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-2 text-sm">
              {navItems.map(({ href, label, Icon }) => {
                const active = pathname?.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={[
                      "rounded-xl px-3 py-2 ring-1 transition inline-flex items-center gap-2",
                      active
                        ? "bg-gray-900 text-white ring-gray-900"
                        : "bg-white ring-gray-200 hover:bg-gray-100",
                    ].join(" ")}
                  >
                    <Icon />
                    {label}
                  </Link>
                );
              })}
              <LogoutButton />
            </nav>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="תפריט"
              aria-expanded={open}
              aria-controls="admin-mobile-nav"
              className="md:hidden inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white p-2"
            >
              {open ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Mobile dropdown */}
          <div
            id="admin-mobile-nav"
            className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${
              open ? "max-h-96" : "max-h-0"
            }`}
          >
            <div className="px-3 sm:px-5 pb-3">
              <div className="flex flex-col gap-2">
                {navItems.map(({ href, label, Icon }) => {
                  const active = pathname?.startsWith(href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={[
                        "rounded-xl px-3 py-2 ring-1 transition inline-flex items-center gap-2",
                        active
                          ? "bg-gray-900 text-white ring-gray-900"
                          : "bg-white ring-gray-200 hover:bg-gray-100",
                      ].join(" ")}
                    >
                      <Icon />
                      {label}
                    </Link>
                  );
                })}
                <LogoutButton />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="rounded-2xl bg-white border border-gray-200 p-3 sm:p-4 md:p-6">
          {children}
        </div>
      </div>
    </main>
  );
}
