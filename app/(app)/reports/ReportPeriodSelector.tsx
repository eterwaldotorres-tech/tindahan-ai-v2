import { ReportPeriod } from "./types";

interface ReportPeriodSelectorProps {
    value: ReportPeriod;
    onChange: (period: ReportPeriod) => void;
}

const periods: {
    value: ReportPeriod;
    label: string;
}[] = [
        { value: "today", label: "Today" },
        { value: "week", label: "This Week" },
        { value: "month", label: "This Month" },
    ];

export default function ReportPeriodSelector({
    value,
    onChange,
}: ReportPeriodSelectorProps) {
    return (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {periods.map((period) => (
                <button
                    key={period.value}
                    type="button"
                    onClick={() => onChange(period.value)}
                    className={`rounded-md px-4 py-2 text-sm font-medium transition ${value === period.value
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                >
                    {period.label}
                </button>
            ))}
        </div>
    );
}