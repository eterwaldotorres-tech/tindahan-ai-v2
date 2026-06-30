"use client";

import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  Product,
} from "@/lib/products";

export default function InventoryPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  // NEW: keeps track of the product being edited
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

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

  // EDIT MODE
  if (editingProduct) {
    await updateProduct({
      id: editingProduct.id,
      name,
      price: Number(price),
      quantity: Number(quantity),
    });

    alert("✅ Product updated!");

    setEditingProduct(null);
  } else {
    // ADD MODE
    await addProduct({
      name,
      price: Number(price),
      quantity: Number(quantity),
    });

    alert("✅ Product added!");
  }

  await loadProducts();

  setName("");
  setPrice("");
  setQuantity("");
}

async function handleDelete(product: Product) {
  if (!product.id) return;

  const confirmed = window.confirm(
    `Delete "${product.name}"?\n\nThis cannot be undone.`
  );

  if (!confirmed) return;

  await deleteProduct(product.id);

  await loadProducts();
}

function handleEdit(product: Product) {
  setEditingProduct(product);

  setName(product.name);
  setPrice(product.price.toString());
  setQuantity(product.quantity.toString());

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function cancelEdit() {
  setEditingProduct(null);

  setName("");
  setPrice("");
  setQuantity("");
}

const filteredProducts = products.filter((product) =>
  product.name.toLowerCase().includes(search.toLowerCase())
);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-slate-800">
        Inventory
      </h1>

      <p className="text-slate-500 mt-2">
        Manage your store products
      </p>

      {editingProduct && (
  <div className="mt-4 rounded-lg bg-blue-100 border border-blue-300 p-4 text-blue-800">
    Editing: <strong>{editingProduct.name}</strong>
  </div>
)}

      <div className="bg-white rounded-xl shadow-md p-6 mt-8">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6">
  {editingProduct ? "Edit Product" : "Add New Product"}
</h2>

        <div className="grid gap-4 md:grid-cols-3">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg p-3 text-black placeholder:text-gray-500"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border rounded-lg p-3 text-black placeholder:text-gray-500"
          />

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border rounded-lg p-3 text-black placeholder:text-gray-500"
          />
        </div>

        <div className="mt-6 flex gap-3">

  <button
    onClick={handleAddProduct}
    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
  >
    {editingProduct ? "Update Product" : "Add Product"}
  </button>

  {editingProduct && (
    <button
      onClick={cancelEdit}
      className="bg-gray-300 hover:bg-gray-400 px-6 py-3 rounded-lg transition"
    >
      Cancel
    </button>
  )}

</div>
      </div>

      {/* Products */}

      <div className="bg-white rounded-xl shadow-md p-6 mt-8">

        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">

          <h2 className="text-2xl font-semibold text-slate-800">
            Current Products
          </h2>

          <input
            type="text"
            placeholder="🔍 Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg p-3 w-full md:w-80 text-black placeholder:text-gray-500"
          />

        </div>

        {filteredProducts.length === 0 ? (
          <p className="text-gray-500">
            No products found.
          </p>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="border-b bg-gray-50">

                <tr>

                  <th className="text-left p-4">Product</th>

                  <th className="text-left p-4">Price</th>

                  <th className="text-left p-4">Quantity</th>

                  <th className="text-left p-4">Status</th>

                  <th className="text-center p-4">Actions</th>

                </tr>

              </thead>

              <tbody>

                {filteredProducts.map((product) => {

                  const stock = Number(product.quantity);

                  let status = (
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                      In Stock
                    </span>
                  );

                  if (stock <= 4 && stock > 0) {
                    status = (
                      <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium">
                        Low Stock
                      </span>
                    );
                  }

                  if (stock === 0) {
                    status = (
                      <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium">
                        Out of Stock
                      </span>
                    );
                  }

                  return (
                    <tr
                      key={product.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="p-4 font-medium text-slate-800">
                        {product.name}
                      </td>

                      <td className="p-4 text-slate-700">
                        ₱{product.price}
                      </td>

                      <td className="p-4 text-slate-700">
                        {product.quantity}
                      </td>

                      <td className="p-4">
                        {status}
                      </td>

                      <td className="p-4">

                        <div className="flex justify-center gap-3">

                          <button
  onClick={() => handleEdit(product)}
  className="text-blue-600 hover:text-blue-800 transition"
  title="Edit"
>
  <FaEdit />
</button>

                          <button
                          onClick={() => handleDelete(product)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>

                        </div>

                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </main>
  );
}