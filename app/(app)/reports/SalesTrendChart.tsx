"use client";

import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import { SalesTrendPoint } from "./types";
import ReportChartTooltip from "./ReportChartTooltip";

const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
        maximumFractionDigits: 0,
    }).format(value);

interface SalesTrendChartProps {
    data: SalesTrendPoint[];
}
export default function SalesTrendChart({
    data,
}: SalesTrendChartProps) {
    const hasSales = data.some((point) => point.revenue > 0);
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold text-gray-900">
                Sales Trend
            </h2>

            <div className="h-80">
                {!hasSales ? (
                    <div className="flex h-full items-center justify-center">
                        <div className="text-center">
                            <p className="text-lg font-medium text-gray-700">
                                No sales data
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                There are no sales recorded for this period.
                            </p>
                        </div>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={data}
                            margin={{
                                top: 10,
                                right: 20,
                                left: 10,
                                bottom: 10,
                            }}
                        >
                            <CartesianGrid
                                stroke="#E5E7EB"
                                strokeDasharray="4 4"
                                vertical={false}
                            />

                            <XAxis
                                dataKey="label"
                                tick={{ fontSize: 12 }}
                                interval={data.length > 14 ? 2 : 0}
                            />

                            <YAxis
                                tick={{ fontSize: 12 }}
                                tickFormatter={(value) =>
                                    formatCurrency(value)
                                }
                            />

                            <Tooltip
                                content={(props) => (
                                    <ReportChartTooltip {...props} />
                                )}
                            />

                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#2563eb"
                                strokeWidth={3}
                                dot={false}
                                activeDot={{
                                    r: 6,
                                }}
                                animationDuration={700}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}