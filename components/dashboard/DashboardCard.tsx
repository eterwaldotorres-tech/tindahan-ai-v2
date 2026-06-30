import React from "react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBg: string;
}

export default function DashboardCard({
  title,
  value,
  icon,
  iconBg,
}: DashboardCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 min-h-[320px] flex flex-col items-center justify-center hover:shadow-lg transition-all duration-300">

      <div
        className={`w-20 h-20 rounded-full flex items-center justify-center mb-5 ${iconBg}`}
      >
        {icon}
      </div>

      <p className="text-lg font-medium text-gray-500 text-center">
        {title}
      </p>

      <h2 className="text-5xl font-bold text-slate-900 mt-2">
        {value}
      </h2>

    </div>
  );
}