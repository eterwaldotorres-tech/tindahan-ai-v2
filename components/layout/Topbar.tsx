"use client";

import { FaBell, FaUserCircle } from "react-icons/fa";

interface TopbarProps {
  title: string;
}

export default function Topbar({ title }: TopbarProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between">

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          {title}
        </h1>

        <p className="text-gray-500">
          Welcome to Tindahan AI
        </p>
      </div>

      <div className="flex items-center gap-6">

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