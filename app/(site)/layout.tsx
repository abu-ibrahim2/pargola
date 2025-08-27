// app/client/layout.tsx
import { ReactNode } from "react";
import ClientLayout from "@/app/layouts/ClientLayout";

export default async function layout({ children }: { children: ReactNode }) {
  return <ClientLayout>{children}</ClientLayout>;
}
