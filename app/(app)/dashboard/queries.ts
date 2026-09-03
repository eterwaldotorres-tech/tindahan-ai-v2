import {
    collection,
    getDocs,
    limit,
    orderBy,
    query,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import type { Product } from "@/lib/products";
import type { SaleDocument } from "../sales-history/types";

export async function getDashboardSales(): Promise<SaleDocument[]> {
    const snapshot = await getDocs(
        collection(db, "sales")
    );

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<SaleDocument, "id">),
    }));
}

export async function getDashboardProducts(): Promise<Product[]> {
    const snapshot = await getDocs(
        collection(db, "products")
    );

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Product, "id">),
    }));
}

export async function getRecentSales(
    limitCount = 5
): Promise<SaleDocument[]> {
    const salesQuery = query(
        collection(db, "sales"),
        orderBy("createdAt", "desc"),
        limit(limitCount)
    );

    const snapshot = await getDocs(salesQuery);

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<SaleDocument, "id">),
    }));
}