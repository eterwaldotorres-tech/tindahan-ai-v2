"use client";

import { useEffect, useState } from "react";
import { getProducts, Product } from "@/lib/products";
import { 
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function SalesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      setProducts(data);
    }

    loadProducts();
  }, []);

  const selectedProduct = products.find(
    (product) => product.id === selectedId
  );

  const total = selectedProduct
    ? selectedProduct.price * quantity
    : 0;

  const recordSale = async () => {
  if (!selectedProduct?.id) return;

  try {
    const productRef = doc(db, "products", selectedProduct.id);

    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      alert("Product not found");
      return;
    }

    const productData = productSnap.data();

    const currentStock = Number(productData.stock ?? 0);

if (quantity > currentStock) {
  alert("Not enough stock");
  return;
}

    await addDoc(collection(db, "sales"), {
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      quantity,
      total,
      createdAt: serverTimestamp()
    });


    await updateDoc(productRef, {
  stock: currentStock - quantity
});


    alert("Sale recorded!");

    setSelectedId("");
    setQuantity(1);

    // refresh stock display
    const updated = await getProducts();
    setProducts(updated);

  } catch (error) {
    console.error(error);
    alert("Failed to record sale");
  }
};

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold text-gray-900">
        Sales
      </h1>

      <p className="text-gray-600 mt-2">
        Record a new sale.
      </p>

      <div className="bg-white rounded-xl shadow p-6 mt-8 max-w-md space-y-4">

        <select
          className="w-full border rounded-lg p-3 text-black"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          <option value="">Select Product</option>

          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} - ₱{product.price}
            </option>
          ))}
        </select>

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full border rounded-lg p-3 text-black"
        />

        <div className="text-xl font-semibold text-gray-900">
          Total: ₱{total}
        </div>

        <button
          onClick={recordSale}
          className="w-full bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700"
        >
          Record Sale
        </button>

      </div>
    </main>
  );
}