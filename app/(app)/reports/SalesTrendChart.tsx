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
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold text-gray-900">
                Sales Trend
            </h2>

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}
                        margin={{
                            top: 10,
                            right: 20,
                            left: 10,
                            bottom: 10,
                        }}>
                        <CartesianGrid
                            stroke="#E5E7EB"
                            strokeDasharray="4 4"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="label"
                            tick={{ fontSize: 12 }}
                        />

                        <YAxis
                            tick={{ fontSize: 12 }}
                            tickFormatter={(value) => formatCurrency(value)}
                        />

                        <Tooltip
                            formatter={(value) => formatCurrency(Number(value))}
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
                            animationDuration={700} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}