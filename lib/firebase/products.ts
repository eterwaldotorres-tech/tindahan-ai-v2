import { getFirestore } from "firebase-admin/firestore";

import "./admin";

export interface AIProduct {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

const adminDb = getFirestore();

export async function getAIProducts(): Promise<AIProduct[]> {
    const snapshot = await adminDb
        .collection("products")
        .get();

    return snapshot.docs.map((document) => {
        const data = document.data();

        return {
            id: document.id,
            name: data.name,
            price: data.price,
            quantity: data.quantity,
        };
    });
}