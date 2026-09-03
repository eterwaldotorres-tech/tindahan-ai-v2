"use client";

import { FaEdit, FaTrash } from "react-icons/fa";
import type { Product } from "@/lib/products";
import StockStatus from "./StockStatus";

interface ProductTableProps {
    products: Product[];
    search: string;
    deletingProductId: string | null;
    onSearchChange: (value: string) => void;
    onEdit: (product: Product) => void;
    onDelete: (product: Product) => void;
}

export default function ProductTable({
    products,
    search,
    deletingProductId,
    onSearchChange,
    onEdit,
    onDelete,
}: ProductTableProps) {
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="mt-8 rounded-xl bg-white p-6 shadow-md">
            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row">
                <h2 className="text-2xl font-semibold text-slate-800">
                    Current Products
                </h2>

                <input
                    type="text"
                    placeholder="🔍 Search products..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 p-3 text-black placeholder:text-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 md:w-80"
                />
            </div>

            {filteredProducts.length === 0 ? (
                <p className="text-gray-500">
                    No products found.
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="border-b bg-gray-50">
                            <tr>
                                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                                    Product
                                </th>

                                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                                    Price
                                </th>

                                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                                    Quantity
                                </th>

                                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                                    Status
                                </th>

                                <th className="p-4 text-center text-sm font-semibold text-gray-700">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredProducts.map((product) => {

                                return (
                                    <tr
                                        key={product.id}
                                        className="border-b transition hover:bg-gray-50"
                                    >
                                        <td className="p-4 font-medium text-slate-800">
                                            {product.name}
                                        </td>

                                        <td className="p-4 text-slate-700">
                                            ₱{product.price}
                                        </td>

                                        <td className="p-4 text-slate-700">
                                            {product.quantity}
                                        </td>

                                        <td className="p-4">
                                            <StockStatus quantity={Number(product.quantity)} />
                                        </td>

                                        <td className="p-4">
                                            <div className="flex justify-center gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => onEdit(product)}
                                                    className="text-blue-600 transition hover:text-blue-800"
                                                    title="Edit"
                                                >
                                                    <FaEdit />
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => onDelete(product)}
                                                    disabled={deletingProductId === product.id}
                                                    className="text-red-600 transition hover:text-red-800 disabled:cursor-not-allowed disabled:opacity-50"
                                                    title="Delete"
                                                    aria-label={`Delete ${product.name}`}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
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