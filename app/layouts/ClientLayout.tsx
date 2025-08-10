"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ReactNode } from "react";

const excludedPaths = ["/login", "/signup", "/admin"];

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideLayout = excludedPaths.includes(pathname);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {!hideLayout && <Header />}
      <main className="flex-1">{children}</main>
      {!hideLayout && <Footer />}
    </div>
  );
}
