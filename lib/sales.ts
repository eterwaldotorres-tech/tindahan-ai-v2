import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { Product } from "@/lib/products";

export async function recordSale(
  product: Product,
  quantity: number
) {
  if (!product.id) {
    throw new Error("Product ID is required.");
  }

  const productRef = doc(db, "products", product.id);

  const snapshot = await getDoc(productRef);

  if (!snapshot.exists()) {
    throw new Error("Product not found.");
  }

  const data = snapshot.data();

  const currentQuantity = Number(data.quantity ?? 0);

  if (quantity > currentQuantity) {
    throw new Error("Not enough stock.");
  }

  const total = product.price * quantity;

  await addDoc(collection(db, "sales"), {
    productId: product.id,
    productName: product.name,
    quantity,
    total,
    createdAt: serverTimestamp(),
  });

  await updateDoc(productRef, {
    quantity: currentQuantity - quantity,
  });

  return true;
}