import {
    collection,
    getDocs,
    orderBy,
    query,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import { SaleDocument } from "../sales-history/types";

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