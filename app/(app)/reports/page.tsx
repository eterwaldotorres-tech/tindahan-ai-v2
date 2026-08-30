"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import TopSellingProducts from "./TopSellingProducts";
import SalesByDay from "./SalesByDay";
import ReportCards from "../reports/ReportCards";
import {
  calculateInventoryInsights,
  calculateReportSummary,
  filterSalesByDateRange,
  getDateRange,
  getSalesByDay,
  getSalesTrendData,
  getTopSellingProducts,
} from "../reports/calculations";
import {
  getReportProducts,
  getReportSales,
} from "../reports/queries";
import { ReportPeriod } from "../reports/types";
import type { SaleDocument } from "../sales-history/types";
import ReportPeriodSelector from "../reports/ReportPeriodSelector";
import Topbar from "@/components/layout/Topbar";
import SalesTrendChart from "./SalesTrendChart";
import type { Product } from "@/lib/products";
import InventoryInsights from "./InventoryInsights";
import ReportsSkeleton from "./ReportsSkeleton";

export default function ReportsPage() {
  const [sales, setSales] = useState<SaleDocument[]>([]);

  const [products, setProducts] = useState<Product[]>([]);

  const [period, setPeriod] =
    useState<ReportPeriod>("today");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadReports = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [reportSales, reportProducts] =
        await Promise.all([
          getReportSales(),
          getReportProducts(),
        ]);

      setSales(reportSales);
      setProducts(reportProducts);
    } catch (error) {
      console.error("Failed to load reports:", error);

      setError(
        "Unable to load reports. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  const inventoryInsights = useMemo(() => {
    return calculateInventoryInsights(products);
  }, [products]);

  const reportData = useMemo(() => {
    const range = getDateRange(period);

    const filteredSales = filterSalesByDateRange(
      sales,
      range.start,
      range.end
    );

    return {
      summary: calculateReportSummary(filteredSales),
      trendData: getSalesTrendData(filteredSales, period),
      topSellingProducts: getTopSellingProducts(filteredSales),
      salesByDay: getSalesByDay(filteredSales),
    };
  }, [sales, period]);
  if (isLoading) {
    return <ReportsSkeleton />;
  }
  if (error) {
    return (
      <div className="p-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8">
          <p className="font-medium text-red-700">
            {error}
          </p>

          <button
            onClick={loadReports}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="p-8 space-y-8">
      <Topbar
        title="Reports"
        subtitle="Monitor your store's sales performance."
      >
        <ReportPeriodSelector
          value={period}
          onChange={setPeriod}
        />
      </Topbar>

      <ReportCards summary={reportData.summary} />

      <SalesTrendChart data={reportData.trendData} />

      <div className="grid gap-8 lg:grid-cols-2">
        <TopSellingProducts
          products={reportData.topSellingProducts}
        />

        <SalesByDay data={reportData.salesByDay} />
      </div>

      <InventoryInsights insights={inventoryInsights} />
    </div>
  );
}