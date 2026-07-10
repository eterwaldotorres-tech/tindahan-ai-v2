"use client";

import { ReactNode } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";

interface TopbarProps {
  title: string;
  subtitle: string;
  children?: ReactNode;
}

export default function Topbar({
  title,
  subtitle,
  children,
}: TopbarProps) {
  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          {title}
        </h1>

        <p className="mt-2 text-gray-600">
          {subtitle}
        </p>
      </div>

      <div className="flex items-center gap-6">
        {children}

        <button className="relative">
          <FaBell className="text-2xl text-gray-500 hover:text-blue-600 transition" />
        </button>

        <div className="flex items-center gap-3">
          <FaUserCircle className="text-5xl text-blue-600" />

          <div>
            <p className="font-semibold text-slate-800">
              Admin
            </p>

            <p className="text-sm text-gray-500">
              Store Owner
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}