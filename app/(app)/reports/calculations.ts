import { SaleDocument } from "../sales-history/types";
import { SalesTrendPoint } from "./types";

import {
    DateRange,
    ReportPeriod,
    ReportSummary,
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
            return [];

        case "week":
            return [];

        case "month":
            return [];

        default:
            return [];
    }
}