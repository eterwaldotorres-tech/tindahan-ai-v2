import {
    collection,
    getDocs,
    orderBy,
    query,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import { SaleDocument } from "../sales-history/types";
import {
    getProducts,
    Product,
} from "@/lib/products";

export async function getReportSales(): Promise<SaleDocument[]> {
    const salesQuery = query(
        collection(db, "sales"),
        orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(salesQuery);

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<SaleDocument, "id">),
    }));
}

export function getReportProducts(): Promise<Product[]> {
    return getProducts();
}