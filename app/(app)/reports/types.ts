export type ReportPeriod =
    | "today"
    | "week"
    | "month";

export interface DateRange {
    start: Date;
    end: Date;
}

export interface ReportSummary {
    totalRevenue: number;
    totalTransactions: number;
    itemsSold: number;
    averageTransactionValue: number;
}

export interface ReportFilters {
    period: ReportPeriod;
}

export interface SalesTrendPoint {
    label: string;
    revenue: number;
}

export interface TopSellingProduct {
    productId: string;
    productName: string;
    quantitySold: number;
}

export interface SalesByDayPoint {
    day: string;
    revenue: number;
}

export interface InventoryInsightsData {
    totalProducts: number;
    lowStockProducts: number;
    outOfStockProducts: number;
    totalInventoryValue: number;
}
