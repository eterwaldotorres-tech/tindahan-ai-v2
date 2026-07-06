import { SaleDocument } from "./types";

interface SalesTableProps {
  sales: SaleDocument[];
  onViewReceipt: (sale: SaleDocument) => void;
}

export default function SalesTable({
  sales,
  onViewReceipt,
}: SalesTableProps) {
  return (
    <table className="w-full bg-white shadow rounded-lg text-gray-900">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-3 text-left">Date</th>
          <th className="p-3 text-center">Items</th>
          <th className="p-3 text-right">Total</th>
          <th className="p-3 text-right">Cash</th>
          <th className="p-3 text-right">Change</th>
          <th className="p-3 text-center">Actions</th>
        </tr>
      </thead>

      <tbody>
        {sales.map((sale) => (
          <tr key={sale.id} className="border-t">
            <td className="p-3">
              {sale.createdAt
                ? new Date(
                  (sale.createdAt as { toDate(): Date }).toDate()
                ).toLocaleString()
                : "-"}
            </td>

            <td className="p-3 text-center">
              {sale.items?.length ?? 0}
            </td>

            <td className="p-3 text-right">
              ₱{sale.total}
            </td>

            <td className="p-3 text-right">
              ₱{sale.cashReceived}
            </td>

            <td className="p-3 text-right">
              ₱{sale.change}
            </td>

            <td className="p-3 text-center">
              <button
                type="button"
                onClick={() => onViewReceipt(sale)}
                className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-100"
              >
                View Receipt
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}