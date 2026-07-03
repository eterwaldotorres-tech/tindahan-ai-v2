"use client";

import { getSuggestedCashAmounts } from "./cash";
import { formatPeso } from "./currency";

interface QuickCashButtonsProps {
  total: number;
  onSelect: (amount: number) => void;
}

export default function QuickCashButtons({
  total,
  onSelect,
}: QuickCashButtonsProps) {
    const suggestions = getSuggestedCashAmounts(total);
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-gray-700">
        Quick Cash
      </p>

      <div className="grid grid-cols-4 gap-2">
        {suggestions.map((amount) => (
  <button
    key={amount}
    type="button"
    onClick={() => onSelect(amount)}
    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 active:scale-95"
  >
    {formatPeso(amount)}
  </button>
))}

        <button
          type="button"
          onClick={() => onSelect(total)}
          className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-95"
        >
          Exact
        </button>
      </div>
    </div>
  );
}