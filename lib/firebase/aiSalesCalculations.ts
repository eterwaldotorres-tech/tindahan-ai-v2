import { SaleDocument } from "@/app/(app)/sales-history/types";

export interface AISalesSummary {
    totalRevenue: number;
    transactionCount: number;
    itemsSold: number;
    averageTransaction: number;
}

export function calculateAISalesSummary(
    sales: SaleDocument[]
): AISalesSummary {
    const totalRevenue = sales.reduce(
        (sum, sale) => sum + sale.total,
        0
    );

    const transactionCount = sales.length;

    const itemsSold = sales.reduce(
        (sum, sale) =>
            sum +
            sale.items.reduce(
                (itemSum, item) => itemSum + item.quantity,
                0
            ),
        0
    );

    const averageTransaction =
        transactionCount > 0
            ? totalRevenue / transactionCount
            : 0;

    return {
        totalRevenue,
        transactionCount,
        itemsSold,
        averageTransaction,
    };
}

export function filterAISalesByDateRange(
    sales: SaleDocument[],
    startDate: Date,
    endDate: Date
): SaleDocument[] {
    return sales.filter((sale) => {
        if (!sale.createdAt) {
            return false;
        }

        const saleDate = sale.createdAt.toDate();

        return saleDate >= startDate && saleDate <= endDate;
    });
}

export function getTodayDateRange(): {
    startDate: Date;
    endDate: Date;
} {
    const now = new Date();

    const startDate = new Date(now);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(now);
    endDate.setHours(23, 59, 59, 999);

    return {
        startDate,
        endDate,
    };
}
export function getThisWeekDateRange(): {
    startDate: Date;
    endDate: Date;
} {
    const now = new Date();

    const startDate = new Date(now);
    const day = startDate.getDay();

    const daysSinceMonday = day === 0 ? 6 : day - 1;

    startDate.setDate(
        startDate.getDate() - daysSinceMonday
    );
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(now);
    endDate.setHours(23, 59, 59, 999);

    return {
        startDate,
        endDate,
    };
}

export function getThisMonthDateRange(): {
    startDate: Date;
    endDate: Date;
} {
    const now = new Date();

    const startDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        1,
        0,
        0,
        0,
        0
    );

    const endDate = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59,
        999
    );

    return {
        startDate,
        endDate,
    };
}
export interface AIProductSales {
    productName: string;
    quantitySold: number;
    revenue: number;
}

export function calculateAIProductSales(
    sales: SaleDocument[]
): AIProductSales[] {
    const productSales = new Map<string, AIProductSales>();

    for (const sale of sales) {
        for (const item of sale.items) {
            const existing = productSales.get(item.productName);

            if (existing) {
                existing.quantitySold += item.quantity;
                existing.revenue += item.total;
            } else {
                productSales.set(item.productName, {
                    productName: item.productName,
                    quantitySold: item.quantity,
                    revenue: item.total,
                });
            }
        }
    }

    return Array.from(productSales.values()).sort(
        (a, b) => b.quantitySold - a.quantitySold
    );
}
export interface AIRestockCandidate {
    productName: string;
    quantityInStock: number;
    quantitySold: number;
    revenue: number;
    averageDailySales: number;
}
export function calculateAIRestockCandidates(
    products: {
        name: string;
        quantity: number;
    }[],
    productSales: AIProductSales[],
    salesPeriodDays = 30
): AIRestockCandidate[] {
    return products
        .map((product) => {
            const sales = productSales.find(
                (item) => item.productName === product.name
            );

            if (!sales || product.quantity <= 0) {
                return null;
            }

            const averageDailySales =
                sales.quantitySold / salesPeriodDays;

            const estimatedDaysRemaining =
                averageDailySales > 0
                    ? product.quantity / averageDailySales
                    : Infinity;

            if (estimatedDaysRemaining > 7) {
                return null;
            }

            return {
                productName: product.name,
                quantityInStock: product.quantity,
                quantitySold: sales.quantitySold,
                revenue: sales.revenue,
                averageDailySales,
            };
        })
        .filter(
            (
                candidate
            ): candidate is AIRestockCandidate =>
                candidate !== null
        )
        .sort(
            (a, b) =>
                a.quantityInStock / a.averageDailySales -
                b.quantityInStock / b.averageDailySales
        );
}
export function getAITopSellingProducts(
    productSales: AIProductSales[],
    limit = 5
): AIProductSales[] {
    return productSales.slice(0, limit);
}