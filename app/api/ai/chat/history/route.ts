import { NextResponse } from "next/server";

import { adminAuth } from "@/lib/firebase/admin";
import { getAIChatMessages } from "@/lib/firebase/aiChats";

export async function GET(request: Request) {
    try {
        const authorization = request.headers.get("authorization");

        if (!authorization?.startsWith("Bearer ")) {
            return NextResponse.json(
                {
                    error: "Authentication required.",
                },
                { status: 401 }
            );
        }

        const idToken = authorization.substring("Bearer ".length).trim();

        if (!idToken) {
            return NextResponse.json(
                {
                    error: "Authentication required.",
                },
                { status: 401 }
            );
        }

        const decodedToken = await adminAuth.verifyIdToken(idToken);

        const messages = await getAIChatMessages(
            decodedToken.uid
        );

        return NextResponse.json({
            messages,
        });
    } catch (error) {
        console.error("AI chat history error:", error);

        return NextResponse.json(
            {
                error: "Unable to load chat history.",
            },
            { status: 500 }
        );
    }
}