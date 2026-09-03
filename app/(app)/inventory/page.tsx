"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  Product,
} from "@/lib/products";
import Topbar from "@/components/layout/Topbar";
import InventorySkeleton from "./InventorySkeleton";
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";

export default function InventoryPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingProductId, setDeletingProductId] =
    useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const loadProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getProducts();

      setProducts(data);
    } catch (error) {
      console.error("Failed to load products:", error);

      setError(
        "Unable to load inventory. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  async function handleAddProduct() {
    if (isSaving) return;

    setIsSaving(true);

    try {
      const trimmedName = name.trim();
      const numericPrice = Number(price);
      const numericQuantity = Number(quantity);

      if (!trimmedName || !price || !quantity) {
        alert("Please fill in all fields.");
        return;
      }

      if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
        alert("Price must be greater than 0.");
        return;
      }

      if (
        !Number.isInteger(numericQuantity) ||
        numericQuantity < 0
      ) {
        alert("Quantity must be a whole number of 0 or greater.");
        return;
      }

      if (editingProduct) {
        await updateProduct({
          id: editingProduct.id,
          name: trimmedName,
          price: numericPrice,
          quantity: numericQuantity,
        });

        alert("✅ Product updated!");

        setEditingProduct(null);
      } else {
        await addProduct({
          name: trimmedName,
          price: numericPrice,
          quantity: numericQuantity,
        });

        alert("✅ Product added!");
      }

      await loadProducts();

      setName("");
      setPrice("");
      setQuantity("");
    } catch (error) {
      console.error("Failed to save product:", error);

      alert(
        editingProduct
          ? "Unable to update product. Please try again."
          : "Unable to add product. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(product: Product) {
    if (!product.id || deletingProductId) return;

    const confirmed = window.confirm(
      `Delete "${product.name}"?\n\nThis cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setDeletingProductId(product.id);

      await deleteProduct(product.id);
      await loadProducts();
    } catch (error) {
      console.error("Failed to delete product:", error);

      alert(
        "Unable to delete product. Please try again."
      );
    } finally {
      setDeletingProductId(null);
    }
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
  if (isLoading) {
    return (
      <main className="p-8 space-y-8">
        <Topbar
          title="Inventory"
          subtitle="Track stock levels and inventory status."
        />

        <InventorySkeleton />
      </main>
    );
  }
  if (error) {
    return (
      <main className="p-8 space-y-8">
        <Topbar
          title="Inventory"
          subtitle="Track stock levels and inventory status."
        />

        <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-8">
          <p className="font-medium text-red-700">
            {error}
          </p>

          <button
            type="button"
            onClick={loadProducts}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="p-8 space-y-8">

      <Topbar
        title="Inventory"
        subtitle="Track stock levels and inventory status."
      />

      <ProductForm
        editingProductName={editingProduct?.name ?? null}
        name={name}
        price={price}
        quantity={quantity}
        isSaving={isSaving}
        onNameChange={setName}
        onPriceChange={setPrice}
        onQuantityChange={setQuantity}
        onSubmit={handleAddProduct}
        onCancel={cancelEdit}
      />

      {/* Products */}

      <ProductTable
        products={products}
        search={search}
        deletingProductId={deletingProductId}
        onSearchChange={setSearch}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

    </main>
  );
}