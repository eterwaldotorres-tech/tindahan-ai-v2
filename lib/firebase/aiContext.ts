import { AIProduct } from "./products";
import {
    AIProductSales,
    AIRestockCandidate,
    AISalesSummary,
} from "./aiSalesCalculations";

export interface AITodayWeekMonthSummary {
    today: AISalesSummary;
    week: AISalesSummary;
    month: AISalesSummary;
}

interface BuildAIContextParams {
    products: AIProduct[];
    salesContext: string;
    productSalesContext: string;
    topSellingProductsContext: string;
    restockContext: string;
    salesSummary: AISalesSummary;
    periodSummaries: AITodayWeekMonthSummary;
}

export function buildAIContext({
    products,
    salesContext,
    productSalesContext,
    topSellingProductsContext,
    restockContext,
    salesSummary,
    periodSummaries,
}: BuildAIContextParams): string {
    const inventoryContext = products
        .map(
            (product) =>
                `- ${product.name}: ${product.quantity} in stock, ₱${product.price}`
        )
        .join("\n");

    const formatSummary = (
        summary: AISalesSummary
    ): string => {
        if (summary.transactionCount === 0) {
            return "No sales recorded for this period.";
        }

        return [
            `Revenue: ₱${summary.totalRevenue}`,
            `Transactions: ${summary.transactionCount}`,
            `Items sold: ${summary.itemsSold}`,
            `Average transaction: ₱${summary.averageTransaction.toFixed(
                2
            )}`,
        ].join("\n");
    };

    return `
CURRENT INVENTORY:
${inventoryContext || "No products are currently in inventory."}

RECENT SALES:
${salesContext || "No sales are currently available."}

PRODUCT SALES PERFORMANCE:
${productSalesContext ||
        "No product sales data is currently available."
        }

TOP-SELLING PRODUCTS:
${topSellingProductsContext ||
        "No top-selling product data is currently available."
        }

RESTOCK CANDIDATES:
${restockContext ||
        "No products currently meet the low-stock restock criteria."
        }

SALES SUMMARY:
${formatSummary(salesSummary)}

TODAY'S SALES SUMMARY:
${formatSummary(periodSummaries.today)}

THIS WEEK'S SALES SUMMARY:
${formatSummary(periodSummaries.week)}

THIS MONTH'S SALES SUMMARY:
${formatSummary(periodSummaries.month)}
`.trim();
}