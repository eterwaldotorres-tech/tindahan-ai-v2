import { Product } from "@/lib/products";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
  search: string;
  onSelect: (product: Product) => void;
}

export default function ProductList({
  products,
  search,
  onSelect,
}: ProductListProps) {
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  if (filteredProducts.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
        No products found.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}