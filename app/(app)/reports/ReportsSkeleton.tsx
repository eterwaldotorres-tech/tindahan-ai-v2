export default function ReportsSkeleton() {
    return (
        <div className="p-8 space-y-8">
            {/* KPI Cards */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {[1, 2, 3, 4].map((item) => (
                    <div
                        key={item}
                        className="h-32 animate-pulse rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                    >
                        <div className="h-4 w-24 rounded bg-gray-200" />
                        <div className="mt-4 h-8 w-32 rounded bg-gray-200" />
                    </div>
                ))}
            </div>

            {/* Sales Trend */}
            <div className="h-96 animate-pulse rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="h-5 w-32 rounded bg-gray-200" />
                <div className="mt-6 h-72 rounded-xl bg-gray-100" />
            </div>

            {/* Report Sections */}
            <div className="grid gap-8 lg:grid-cols-2">
                <div className="h-80 animate-pulse rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="h-5 w-48 rounded bg-gray-200" />
                    <div className="mt-6 h-56 rounded-xl bg-gray-100" />
                </div>

                <div className="h-80 animate-pulse rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="h-5 w-32 rounded bg-gray-200" />
                    <div className="mt-6 h-56 rounded-xl bg-gray-100" />
                </div>
            </div>

            {/* Inventory Insights */}
            <div className="h-48 animate-pulse rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="h-5 w-40 rounded bg-gray-200" />

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[1, 2, 3, 4].map((item) => (
                        <div
                            key={item}
                            className="h-20 rounded-xl bg-gray-100"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}