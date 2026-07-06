import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

import { SaleDocument } from "./types";

export async function getSales(): Promise<SaleDocument[]> {
  const salesQuery = query(
    collection(db, "sales"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(salesQuery);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as SaleDocument[];
}