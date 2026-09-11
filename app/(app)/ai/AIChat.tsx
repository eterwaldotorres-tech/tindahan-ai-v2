"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { AIMessage } from "./types";

export default function AIChat() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<AIMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const trimmedMessage = message.trim();

        if (!trimmedMessage || isLoading) {
            return;
        }

        const user = auth.currentUser;

        if (!user) {
            return;
        }

        const userMessage: AIMessage = {
            id: Date.now(),
            role: "user",
            content: trimmedMessage,
        };

        setMessages((currentMessages) => [
            ...currentMessages,
            userMessage,
        ]);

        setMessage("");
        setIsLoading(true);

        try {
            const idToken = await user.getIdToken();

            const response = await fetch("/api/ai/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${idToken}`,
                },
                body: JSON.stringify({
                    message: trimmedMessage,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Something went wrong."
                );
            }

            console.log("AI response:", data);
        } catch (error) {
            console.error("AI request failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-[calc(100vh-8rem)] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="flex-1 overflow-y-auto p-6">
                {messages.length === 0 ? (
                    <div className="flex min-h-full items-center justify-center">
                        <div className="max-w-md text-center">
                            <h2 className="text-lg font-semibold text-gray-900">
                                How can I help?
                            </h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Ask me about your sales, inventory,
                                or store performance.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {messages.map((item) => (
                            <div
                                key={item.id}
                                className={`flex ${item.role === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                    }`}
                            >
                                <div
                                    className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${item.role === "user"
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100 text-gray-900"
                                        }`}
                                >
                                    {item.content}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <form
                onSubmit={handleSubmit}
                className="border-t border-gray-200 bg-white p-4"
            >
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={message}
                        onChange={(event) =>
                            setMessage(event.target.value)
                        }
                        placeholder="Ask about your store..."
                        disabled={isLoading}
                        className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
                    />

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isLoading ? "Sending..." : "Send"}
                    </button>
                </div>
            </form>
        </div>
    );
}