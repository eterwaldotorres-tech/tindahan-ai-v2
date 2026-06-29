import { Product } from "@/lib/products";

type Props = {
  products: Product[];
};

export default function ProductTable({ products }: Props) {
  if (products.length === 0) {
    return <p className="text-gray-600">No products yet.</p>;
  }

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="text-left py-2">Product</th>
          <th className="text-left py-2">Price</th>
          <th className="text-left py-2">Quantity</th>
        </tr>
      </thead>

      <tbody>
        {products.map((product) => (
          <tr key={product.id} className="border-b">
            <td className="py-3">{product.name}</td>
            <td className="py-3">₱{product.price}</td>
            <td className="py-3">{product.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}