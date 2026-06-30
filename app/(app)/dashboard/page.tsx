"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  FaBoxes,
  FaCashRegister,
  FaExclamationTriangle,
  FaChartLine,
} from "react-icons/fa";
import DashboardCard from "@/components/DashboardCard";
import Topbar from "@/components/Topbar";

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
  <div className="flex-1 flex flex-col">

    <Topbar title="Dashboard" />

    <main className="p-10">

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
          icon={<FaExclamationTriangle className="text-yellow-600 text-5xl" />}
          iconBg="bg-yellow-100"
        />

        <DashboardCard
          title="Revenue"
          value={`₱${revenue.toLocaleString()}`}
          icon={<FaChartLine className="text-orange-600 text-5xl" />}
          iconBg="bg-orange-100"
        />

      </div>

    </main>

  </div>
);
}