import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getProductBySlug } from "../../../lib/api";

function toBengaliNumber(value: number | string) {
  const bengaliDigits = "০১২৩৪৫৬৭৮৯";

  return String(value).replace(
    /\d/g,
    (digit) => bengaliDigits[Number(digit)]
  );
}

function formatPrice(value: number) {
  return `${toBengaliNumber(value)} টাকা`;
}

async function ProductDetailsContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const markets = product.markets;

  // Minimum price
  const minimumPrice = Math.min(
    ...markets.map((market) => market.min)
  );

  // Maximum price
  const maximumPrice = Math.max(
    ...markets.map((market) => market.max)
  );

  // Average price
  const averagePrice =
    markets.reduce(
      (total, market) => total + (market.min + market.max) / 2,
      0
    ) / markets.length;

  const averageRounded = Math.round(averagePrice);
  const priceDifference = product.today - product.yesterday;

  return (
    <main className="min-h-screen bg-[#f3f8f3] py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* Breadcrumb */}
        <div className="mb-4 text-sm text-gray-500">
          <Link
            href="/"
            className="hover:text-green-600"
          >
            হোম
          </Link>

          <span className="mx-2">›</span>

          <span>{product.categoryNameBn}</span>

          <span className="mx-2">›</span>

          <span>{product.nameBn}</span>
        </div>

        {/* ================= PRODUCT SUMMARY ================= */}
        <section className="rounded-2xl border border-[#e5ebe5] bg-white p-5 shadow-sm sm:p-7">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            {/* Product Info */}
            <div className="flex items-center gap-4">

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gray-50 text-4xl">
                {product.categoryIcon || product.image}
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  {product.nameBn}
                </h1>

                <p className="mt-1 text-sm text-gray-500">
  {priceDifference > 0
    ? `গতকালের তুলনায় আজ দাম বেড়েছে ${toBengaliNumber(priceDifference)} টাকা`
    : priceDifference < 0
    ? `গতকালের তুলনায় আজ দাম কমেছে ${toBengaliNumber(Math.abs(priceDifference))} টাকা`
    : "গতকালের তুলনায় আজ দাম অপরিবর্তিত"}
</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                    {product.categoryIcon} {product.categoryNameBn}
                  </span>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                    {product.unit}
                  </span>
                </div>
              </div>
            </div>

            {/* Today's Price */}
            <div className="rounded-xl bg-gray-50 px-5 py-4 text-right">
              <p className="text-xs text-gray-500">
                আজকের দাম
              </p>

              <p className="mt-1 text-2xl font-bold text-gray-900">
                {formatPrice(product.today)}
              </p>

              <span
                className={`mt-2 inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${
                  product.change.dir === "up"
                    ? "bg-red-50 text-red-500"
                    : product.change.dir === "down"
                    ? "bg-green-50 text-green-600"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {product.change.dir === "up" && "▲ "}
                {product.change.dir === "down" && "▼ "}
                {product.change.dir === "flat" && "— "}
                {toBengaliNumber(product.change.pct)}%
              </span>
            </div>

          </div>
        </section>

        {/* ================= PRICE SUMMARY ================= */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">

          <h2 className="text-lg font-bold text-gray-900">
            দামের সংক্ষেপ
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">

            {/* Minimum */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                সর্বনিম্ন দাম
              </p>

              <p className="mt-2 text-xl font-bold text-green-600">
                {formatPrice(minimumPrice)}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            {/* Maximum */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                সর্বোচ্চ দাম
              </p>

              <p className="mt-2 text-xl font-bold text-red-500">
                {formatPrice(maximumPrice)}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            {/* Average */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                গড় দাম
              </p>

              <p className="mt-2 text-xl font-bold text-green-600">
                {formatPrice(averageRounded)}
              </p>
              

              <p className="mt-1 text-xs text-gray-500">
                প্রতি কেজি-এর হিসাবে
              </p>
            </div>

          </div>
        </section>

        {/* ================= MARKET PRICES ================= */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">

          <h2 className="text-lg font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            বিভিন্ন বাজারে {product.nameBn}-এর আজকের দাম
          </p>

          {/* Desktop Table */}
          <div className="mt-5 hidden overflow-x-auto md:block">
            <table className="w-full border-collapse text-sm">

              <thead>
                <tr className="border-b bg-gray-50 text-left text-gray-600">
                  <th className="px-4 py-3 font-medium">
                    বাজার
                  </th>

                  <th className="px-4 py-3 font-medium">
                    বিভাগ
                  </th>

                  <th className="px-4 py-3 font-medium">
                    সর্বনিম্ন
                  </th>

                  <th className="px-4 py-3 font-medium">
                    সর্বোচ্চ
                  </th>

                  <th className="px-4 py-3 text-right font-medium">
                    গড়
                  </th>
                </tr>
              </thead>

              <tbody>
                {markets.map((market, index) => {
                  const marketAverage = Math.round(
                    (market.min + market.max) / 2
                  );

                  return (
                    <tr
                      key={`${market.market}-${index}`}
                      className="border-b last:border-b-0 hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 font-medium text-gray-800">
                        {market.market}
                      </td>

                      <td className="px-4 py-3 text-gray-600">
                        {market.division}
                      </td>

                      <td className="px-4 py-3 text-gray-700">
                        {formatPrice(market.min)}
                      </td>

                      <td className="px-4 py-3 text-gray-700">
                        {formatPrice(market.max)}
                      </td>

                      <td className="px-4 py-3 text-right font-semibold text-gray-900">
                        {formatPrice(marketAverage)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>

          {/* Mobile Cards */}
          <div className="mt-5 space-y-3 md:hidden">

            {markets.map((market, index) => {
              const marketAverage = Math.round(
                (market.min + market.max) / 2
              );

              return (
                <div
                  key={`${market.market}-${index}`}
                  className="rounded-xl border border-gray-200 p-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">
                      {market.market}
                    </h3>

                    <span className="text-xs text-gray-500">
                      {market.division}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">

                    <div>
                      <p className="text-xs text-gray-500">
                        সর্বনিম্ন
                      </p>

                      <p className="mt-1 text-sm font-semibold">
                        {formatPrice(market.min)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        সর্বোচ্চ
                      </p>

                      <p className="mt-1 text-sm font-semibold">
                        {formatPrice(market.max)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        গড়
                      </p>

                      <p className="mt-1 text-sm font-semibold">
                        {formatPrice(marketAverage)}
                      </p>
                    </div>

                  </div>
                </div>
              );
            })}

          </div>
        </section>

      </div>
    </main>
  );
}
export default function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<div className="p-6">লোড হচ্ছে...</div>}>
      <ProductDetailsContent params={params} />
    </Suspense>
  );
}