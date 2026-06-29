"use client";

import { useEffect, useState } from "react";
import { addProduct, getProducts, Product } from "@/lib/products";
import ProductForm from "@/components/inventory/ProductForm";

export default function InventoryPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  async function loadProducts() {
  const data = await getProducts();
  setProducts(data);
}

useEffect(() => {
  loadProducts();
}, []);

  async function handleAddProduct() {
    if (!name || !price || !quantity) {
      alert("Please fill in all fields.");
      return;
    }

    await addProduct({
      name,
      price: Number(price),
      quantity: Number(quantity),
    });

    await loadProducts();

    alert("✅ Product added!");

    setName("");
    setPrice("");
    setQuantity("");
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-gray-900">Inventory</h1>

      <p className="text-gray-600 mt-2">
        Manage your store products
      </p>

      <div className="bg-white rounded-xl shadow p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">
          Add New Product
        </h2>

        <div className="grid gap-4 max-w-md">
          <input
            type="text"
            placeholder="Product Name"
            className="border rounded-lg p-3 text-black placeholder:text-gray-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Price"
            className="border rounded-lg p-3 text-black placeholder:text-gray-500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="number"
            placeholder="Quantity"
            className="border rounded-lg p-3 text-black placeholder:text-gray-500"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <button
            onClick={handleAddProduct}
            className="bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700"
          >
            Add Product
          </button>
        </div>
      </div><div className="bg-white rounded-xl shadow p-6 mt-8">
  <h2 className="text-xl font-semibold text-gray-900 mb-4">
    Current Products
  </h2>

  {products.length === 0 ? (
    <p className="text-gray-600">No products yet.</p>
  ) : (
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="text-left py-2 text-gray-900">Product</th>
          <th className="text-left py-2 text-gray-900">Price</th>
          <th className="text-left py-2 text-gray-900">Quantity</th>
        </tr>
      </thead>

      <tbody>
        {products.map((product) => (
          <tr key={product.id} className="border-b">
            <td className="py-3 text-gray-900">{product.name}</td>
            <td className="py-3 text-gray-900">₱{product.price}</td>
            <td className="py-3 text-gray-900">{product.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>
    </main>
  );
}