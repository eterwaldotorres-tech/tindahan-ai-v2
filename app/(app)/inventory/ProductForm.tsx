interface ProductFormProps {
    editingProductName: string | null;
    name: string;
    price: string;
    quantity: string;
    isSaving: boolean;
    onNameChange: (value: string) => void;
    onPriceChange: (value: string) => void;
    onQuantityChange: (value: string) => void;
    onSubmit: () => void;
    onCancel: () => void;
}

export default function ProductForm({
    editingProductName,
    name,
    price,
    quantity,
    isSaving,
    onNameChange,
    onPriceChange,
    onQuantityChange,
    onSubmit,
    onCancel,
}: ProductFormProps) {
    const isEditing = editingProductName !== null;

    return (
        <>
            {isEditing && (
                <div className="rounded-lg border border-blue-300 bg-blue-100 p-4 text-blue-800">
                    Editing: <strong>{editingProductName}</strong>
                </div>
            )}

            <div className="rounded-xl bg-white p-6 shadow-md">
                <h2 className="mb-6 text-2xl font-semibold text-slate-800">
                    {isEditing ? "Edit Product" : "Add New Product"}
                </h2>

                <div className="grid gap-4 md:grid-cols-3">
                    <div>
                        <label
                            htmlFor="product-name"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Product Name
                        </label>

                        <input
                            id="product-name"
                            type="text"
                            placeholder="e.g. Coca-Cola"
                            value={name}
                            onChange={(e) => onNameChange(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 p-3 text-black placeholder:text-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="product-price"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Price
                        </label>

                        <input
                            id="product-price"
                            type="number"
                            min="0.01"
                            step="0.01"
                            placeholder="e.g. 25.00"
                            value={price}
                            onChange={(e) => onPriceChange(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 p-3 text-black placeholder:text-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="product-quantity"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Quantity
                        </label>

                        <input
                            id="product-quantity"
                            type="number"
                            min="0"
                            step="1"
                            placeholder="e.g. 20"
                            value={quantity}
                            onChange={(e) => onQuantityChange(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 p-3 text-black placeholder:text-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                    <button
                        type="button"
                        onClick={onSubmit}
                        disabled={isSaving}
                        className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isSaving
                            ? isEditing
                                ? "Updating..."
                                : "Adding..."
                            : isEditing
                                ? "Update Product"
                                : "Add Product"}
                    </button>

                    {isEditing && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="rounded-lg bg-gray-200 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}