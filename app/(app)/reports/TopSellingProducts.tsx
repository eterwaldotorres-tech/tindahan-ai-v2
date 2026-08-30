"use client";

import { TopSellingProduct } from "./types";

interface TopSellingProductsProps {
    products: TopSellingProduct[];
}

export default function TopSellingProducts({
    products,
}: TopSellingProductsProps) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold text-gray-900">
                Top Selling Products
            </h2>

            {products.length === 0 ? (
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
                    {products.map((product, index) => (
                        <div
                            key={product.productId}
                            className="flex items-center justify-between rounded-xl border border-gray-100 p-4 transition hover:border-gray-200 hover:shadow-sm"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600">
                                    {index + 1}
                                </div>

                                <p className="font-medium text-gray-900">
                                    {product.productName}
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="font-semibold text-gray-900">
                                    {product.quantitySold}
                                </p>

                                <p className="text-xs text-gray-500">
                                    units sold
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}