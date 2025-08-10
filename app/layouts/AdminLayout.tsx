"use client";

import { LogoutButton } from "@/components/logout-button";
import Link from "next/link";
import { ReactNode } from "react";
import { FaImages, FaInbox } from "react-icons/fa";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <main dir="rtl" className="min-h-screen w-full bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900">
            ניהול אתר
          </h1>
          <nav className="flex items-center gap-2 text-sm">
            <Link
              href="/admin/gallery"
              className="rounded-xl bg-white px-4 py-2 ring-1 ring-gray-200 hover:bg-gray-100 transition inline-flex items-center gap-2"
            >
              <FaImages /> גלריה
            </Link>
            <Link
              href="/admin/messages"
              className="rounded-xl bg-white px-4 py-2 ring-1 ring-gray-200 hover:bg-gray-100 transition inline-flex items-center gap-2"
            >
              <FaInbox /> פניות
            </Link>
            <LogoutButton />
          </nav>
        </header>

        <div className="rounded-3xl bg-white ring-1 ring-gray-200 p-4 sm:p-6">
          {children}
        </div>
      </div>
    </main>
  );
}
