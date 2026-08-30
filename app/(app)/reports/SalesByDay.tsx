"use client";

import { SalesByDayPoint } from "./types";

interface SalesByDayProps {
    data: SalesByDayPoint[];
}

const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
        maximumFractionDigits: 0,
    }).format(value);

export default function SalesByDay({
    data,
}: SalesByDayProps) {
    const maxRevenue = Math.max(
        ...data.map((item) => item.revenue),
        0
    );

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold text-gray-900">
                Sales by Day
            </h2>

            {data.every((item) => item.revenue === 0) ? (
                <div className="flex h-64 items-center justify-center">
                    <div className="text-center">
                        <p className="text-sm font-medium text-gray-600">
                            No sales data available
                        </p>

                        <p className="mt-1 text-sm text-gray-400">
                            Try selecting a different reporting period.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    {data.map((item) => {
                        const percentage =
                            maxRevenue === 0
                                ? 0
                                : (item.revenue / maxRevenue) * 100;

                        return (
                            <div key={item.day}>
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700">
                                        {item.day}
                                    </span>

                                    <span className="text-sm font-semibold text-gray-900">
                                        {formatCurrency(item.revenue)}
                                    </span>
                                </div>

                                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                                    <div
                                        className="h-full rounded-full bg-blue-600 transition-all duration-500"
                                        style={{
                                            width: `${percentage}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}