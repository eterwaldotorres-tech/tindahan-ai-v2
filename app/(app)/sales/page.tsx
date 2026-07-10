"use client";

import { useEffect, useState } from "react";
import { getProducts, Product } from "@/lib/products";

import ProductPicker from "./ProductPicker";
import Cart from "./Cart";
import CartSummary from "./CartSummary";

import { CartItem } from "./types";
import { checkoutCart } from "./checkout";
import { notify } from "@/lib/notify";
import { formatPeso } from "./currency";
import { getGrandTotal, getChange } from "./totals";
import { ReceiptDialog } from "./receipt/ReceiptDialog";
import { ReceiptData } from "./receipt/types";
import { mapCheckoutToReceipt } from "./receipt/mapper";
import Topbar from "@/components/layout/Topbar";

export default function SalesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cashReceived, setCashReceived] = useState(0);
  const [loading, setLoading] = useState(false);
  const grandTotal = getGrandTotal(cart);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);


  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
      notify.error("Failed to load products.");
    }
  }

  const selectedProduct = products.find(
    (product) => product.id === selectedId
  );

  function addToCart() {
    if (!selectedProduct) {
      notify.warning("Please select a product.");
      return;
    }

    if (quantity <= 0) {
      notify.warning("Invalid quantity.");
      return;
    }

    if (quantity > selectedProduct.quantity) {
      notify.error("Not enough stock.");
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
            notify.error("Not enough stock.");
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
    try {
      setLoading(true);

      const result = await checkoutCart(
        cart,
        cashReceived
      );

      const receipt = mapCheckoutToReceipt(result);

      setReceiptData(receipt);
      setReceiptOpen(true);

      notify.success(
        `Sale completed! Change: ${formatPeso(result.change)}`
      );
      setCart([]);
      setSelectedId("");
      setQuantity(1);
      setCashReceived(0);


      await loadProducts();
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        notify.error(error.message);
      } else {
        notify.error("Checkout failed.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-8">

      <Topbar
        title="Sales"
        subtitle="Create transactions and complete customer checkouts."
      />

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
      <ReceiptDialog
        open={receiptOpen}
        receipt={receiptData}
        onClose={() => setReceiptOpen(false)}
        onPrint={() => { }}
      />
    </main>
  );
}