"use client";

import { useEffect, useState } from "react";
import { getProducts, Product } from "@/lib/products";

import ProductPicker from "./ProductPicker";
import Cart from "./Cart";
import CartSummary from "./CartSummary";

import { CartItem } from "./types";
import { checkoutCart } from "./checkout";

export default function SalesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cashReceived, setCashReceived] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load products.");
    }
  }

  const selectedProduct = products.find(
    (product) => product.id === selectedId
  );

  function addToCart() {
    if (!selectedProduct) {
      alert("Please select a product.");
      return;
    }

    if (quantity <= 0) {
      alert("Invalid quantity.");
      return;
    }

    if (quantity > selectedProduct.quantity) {
      alert("Not enough stock.");
      return;
    }

    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.product.id === selectedProduct.id
      );

      if (existingItem) {
        return currentCart.map((item) => {
          if (item.product.id !== selectedProduct.id) {
            return item;
          }

          const newQuantity = item.quantity + quantity;

          if (newQuantity > selectedProduct.quantity) {
            alert("Not enough stock.");
            return item;
          }

          return {
            ...item,
            quantity: newQuantity,
          };
        });
      }

      return [
        ...currentCart,
        {
          product: selectedProduct,
          quantity,
        },
      ];
    });

    setSelectedId("");
    setQuantity(1);
  }
  function increaseQuantity(productId: string) {
    setCart((currentCart) =>
      currentCart.map((item) => {
        if (item.product.id !== productId) {
          return item;
        }

        const latestProduct = products.find(
          (product) => product.id === productId
        );

        if (!latestProduct) {
          return item;
        }

        if (item.quantity >= latestProduct.quantity) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      })
    );
  }

  function decreaseQuantity(productId: string) {
    setCart((currentCart) =>
      currentCart
        .map((item) => {
          if (item.product.id !== productId) {
            return item;
          }

          return {
            ...item,
            quantity: item.quantity - 1,
          };
        })
        .filter((item) => item.quantity > 0)
    );
  }

  function removeItem(productId: string) {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.product.id !== productId
      )
    );
  }

  async function handleCheckout() {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);

      await checkoutCart(cart);

      alert("Checkout successful!");

      setCart([]);
      setSelectedId("");
      setQuantity(1);
      setCashReceived(0);

      await loadProducts();
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Checkout failed.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold text-gray-900">
        Sales
      </h1>

      <p className="mt-2 text-gray-600">
        Record sales using the POS system.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6">
          <ProductPicker
            products={products}
            selectedId={selectedId}
            quantity={quantity}
            onSelect={setSelectedId}
            onQuantityChange={setQuantity}
            onAddToCart={addToCart}
          />
          <CartSummary
            items={cart}
            cashReceived={cashReceived}
            onCashChange={setCashReceived}
            loading={loading}
            onCheckout={handleCheckout}
          />
        </div>

        <div className="lg:col-span-2">
          <Cart
            items={cart}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
            onRemove={removeItem}
          />
        </div>
      </div>

      {products.length === 0 && (
        <div className="mt-8 rounded-xl bg-yellow-50 border border-yellow-200 p-4">
          <p className="text-yellow-800">
            No products found. Add products from the Products page before recording sales.
          </p>
        </div>
      )}

      {cart.length > 0 && (
        <div className="mt-6 rounded-xl bg-blue-50 border border-blue-200 p-4">
          <p className="text-blue-800 font-medium">
            {cart.length} {cart.length === 1 ? "product" : "products"} in cart
          </p>
        </div>
      )}
    </main>
  );
}