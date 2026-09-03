export default function DashboardSkeleton() {
    return (
        <div className="space-y-8">
            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                {[1, 2, 3, 4].map((item) => (
                    <div
                        key={item}
                        className="h-[220px] animate-pulse rounded-2xl bg-white p-8 shadow-md"
                    >
                        <div className="mx-auto h-16 w-16 rounded-full bg-gray-200" />
                        <div className="mx-auto mt-5 h-5 w-24 rounded bg-gray-200" />
                        <div className="mx-auto mt-3 h-10 w-28 rounded bg-gray-200" />
                    </div>
                ))}
            </div>

            {/* Recent Sales */}
            <div className="animate-pulse rounded-2xl bg-white p-6 shadow-sm">
                <div className="h-6 w-40 rounded bg-gray-200" />

                <div className="mt-6 space-y-4">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="h-16 rounded-xl bg-gray-100"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}