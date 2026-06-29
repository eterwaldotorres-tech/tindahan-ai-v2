export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold">Dashboard</h1>

      <p className="text-gray-600 mt-2">
        Welcome to Tindahan AI
      </p>

      <div className="grid md:grid-cols-4 gap-6 mt-10">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold">Products</h2>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold">Today's Sales</h2>
          <p className="text-3xl font-bold mt-2">₱0</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold">Low Stock</h2>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold">AI Insights</h2>
          <p className="text-sm mt-2">
            You're fully stocked today.
          </p>
        </div>
      </div>
    </main>
  );
}