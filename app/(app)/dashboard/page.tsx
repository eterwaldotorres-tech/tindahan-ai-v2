"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  FaBoxes,
  FaCashRegister,
  FaExclamationTriangle,
  FaChartLine,
} from "react-icons/fa";

import DashboardCard from "@/components/dashboard/DashboardCard";
import Topbar from "@/components/layout/Topbar";
import RecentSales from "./RecentSales";
import type { SaleDocument } from "../sales-history/types";
import DashboardSkeleton from "./DashboardSkeleton";
import { ReceiptDialog } from "../sales/receipt/ReceiptDialog";
import { mapSaleToReceiptData } from "../sales/receipt/saleMapper";

import {
  getDashboardProducts,
  getDashboardSales,
  getRecentSales,
} from "./queries";

import {
  calculateDashboardRevenue,
  calculateLowStock,
} from "./calculations";

export default function Dashboard() {
  const [productCount, setProductCount] = useState(0);
  const [salesCount, setSalesCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [lowStock, setLowStock] = useState(0);
  const [recentSales, setRecentSales] = useState<SaleDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSale, setSelectedSale] =
    useState<SaleDocument | null>(null);

  const [receiptOpen, setReceiptOpen] = useState(false);

  const loadDashboard = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [sales, products, recentSales] =
        await Promise.all([
          getDashboardSales(),
          getDashboardProducts(),
          getRecentSales(),
        ]);

      setProductCount(products.length);
      setSalesCount(sales.length);
      setRevenue(calculateDashboardRevenue(sales));
      setLowStock(calculateLowStock(products));
      setRecentSales(recentSales);
    } catch (error) {
      console.error("Failed to load dashboard:", error);

      setError(
        "Unable to load dashboard. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const receiptData = selectedSale
    ? mapSaleToReceiptData(selectedSale)
    : null;
  function handleViewReceipt(sale: SaleDocument) {
    setSelectedSale(sale);
    setReceiptOpen(true);
  }
  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col">
        <main className="p-8 space-y-8">
          <Topbar
            title="Dashboard"
            subtitle="Welcome back. Here's an overview of your store."
          />

          <DashboardSkeleton />
        </main>
      </div>
    );
  }
  if (error) {
    return (
      <div className="p-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8">
          <p className="font-medium text-red-700">
            {error}
          </p>

          <button
            onClick={loadDashboard}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <main className="p-8 space-y-8">
        <Topbar
          title="Dashboard"
          subtitle="Welcome back. Here's an overview of your store."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <DashboardCard
            title="Products"
            value={productCount}
            icon={<FaBoxes className="text-blue-600 text-5xl" />}
            iconBg="bg-blue-100"
          />

          <DashboardCard
            title="Total Sales"
            value={salesCount}
            icon={<FaCashRegister className="text-green-600 text-5xl" />}
            iconBg="bg-green-100"
          />

          <DashboardCard
            title="Low Stock Items"
            value={lowStock}
            icon={
              <FaExclamationTriangle className="text-yellow-600 text-5xl" />
            }
            iconBg="bg-yellow-100"
          />

          <DashboardCard
            title="Revenue"
            value={`₱${revenue.toLocaleString()}`}
            icon={<FaChartLine className="text-orange-600 text-5xl" />}
            iconBg="bg-orange-100"
          />
        </div>
        <RecentSales
          sales={recentSales}
          onViewReceipt={handleViewReceipt}
        />
      </main>
      <ReceiptDialog
        open={receiptOpen}
        receipt={receiptData}
        onClose={() => setReceiptOpen(false)}
        onPrint={() => window.print()}
      />
    </div>
  );
}