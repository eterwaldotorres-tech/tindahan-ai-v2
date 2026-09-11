import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase/admin";

interface ChatRequest {
    message?: unknown;
}

export async function POST(request: Request) {
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

        const body = (await request.json()) as ChatRequest;

        if (
            typeof body.message !== "string" ||
            !body.message.trim()
        ) {
            return NextResponse.json(
                {
                    error: "A valid message is required.",
                },
                { status: 400 }
            );
        }

        const message = body.message.trim();

        if (message.length > 2000) {
            return NextResponse.json(
                {
                    error: "Message is too long.",
                },
                { status: 400 }
            );
        }

        return NextResponse.json({
            message: "AI endpoint is working.",
            received: message,
            userId: decodedToken.uid,
        });
    } catch (error) {
        console.error("AI authentication error:", error);

        return NextResponse.json(
            {
                error: "Unauthorized.",
            },
            { status: 401 }
        );
    }
}