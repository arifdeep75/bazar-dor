"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "../../lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  if (isPending) {
    return (
      <main className="min-h-screen bg-[#f3f8f3] px-4 py-10 sm:py-14">
        <div className="mx-auto max-w-md rounded-2xl bg-white p-6 text-center shadow-sm">
          লোড হচ্ছে...
        </div>
      </main>
    );
  }

  if (!session?.user) {
    router.push("/sign-in");
    return null;
  }

  const currentName = name || session.user.name || "";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentName.trim()) {
      setError("নাম লিখুন");
      setMessage("");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    const { error } = await authClient.updateUser({
      name: currentName.trim(),
    });

    setLoading(false);

    if (error) {
      setError(error.message || "নাম আপডেট করা যায়নি");
      return;
    }

    setMessage("নাম সফলভাবে আপডেট হয়েছে");
  };

  return (
    <main className="min-h-screen bg-[#f3f8f3] px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-md">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            প্রোফাইল
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            আপনার প্রোফাইলের তথ্য আপডেট করুন
          </p>
        </div>

        {/* Profile Card */}
        <div className="mt-7 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-7">
          {/* Email */}
          <div className="mb-6 rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">ইমেইল</p>

            <p className="mt-1 font-medium text-gray-900">
              {session.user.email}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                নাম
              </label>

              <input
                id="name"
                type="text"
                value={currentName}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম লিখুন"
                required
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-600">
                {error}
              </p>
            )}

            {/* Success */}
            {message && (
              <p className="rounded-lg bg-green-50 px-3 py-2.5 text-sm text-green-600">
                {message}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "আপডেট হচ্ছে..." : "নাম আপডেট করুন"}
            </button>
          </form>

          {/* Back */}
          <button
            type="button"
            onClick={() => router.push("/")}
            className="mt-4 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            হোমে ফিরে যান
          </button>
        </div>
      </div>
    </main>
  );
}