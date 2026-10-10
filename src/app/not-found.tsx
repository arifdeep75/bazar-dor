
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[65vh] flex-col items-center justify-center bg-[#f0f5f0] px-4 text-center">
      <p className="text-7xl font-bold text-green-700">404</p>

      <h1 className="mt-4 text-2xl font-bold text-[#24352a]">
        পেজটি খুঁজে পাওয়া যায়নি!
      </h1>

      <p className="mt-2 max-w-md text-sm text-gray-600">
        দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি।
      </p>

      <Link
        href="/"
        className="mt-6 rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
      >
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}