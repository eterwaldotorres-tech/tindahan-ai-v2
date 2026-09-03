import type { Product } from "@/lib/products";
import type { SaleDocument } from "../sales-history/types";

export function calculateDashboardRevenue(
    sales: SaleDocument[]
): number {
    return sales.reduce(
        (total, sale) => total + Number(sale.total || 0),
        0
    );
}

export function calculateLowStock(
    products: Product[]
): number {
    return products.filter(
        (product) =>
            product.quantity > 0 &&
            product.quantity <= 4
    ).length;
}