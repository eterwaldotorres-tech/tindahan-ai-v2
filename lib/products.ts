import {
  addDoc,
  collection,
  getDocs,
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