"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Dashboard() {
  const [productCount, setProductCount] = useState(0);
  const [salesCount, setSalesCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [lowStock, setLowStock] = useState(0);

  useEffect(() => {
    async function loadDashboard() {
    const productSnapshot = await getDocs(collection(db, "products"));
const salesSnapshot = await getDocs(collection(db, "sales"));

setProductCount(productSnapshot.size);
setSalesCount(salesSnapshot.size);

let totalRevenue = 0;
let lowStockCount = 0;

salesSnapshot.forEach((doc) => {
  totalRevenue += Number(doc.data().total || 0);
});

productSnapshot.forEach((doc) => {
  const stock = Number(doc.data().stock || 0);

  if (stock < 5) {
    lowStockCount++;
  }
});

setRevenue(totalRevenue);
setLowStock(lowStockCount);
    }

    loadDashboard();
  }, []);

  
  return (
  <main className="min-h-screen bg-gray-100 p-8">
    <h1 className="text-4xl font-bold text-gray-900">
  Dashboard
</h1>

    <p className="text-gray-600 mt-2">
      Welcome to Tindahan AI
    </p>

    <div className="grid md:grid-cols-4 gap-6 mt-10">

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold text-gray-800">Products</h2>
        Products
<p className="text-3xl font-bold mt-2 text-blue-600">
          {productCount}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold text-gray-800">Total Sales</h2>
        Total Sales
<p className="text-3xl font-bold mt-2 text-purple-600">
          {salesCount}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold text-gray-800">Total Revenue</h2>
        Total Revenue
<p className="text-3xl font-bold mt-2 text-green-600">
          ₱{revenue}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold text-gray-800">Low Stock</h2>
        Low Stock
<p className="text-3xl font-bold mt-2 text-red-600">
          {lowStock}
        </p>
      </div>

    </div>
  </main>
);
}