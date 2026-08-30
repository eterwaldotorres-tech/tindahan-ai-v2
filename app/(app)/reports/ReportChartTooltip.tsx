"use client";

import type { TooltipContentProps } from "recharts";

const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
        maximumFractionDigits: 0,
    }).format(value);

export default function ReportChartTooltip({
    active,
    payload,
    label,
}: TooltipContentProps) {
    if (!active || !payload || payload.length === 0) {
        return null;
    }

    const revenue = Number(payload[0]?.value ?? 0);

    return (
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-lg">
            <p className="mb-1 text-sm font-medium text-gray-500">
                {String(label)}
            </p>

            <p className="text-lg font-semibold text-gray-900">
                {formatCurrency(revenue)}
            </p>
        </div>
    );
}