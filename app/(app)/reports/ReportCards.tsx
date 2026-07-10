import { ReportSummary } from "./types";

interface ReportCardsProps {
    summary: ReportSummary;
}

export default function ReportCards({
    summary,
}: ReportCardsProps) {
    const cards = [
        {
            title: "Total Revenue",
            value: `₱${summary.totalRevenue.toFixed(2)}`,
            description: "Revenue for the selected period",
        },
        {
            title: "Transactions",
            value: summary.totalTransactions,
            description: "Completed sales",
        },
        {
            title: "Items Sold",
            value: summary.itemsSold,
            description: "Units sold",
        },
        {
            title: "Average Sale",
            value: `₱${summary.averageTransactionValue.toFixed(2)}`,
            description: "Per transaction",
        },
    ];

    return (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => (
                <div
                    key={card.title}
                    className="
            rounded-2xl
            border
            border-gray-200
            bg-white
            p-6
            shadow-sm
            transition-all
            duration-200
            hover:-translate-y-1
            hover:shadow-md
          "
                >
                    <p className="text-sm font-medium text-gray-500">
                        {card.title}
                    </p>

                    <h2 className="mt-3 text-4xl font-bold text-slate-900">
                        {card.value}
                    </h2>

                    <p className="mt-4 text-sm text-gray-500">
                        {card.description}
                    </p>
                </div>
            ))}
        </div>
    );
}