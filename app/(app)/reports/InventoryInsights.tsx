"use client";

import { InventoryInsightsData } from "./types";

interface InventoryInsightsProps {
    insights: InventoryInsightsData;
}

const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
        maximumFractionDigits: 0,
    }).format(value);

export default function InventoryInsights({
    insights,
}: InventoryInsightsProps) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold text-gray-900">
                Inventory Insights
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-gray-100 p-4">
                    <p className="text-sm text-gray-500">
                        Total Products
                    </p>

                    <p className="mt-2 text-2xl font-semibold text-gray-900">
                        {insights.totalProducts}
                    </p>
                </div>

                <div className="rounded-xl border border-gray-100 p-4">
                    <p className="text-sm text-gray-500">
                        Low Stock
                    </p>

                    <p className="mt-2 text-2xl font-semibold text-gray-900">
                        {insights.lowStockProducts}
                    </p>
                </div>

                <div className="rounded-xl border border-gray-100 p-4">
                    <p className="text-sm text-gray-500">
                        Out of Stock
                    </p>

                    <p className="mt-2 text-2xl font-semibold text-gray-900">
                        {insights.outOfStockProducts}
                    </p>
                </div>

                <div className="rounded-xl border border-gray-100 p-4">
                    <p className="text-sm text-gray-500">
                        Inventory Value
                    </p>

                    <p className="mt-2 text-2xl font-semibold text-gray-900">
                        {formatCurrency(
                            insights.totalInventoryValue
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}