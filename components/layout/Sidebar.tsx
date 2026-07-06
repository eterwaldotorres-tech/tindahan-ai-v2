"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaBoxes,
  FaCashRegister,
  FaChartBar,
  FaRobot,
  FaCog,
  FaHistory,
} from "react-icons/fa";

const links = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: FaHome,
  },
  {
    href: "/inventory",
    label: "Inventory",
    icon: FaBoxes,
  },
  {
    href: "/sales",
    label: "Sales",
    icon: FaCashRegister,
  },
  {
    href: "/sales-history",
    label: "Sales History",
    icon: FaHistory,
  },
  {
    href: "/reports",
    label: "Reports",
    icon: FaChartBar,
  },
  {
    href: "/ai",
    label: "AI Assistant",
    icon: FaRobot,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: FaCog,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 min-h-screen bg-slate-900 text-white flex flex-col">

      {/* Logo */}
      <div className="p-8 border-b border-slate-800">
        <h1 className="text-3xl font-bold">
          🏪 Tindahan AI
        </h1>

        <p className="text-slate-400 mt-2 text-sm">
          Smart Store Management
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;

          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-4 rounded-xl px-5 py-4 transition-all duration-200 ${active
                  ? "bg-blue-600 shadow-lg"
                  : "hover:bg-slate-800"
                }`}
            >
              <Icon className="text-xl" />

              <span className="font-medium">
                {link.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-slate-800 text-sm text-slate-400">
        Version 1.0
      </div>

    </aside>
  );
}