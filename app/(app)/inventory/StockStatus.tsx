interface StockStatusProps {
    quantity: number;
}

export default function StockStatus({
    quantity,
}: StockStatusProps) {
    if (quantity === 0) {
        return (
            <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                Out of Stock
            </span>
        );
    }

    if (quantity <= 4) {
        return (
            <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                Low Stock
            </span>
        );
    }

    return (
        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            In Stock
        </span>
    );
}