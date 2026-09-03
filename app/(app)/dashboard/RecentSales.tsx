"use client";

import Link from "next/link";
import type { SaleDocument } from "../sales-history/types";

interface RecentSalesProps {
    sales: SaleDocument[];
    onViewReceipt: (sale: SaleDocument) => void;
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
        maximumFractionDigits: 2,
    }).format(value);
}

function formatDate(date: Date) {
    return new Intl.DateTimeFormat("en-PH", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
    }).format(date);
}

export default function RecentSales({
    sales,
    onViewReceipt,
}: RecentSalesProps) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                    Recent Sales
                </h2>

                <Link
                    href="/sales-history"
                    className="text-sm font-medium text-blue-600 transition hover:text-blue-800"
                >
                    View All →
                </Link>
            </div>

            {sales.length === 0 ? (
                <div className="flex h-48 items-center justify-center">
                    <div className="text-center">
                        <p className="text-sm font-medium text-gray-600">
                            No recent sales
                        </p>

                        <p className="mt-1 text-sm text-gray-400">
                            Completed sales will appear here.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="border-b bg-gray-50">
                            <tr>
                                <th className="p-3 text-left text-sm font-medium text-gray-500">
                                    Date
                                </th>

                                <th className="p-3 text-left text-sm font-medium text-gray-500">
                                    Items
                                </th>

                                <th className="p-3 text-right text-sm font-medium text-gray-500">
                                    Total
                                </th>
                                <th className="p-3 text-right text-sm font-medium text-gray-500">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {sales.map((sale) => {
                                const saleDate = sale.createdAt?.toDate();

                                const itemCount = sale.items.reduce(
                                    (total, item) => total + item.quantity,
                                    0
                                );

                                return (
                                    <tr
                                        key={sale.id}
                                        className="border-b last:border-b-0 hover:bg-gray-50"
                                    >
                                        <td className="p-3 text-sm text-gray-700">
                                            {saleDate
                                                ? formatDate(saleDate)
                                                : "Unknown date"}
                                        </td>

                                        <td className="p-3 text-sm text-gray-700">
                                            {itemCount}{" "}
                                            {itemCount === 1 ? "item" : "items"}
                                        </td>

                                        <td className="p-3 text-right text-sm font-semibold text-gray-900">
                                            {formatCurrency(sale.total)}
                                        </td>
                                        <td className="p-3 text-center">
                                            <button
                                                type="button"
                                                onClick={() => onViewReceipt(sale)}
                                                className="rounded-lg border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                                            >
                                                View Receipt
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}