import { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export default function ProductCard({
  product,
  onSelect,
}: ProductCardProps) {
  const lowStock = product.quantity < 5;

  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
      <h2 className="text-xl font-bold text-slate-800">
        {product.name}
      </h2>

      <p className="text-2xl font-bold text-blue-600 mt-2">
        ₱{product.price}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            lowStock
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          Stock: {product.quantity}
        </span>

        <button
          onClick={() => onSelect(product)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          Select
        </button>
      </div>
    </div>
  );
}