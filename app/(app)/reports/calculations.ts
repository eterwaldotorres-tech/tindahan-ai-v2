import { SaleDocument } from "../sales-history/types";

import { Product } from "@/lib/products";

import {
    DateRange,
    InventoryInsightsData,
    ReportPeriod,
    ReportSummary,
    SalesByDayPoint,
    SalesTrendPoint,
    TopSellingProduct,
} from "./types";

export function calculateReportSummary(
    sales: SaleDocument[]
): ReportSummary {

    const totalRevenue = sales.reduce(
        (sum, sale) => sum + sale.total,
        0
    );
    const totalTransactions = sales.length;

    const itemsSold = sales.reduce(
        (sum, sale) =>
            sum +
            sale.items.reduce(
                (itemSum, item) => itemSum + item.quantity,
                0
            ),
        0
    );

    const averageTransactionValue =
        totalTransactions === 0
            ? 0
            : totalRevenue / totalTransactions;

    return {
        totalRevenue,
        totalTransactions,
        itemsSold,
        averageTransactionValue,
    };
}
export function filterSalesByDateRange(
    sales: SaleDocument[],
    start: Date,
    end: Date
): SaleDocument[] {
    return sales.filter((sale) => {
        const saleDate = sale.createdAt?.toDate();

        if (!saleDate) {
            return false;
        }

        return saleDate >= start && saleDate <= end;
    });
}
export function getDateRange(period: ReportPeriod): DateRange {
    const now = new Date();

    switch (period) {
        case "today": {
            const start = new Date(now);
            start.setHours(0, 0, 0, 0);

            const end = new Date(now);
            end.setHours(23, 59, 59, 999);

            return { start, end };
        }

        case "week": {
            const start = new Date(now);
            start.setDate(now.getDate() - now.getDay());
            start.setHours(0, 0, 0, 0);

            const end = new Date();
            end.setHours(23, 59, 59, 999);

            return { start, end };
        }

        case "month": {
            const start = new Date(
                now.getFullYear(),
                now.getMonth(),
                1
            );

            const end = new Date();
            end.setHours(23, 59, 59, 999);

            return { start, end };
        }
    }
}
export function getSalesTrendData(
    sales: SaleDocument[],
    period: ReportPeriod
): SalesTrendPoint[] {
    switch (period) {
        case "today": {
            const trend: SalesTrendPoint[] = [];

            // Create 24 hourly buckets
            for (let hour = 0; hour < 24; hour++) {
                trend.push({
                    label: `${hour}:00`,
                    revenue: 0,
                });
            }

            // Add each sale's revenue to its hour
            for (const sale of sales) {
                if (!sale.createdAt) continue;

                const hour = sale.createdAt.toDate().getHours();

                trend[hour].revenue += sale.total;
            }

            return trend;
        }

        case "week": {
            const trend: SalesTrendPoint[] = [];

            const dayLabels = [
                "Sun",
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
            ];

            for (const label of dayLabels) {
                trend.push({
                    label,
                    revenue: 0,
                });
            }

            for (const sale of sales) {
                if (!sale.createdAt) continue;

                const day = sale.createdAt.toDate().getDay();

                trend[day].revenue += sale.total;
            }

            return trend;
        }

        case "month": {
            const now = new Date();

            const year = now.getFullYear();
            const month = now.getMonth();

            const daysInMonth =
                new Date(year, month + 1, 0).getDate();

            const trend: SalesTrendPoint[] = [];

            for (let day = 1; day <= daysInMonth; day++) {
                trend.push({
                    label: day.toString(),
                    revenue: 0,
                });
            }

            for (const sale of sales) {
                if (!sale.createdAt) continue;

                const saleDate = sale.createdAt.toDate();

                // Only include sales from the current month.
                if (
                    saleDate.getFullYear() !== year ||
                    saleDate.getMonth() !== month
                ) {
                    continue;
                }

                const day = saleDate.getDate();

                trend[day - 1].revenue += sale.total;
            }

            return trend;
        }

        default:
            return [];
    }
}

export function getTopSellingProducts(
    sales: SaleDocument[],
    limit = 5
): TopSellingProduct[] {
    const productMap = new Map<string, TopSellingProduct>();

    for (const sale of sales) {
        for (const item of sale.items) {
            const existingProduct = productMap.get(item.productId);

            if (existingProduct) {
                existingProduct.quantitySold += item.quantity;
            } else {
                productMap.set(item.productId, {
                    productId: item.productId,
                    productName: item.productName,
                    quantitySold: item.quantity,
                });
            }
        }
    }

    return Array.from(productMap.values())
        .sort((a, b) => b.quantitySold - a.quantitySold)
        .slice(0, limit);
}

export function getSalesByDay(
    sales: SaleDocument[]
): SalesByDayPoint[] {
    const salesByDay: SalesByDayPoint[] = [
        { day: "Sunday", revenue: 0 },
        { day: "Monday", revenue: 0 },
        { day: "Tuesday", revenue: 0 },
        { day: "Wednesday", revenue: 0 },
        { day: "Thursday", revenue: 0 },
        { day: "Friday", revenue: 0 },
        { day: "Saturday", revenue: 0 },
    ];

    for (const sale of sales) {
        if (!sale.createdAt) continue;

        const dayIndex = sale.createdAt.toDate().getDay();

        salesByDay[dayIndex].revenue += sale.total;
    }

    return salesByDay;
}
export function calculateInventoryInsights(
    products: Product[]
): InventoryInsightsData {
    const totalProducts = products.length;

    const lowStockProducts = products.filter(
        (product) =>
            product.quantity > 0 &&
            product.quantity <= 4
    ).length;

    const outOfStockProducts = products.filter(
        (product) => product.quantity === 0
    ).length;

    const totalInventoryValue = products.reduce(
        (total, product) =>
            total + product.price * product.quantity,
        0
    );

    return {
        totalProducts,
        lowStockProducts,
        outOfStockProducts,
        totalInventoryValue,
    };
}