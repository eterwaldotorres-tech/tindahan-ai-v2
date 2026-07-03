import {
  collection,
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import { CartItem } from "./types";
import { CheckoutResult } from "./checkout.types";
import { getGrandTotal, getChange } from "./totals";

export async function checkoutCart(
  items: CartItem[],
  cashReceived: number
): Promise<CheckoutResult> {

  if (items.length === 0) {
    throw new Error("Cart is empty.");
  }

  const grandTotal = getGrandTotal(items);
  const change = getChange(grandTotal, cashReceived);
  const saleRef = doc(collection(db, "sales"));

  await runTransaction(db, async (transaction) => {
    //
    // Phase 1 — Read every product
    //
    const productSnapshots = [];

    for (const item of items) {
      if (!item.product.id) {
        throw new Error("Invalid product.");
      }

      const productRef = doc(db, "products", item.product.id);

      const snapshot = await transaction.get(productRef);

      productSnapshots.push({
        item,
        productRef,
        snapshot,
      });
    }
    //
    // Phase 2 — Validate stock
    //
    for (const product of productSnapshots) {
      if (!product.snapshot.exists()) {
        throw new Error(
          `${product.item.product.name} no longer exists.`
        );
      }

      const currentQuantity = Number(
        product.snapshot.data().quantity ?? 0
      );

      if (currentQuantity < product.item.quantity) {
        throw new Error(
          `Not enough stock for ${product.item.product.name}.`
        );
      }
    }

    //
    // Phase 3 — Update inventory
    //
    for (const product of productSnapshots) {
      const data = product.snapshot.data();

if (!data) {
  throw new Error(
    `${product.item.product.name} no longer exists.`
  );
}

const currentQuantity = Number(data.quantity ?? 0);

      transaction.update(product.productRef, {
        quantity:
          currentQuantity - product.item.quantity,
      });
    }

    //
    // Phase 4 — Save ONE sale document
    //

    transaction.set(saleRef, {
      createdAt: serverTimestamp(),
      total: grandTotal,
      cashReceived,
      change,

      items: items.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        total:
          item.product.price * item.quantity,
      })),
    });
  });
  return {
  saleId: saleRef.id,
  createdAt: new Date(),
  total: grandTotal,
  cashReceived,
  change,
  items,
};
}