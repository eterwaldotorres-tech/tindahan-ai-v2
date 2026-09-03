export default function InventorySkeleton() {
    return (
        <div className="space-y-8">
            {/* Product Form */}
            <div className="animate-pulse rounded-xl bg-white p-6 shadow-md">
                <div className="h-7 w-40 rounded bg-gray-200" />

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="h-12 rounded-lg bg-gray-200"
                        />
                    ))}
                </div>

                <div className="mt-6 h-12 w-36 rounded-lg bg-gray-200" />
            </div>

            {/* Products Table */}
            <div className="animate-pulse rounded-xl bg-white p-6 shadow-md">
                <div className="flex items-center justify-between">
                    <div className="h-7 w-48 rounded bg-gray-200" />
                    <div className="h-12 w-80 rounded-lg bg-gray-200" />
                </div>

                <div className="mt-6 space-y-4">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div
                            key={item}
                            className="h-14 rounded-lg bg-gray-100"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}