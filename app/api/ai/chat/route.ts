import OpenAI from "openai";
import { NextResponse } from "next/server";

import { adminAuth } from "@/lib/firebase/admin";
import { buildAIContext } from "@/lib/firebase/aiContext";
import { getAIProducts } from "@/lib/firebase/products";
import { getAISales } from "@/lib/firebase/sales";
import {
    calculateAIProductSales,
    calculateAIRestockCandidates,
    calculateAISalesSummary,
    filterAISalesByDateRange,
    getAITopSellingProducts,
    getThisMonthDateRange,
    getThisWeekDateRange,
    getTodayDateRange,
} from "@/lib/firebase/aiSalesCalculations";
import {
    getAIChatMessages,
    saveAIMessage,
} from "@/lib/firebase/aiChats";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

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

        const idToken = authorization
            .substring("Bearer ".length)
            .trim();

        if (!idToken) {
            return NextResponse.json(
                {
                    error: "Authentication required.",
                },
                { status: 401 }
            );
        }

        const decodedToken =
            await adminAuth.verifyIdToken(idToken);

        const userId = decodedToken.uid;

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

        const previousMessages =
            await getAIChatMessages(userId);

        const userMessage = {
            id: Date.now(),
            role: "user" as const,
            content: message,
        };

        await saveAIMessage(userId, userMessage);

        const products = await getAIProducts();
        const sales = await getAISales();

        const salesSummary = calculateAISalesSummary(sales);
        const productSales = calculateAIProductSales(sales);
        const restockCandidates = calculateAIRestockCandidates(
            products,
            productSales
        );
        const topSellingProducts =
            getAITopSellingProducts(productSales);

        const productSalesContext = productSales
            .map(
                (product) =>
                    `- ${product.productName}: ${product.quantitySold} sold, ₱${product.revenue} revenue`
            )
            .join("\n");

        const topSellingProductsContext =
            topSellingProducts
                .map(
                    (product, index) =>
                        `${index + 1}. ${product.productName}: ${product.quantitySold} sold, ₱${product.revenue} revenue`
                )
                .join("\n");

        const restockContext = restockCandidates
            .map(
                (product) =>
                    `- ${product.productName}: ${product.quantityInStock} in stock, ${product.quantitySold} sold, ${product.averageDailySales.toFixed(2)} average units sold per day`
            )
            .join("\n");

        const { startDate, endDate } = getTodayDateRange();

        const todaySales = filterAISalesByDateRange(
            sales,
            startDate,
            endDate
        );

        const todaySalesSummary =
            calculateAISalesSummary(todaySales);

        const {
            startDate: weekStartDate,
            endDate: weekEndDate,
        } = getThisWeekDateRange();

        const weekSales = filterAISalesByDateRange(
            sales,
            weekStartDate,
            weekEndDate
        );

        const weekSalesSummary =
            calculateAISalesSummary(weekSales);

        const {
            startDate: monthStartDate,
            endDate: monthEndDate,
        } = getThisMonthDateRange();

        const monthSales = filterAISalesByDateRange(
            sales,
            monthStartDate,
            monthEndDate
        );

        const monthSalesSummary =
            calculateAISalesSummary(monthSales);

        const salesContext = sales
            .slice(0, 20)
            .map((sale) => {
                const items = sale.items
                    .map(
                        (item) =>
                            `${item.productName} x${item.quantity} = ₱${item.total}`
                    )
                    .join(", ");

                return `- Sale ${sale.id}: ${items} | Total: ₱${sale.total}`;
            })
            .join("\n");
        const aiContext = buildAIContext({
            products,
            salesContext,
            productSalesContext,
            topSellingProductsContext,
            restockContext,
            salesSummary,
            periodSummaries: {
                today: todaySalesSummary,
                week: weekSalesSummary,
                month: monthSalesSummary,
            },
        });

        const conversation = [
            ...previousMessages,
            userMessage,
        ].map((chatMessage) => ({
            role: chatMessage.role,
            content: chatMessage.content,
        }));

        const response = await openai.responses.create({
            model: "gpt-5.6-luna",
            instructions: `
You are the AI assistant for Tindahan AI, a point-of-sale and
store management system designed for small retail stores.

Your role is to help store owners understand and manage their
business using Tindahan AI.

Guidelines:
- Be helpful, clear, practical, and concise.
- Use simple language that a small store owner can easily understand.
- Use the conversation history to understand follow-up questions.
- Use the inventory information provided below when answering
  inventory-related questions.
- Use the sales information provided below when answering
  sales-related questions.
- Prefer the calculated sales summaries when answering questions about
  overall sales performance.
- Use the appropriate period summary when the user asks about today,
  this week, or this month.
- Use the product sales performance data when answering questions
  about best-selling products or product performance.
- Do not invent sales figures, inventory quantities, prices, or other
  store data.
- Use the restock candidates and sales velocity when answering questions
  about which products may need restocking.
- Explain the reason for a restock suggestion using the available data.
- Do not invent reorder quantities.
- If the requested information is not available in the provided data,
  say so clearly.
- Do not estimate or guess missing store data.
- If a question requires a time period that is not explicitly provided,
  explain what data is available instead of inventing a result.
- Never claim that you performed an action unless the system actually
  performed it.
- When explaining business concepts, give practical examples when useful.

${aiContext}
`,
            input: conversation,
        });

        const aiMessage = {
            id: Date.now() + 1,
            role: "assistant" as const,
            content: response.output_text,
        };

        await saveAIMessage(userId, aiMessage);

        return NextResponse.json({
            message: aiMessage.content,
            userId,
        });
    } catch (error) {
        console.error("AI chat error:", error);

        return NextResponse.json(
            {
                error: "Unable to process your message.",
            },
            { status: 500 }
        );
    }
}