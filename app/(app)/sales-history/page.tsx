"use client";

import { useEffect, useState } from "react";
import { getSales } from "./queries";
import type { SaleDocument } from "./types";
import SalesTable from "./SalesTable";
import { mapSaleToReceiptData } from "../sales/receipt/saleMapper";
import { ReceiptDialog } from "../sales/receipt/ReceiptDialog";
import Topbar from "@/components/layout/Topbar";

export default function SalesHistoryPage() {
  const [sales, setSales] = useState<SaleDocument[]>([]);

  const [selectedSale, setSelectedSale] =
    useState<SaleDocument | null>(null);

  const [receiptOpen, setReceiptOpen] =
    useState(false);

  const receiptData = selectedSale
    ? mapSaleToReceiptData(selectedSale)
    : null;

  useEffect(() => {
    async function loadSales() {
      const data = await getSales();

      console.log(data);

      setSales(data);
    }

    loadSales();
  }, []);

  function handleViewReceipt(sale: SaleDocument) {
    setSelectedSale(sale);
    setReceiptOpen(true);
  }

  return (
    <>
      <Topbar
        title="Sales History"
        subtitle="Review completed transactions."
      />
      <SalesTable
        sales={sales}
        onViewReceipt={handleViewReceipt}
      />

      <ReceiptDialog
        open={receiptOpen}
        receipt={receiptData}
        onClose={() => setReceiptOpen(false)}
        onPrint={() => window.print()}
      />
    </>
  );
}