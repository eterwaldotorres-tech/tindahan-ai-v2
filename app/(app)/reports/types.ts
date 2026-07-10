import { SaleDocument } from "../sales-history/types";

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

export interface ReportData {
    sales: SaleDocument[];
    summary: ReportSummary;
}
export interface SalesTrendPoint {
    label: string;
    revenue: number;
}