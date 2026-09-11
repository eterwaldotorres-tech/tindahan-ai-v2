import {
    FieldValue,
    getFirestore,
} from "firebase-admin/firestore";

import "./admin";

import { AIMessage } from "@/app/(app)/ai/types";

const adminDb = getFirestore();

export async function saveAIMessage(
    userId: string,
    message: AIMessage
) {
    const chatRef = adminDb.collection("aiChats").doc(userId);

    await chatRef.set(
        {
            userId,
            updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
    );

    await chatRef
        .collection("messages")
        .doc(String(message.id))
        .set({
            ...message,
            createdAt: FieldValue.serverTimestamp(),
        });
}

export async function getAIChatMessages(
    userId: string
): Promise<AIMessage[]> {
    const snapshot = await adminDb
        .collection("aiChats")
        .doc(userId)
        .collection("messages")
        .orderBy("id", "asc")
        .get();

    return snapshot.docs.map((document) => {
        const data = document.data();

        return {
            id: data.id,
            role: data.role,
            content: data.content,
        } as AIMessage;
    });
}