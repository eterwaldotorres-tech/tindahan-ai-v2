"use client";

import { useEffect, useState } from "react";
import { getSales } from "./queries";
import type { SaleDocument } from "./types";
import SalesTable from "./SalesTable";
import { mapSaleToReceiptData } from "../sales/receipt/saleMapper";
import { ReceiptDialog } from "../sales/receipt/ReceiptDialog";

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
      <div>
        ...
        <SalesTable
          sales={sales}
          onViewReceipt={setSelectedSale}
        />
      </div>

      <ReceiptDialog
        open={selectedSale !== null}
        receipt={receiptData}
        onClose={() => setSelectedSale(null)}
        onPrint={() => window.print()}
      />
    </>
  );
}