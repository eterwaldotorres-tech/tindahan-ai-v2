import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export type Product = {
  id?: string;
  name: string;
  price: number;
  quantity: number;
};

export async function addProduct(product: Product) {
  return await addDoc(collection(db, "products"), product);
}

export async function getProducts(): Promise<Product[]> {
  const snapshot = await getDocs(collection(db, "products"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Product, "id">),
  }));
}

export async function deleteProduct(id: string) {
  await deleteDoc(doc(db, "products", id));
}

export async function updateProduct(product: Product) {
  if (!product.id) {
    throw new Error("Product ID is required.");
  }

  const productRef = doc(db, "products", product.id);

  await updateDoc(productRef, {
    name: product.name,
    price: product.price,
    quantity: product.quantity,
  });
}

export async function getProduct(id: string): Promise<Product | null> {
  const productRef = doc(db, "products", id);

  const snapshot = await getDoc(productRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as Omit<Product, "id">),
  };
}