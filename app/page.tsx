"use client";

import { useRouter } from "next/navigation";
import { signInWithGoogle } from "../lib/auth";

export default function Home() {
  const router = useRouter();

  async function handleSignIn() {
    const user = await signInWithGoogle();

    if (user) {
      router.push("/dashboard");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center">
        <h1 className="text-4xl font-bold text-blue-600">
          Tindahan AI
        </h1>

        <p className="mt-4 text-gray-600">
          Your AI-powered sari-sari store assistant
        </p>

        <button
          onClick={handleSignIn}
          className="mt-8 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Sign in with Google
        </button>
      </div>
    </main>
  );
}