import AIChat from "./AIChat";

export default function AIPage() {
    return (
        <div className="space-y-8 p-8">
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                    AI Assistant
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Get insights and answers about your store.
                </p>
            </div>

            <AIChat />
        </div>
    );
}