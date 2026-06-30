import {
  addDoc,
  collection,
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { CartItem } from "./types";

export async function checkoutCart(items: CartItem[]) {
  if (items.length === 0) {
    throw new Error("Cart is empty.");
  }

  await runTransaction(db, async (transaction) => {
    for (const item of items) {
      if (!item.product.id) {
        throw new Error("Invalid product.");
      }

      const productRef = doc(db, "products", item.product.id);
      const snapshot = await transaction.get(productRef);

      if (!snapshot.exists()) {
        throw new Error(`${item.product.name} no longer exists.`);
      }

      const data = snapshot.data();

      const currentQuantity = Number(data.quantity ?? 0);

      if (currentQuantity < item.quantity) {
        throw new Error(
          `Not enough stock for ${item.product.name}.`
        );
      }

      transaction.update(productRef, {
        quantity: currentQuantity - item.quantity,
      });

      const saleRef = doc(collection(db, "sales"));

      transaction.set(saleRef, {
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        total: item.product.price * item.quantity,
        createdAt: serverTimestamp(),
      });
    }
  });
}