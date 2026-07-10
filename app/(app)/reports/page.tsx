"use client";

import { useEffect, useState } from "react";

import ReportCards from "../reports/ReportCards";
import {
  calculateReportSummary,
  filterSalesByDateRange,
  getDateRange,
  getSalesTrendData,
} from "../reports/calculations";
import { getReportSales } from "../reports/queries";
import {
  ReportPeriod,
  ReportSummary,
} from "../reports/types";
import type { SaleDocument } from "../sales-history/types";
import ReportPeriodSelector from "../reports/ReportPeriodSelector";
import Topbar from "@/components/layout/Topbar";
import { SalesTrendPoint } from "./types";
import SalesTrendChart from "./SalesTrendChart";

const EMPTY_SUMMARY: ReportSummary = {
  totalRevenue: 0,
  totalTransactions: 0,
  itemsSold: 0,
  averageTransactionValue: 0,
};

export default function ReportsPage() {
  const [sales, setSales] = useState<SaleDocument[]>([]);

  const [summary, setSummary] =
    useState<ReportSummary>(EMPTY_SUMMARY);

  const [trendData, setTrendData] = useState<SalesTrendPoint[]>([]);

  const [period, setPeriod] =
    useState<ReportPeriod>("today");

  useEffect(() => {
    async function loadReports() {
      const reportSales = await getReportSales();

      setSales(reportSales);
    }

    loadReports();
  }, []);

  useEffect(() => {
    const range = getDateRange(period);

    const filteredSales = filterSalesByDateRange(
      sales,
      range.start,
      range.end
    );

    const reportSummary =
      calculateReportSummary(filteredSales);

    setTrendData(
      getSalesTrendData(filteredSales, period)
    )

    setSummary(reportSummary);
  }, [sales, period]);

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

      <ReportCards summary={summary} />

      <SalesTrendChart data={trendData} />
    </div>
  );
}