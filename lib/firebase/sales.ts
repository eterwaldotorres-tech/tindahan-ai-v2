import { getFirestore } from "firebase-admin/firestore";

import "./admin";

import { SaleDocument } from "@/app/(app)/sales-history/types";

const adminDb = getFirestore();

export async function getAISales(): Promise<SaleDocument[]> {
    const snapshot = await adminDb
        .collection("sales")
        .orderBy("createdAt", "desc")
        .get();

    return snapshot.docs.map((document) => ({
        id: document.id,
        ...(document.data() as Omit<SaleDocument, "id">),
    }));
}