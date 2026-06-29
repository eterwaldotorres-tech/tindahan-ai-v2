"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Sale = {
  id: string;
  productName: string;
  quantity: number;
  total: number;
  createdAt?: any;
};

export default function SalesHistoryPage() {
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    async function loadSales() {
      const q = query(
        collection(db, "sales"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Sale[];

      setSales(data);
    }

    loadSales();
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
  Sales History
</h1>

      <table className="w-full bg-white shadow rounded-lg text-gray-900">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-gray-900">Product Name</th>
            <th className="p-3 text-gray-900">Quantity</th>
            <th className="p-3 text-gray-900">Total</th>
          </tr>
        </thead>

        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id} className="border-t">
              <td className="p-3">{sale.productName}</td>
              <td className="p-3">{sale.quantity}</td>
              <td className="p-3">₱{sale.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}