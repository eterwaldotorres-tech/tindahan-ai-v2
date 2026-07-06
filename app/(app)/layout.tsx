import { Toaster } from "sonner";

import Sidebar from "@/components/layout/Sidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 min-h-screen bg-gray-100">
        {children}

        <Toaster
          position="top-right"
          richColors
          closeButton
          expand
        />
      </main>
    </div>
  );
}