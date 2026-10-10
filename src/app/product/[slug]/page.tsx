import { connection } from "next/server";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../../../lib/auth";


import { getProducts } from "../../../lib/api";

function formatUnit(unit: string) {
  const units: Record<string, string> = {
    kg: "প্রতি কেজি",
    liter: "প্রতি লিটার",
    litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
    pcs: "প্রতি পিস",
  };

  return units[unit.toLowerCase()] || `প্রতি ${unit}`;
}

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
await connection();

const { slug } = await params;

const products = await getProducts();

const product = products.find(
  (item) => item.slug === slug
);


if (!product) {
  notFound();
}

const session = await auth.api.getSession({
  headers: await headers(),
});

if (!session?.user) {
  redirect("/sign-in?reason=auth-required");
}



  const minPrice = Math.min(
    ...product.markets.map((market) => market.min)
  );

  const maxPrice = Math.max(
    ...product.markets.map((market) => market.max)
  );

  const averagePrice =
    product.markets.reduce(
      (total, market) =>
        total + (market.min + market.max) / 2,
      0
    ) / product.markets.length;

  const priceDifference =
    product.today - product.yesterday;

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";
  const isFlat = product.change.dir === "flat";

  return (
    <main className="min-h-screen bg-[#f3f8f3] py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        <div className="mb-5 text-sm text-gray-500">
          <Link
            href="/"
            className="hover:text-green-600"
          >
            হোম
          </Link>

          <span className="mx-2">›</span>

          <Link
            href={`/category/${product.category}`}
            className="hover:text-green-600"
          >
            {product.categoryNameBn}
          </Link>

          <span className="mx-2">›</span>

          <span>{product.nameBn}</span>
        </div>

        {/* Product Summary */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_280px]">

            {/* Left */}
            <div>
              <div className="flex items-start gap-4">
                {/* Product Image / Icon */}
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-5xl">
                  {product.image || product.categoryIcon}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                      {product.categoryIcon}{" "}
                      {product.categoryNameBn}
                    </span>

                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                      {formatUnit(product.unit)}
                    </span>
                  </div>

                  <h1 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">
                    {product.nameBn}
                  </h1>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {product.nameBn} এর আজকের বাজার দর,
                    গতকালের দাম এবং বিভিন্ন বাজারের
                    সর্বনিম্ন ও সর্বোচ্চ মূল্য দেখুন।
                  </p>
                </div>
              </div>

              {/* Price Change */}
              <div className="mt-6 rounded-xl bg-gray-50 p-4">
                <p className="text-sm text-gray-500">
                  গতকালের তুলনায়
                </p>

                <p
                  className={`mt-1 text-base font-semibold ${
                    isUp
                      ? "text-red-500"
                      : isDown
                        ? "text-green-600"
                        : "text-gray-500"
                  }`}
                >
                  {isUp && "▲ "}
                  {isDown && "▼ "}
                  {isFlat && "— "}

                  {isFlat
                    ? "দাম অপরিবর্তিত"
                    : `${toBengaliNumber(
                        Math.abs(priceDifference)
                      )} টাকা ${
                        isUp ? "বেড়েছে" : "কমেছে"
                      }`}
                </p>
              </div>
            </div>

            {/* Today's Price */}
            <div className="rounded-2xl bg-green-50 p-6 lg:text-right">
              <p className="text-sm text-gray-500">
                আজকের দাম
              </p>

              <p className="mt-2 text-4xl font-bold text-gray-900">
                {toBengaliNumber(product.today)}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                টাকা / {product.unit}
              </p>

              <div
                className={`mt-4 inline-flex rounded-full px-3 py-1.5 text-sm font-semibold ${
                  isUp
                    ? "bg-red-100 text-red-600"
                    : isDown
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                }`}
              >
                {isUp && "▲ "}
                {isDown && "▼ "}
                {isFlat && "— "}

                {toBengaliNumber(product.change.pct)}%
              </div>
            </div>
          </div>
        </section>

        {/* Price Summary */}
        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">
              সর্বনিম্ন দাম
            </p>

            <p className="mt-2 text-2xl font-bold text-green-600">
              {formatPrice(minPrice)}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">
              সর্বোচ্চ দাম
            </p>

            <p className="mt-2 text-2xl font-bold text-red-500">
              {formatPrice(maxPrice)}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">
              গড় বাজার দর
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-900">
              {formatPrice(Math.round(averagePrice))}
            </p>
          </div>
        </section>

        {/* Market Prices */}
        <section className="mt-8">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              বিভিন্ন বাজারের দাম
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              বিভিন্ন এলাকার বাজার অনুযায়ী আজকের দাম
            </p>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:block">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                    বাজার
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                    বিভাগ
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                    সর্বনিম্ন
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                    সর্বোচ্চ
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {product.markets.map((market, index) => (
                  <tr
                    key={`${market.market}-${index}`}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-5 py-4 text-sm font-medium text-gray-900">
                      {market.market}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-500">
                      {market.division}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-green-600">
                      {formatPrice(market.min)}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-red-500">
                      {formatPrice(market.max)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="space-y-3 md:hidden">
            {product.markets.map((market, index) => (
              <div
                key={`${market.market}-${index}`}
                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {market.market}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      {market.division}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-green-50 p-3">
                    <p className="text-xs text-gray-500">
                      সর্বনিম্ন
                    </p>

                    <p className="mt-1 font-bold text-green-600">
                      {formatPrice(market.min)}
                    </p>
                  </div>

                  <div className="rounded-lg bg-red-50 p-3">
                    <p className="text-xs text-gray-500">
                      সর্বোচ্চ
                    </p>

                    <p className="mt-1 font-bold text-red-500">
                      {formatPrice(market.max)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Back */}
        <div className="mt-8">
          <Link
            href={`/category/${product.category}`}
            className="inline-flex rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-green-600 hover:text-green-600"
          >
            ← {product.categoryNameBn}-এ ফিরে যান
          </Link>
        </div>
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
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#f3f8f3] py-12">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <p className="text-gray-500">
              লোড হচ্ছে...
            </p>
          </div>
        </main>
      }
    >
      <ProductDetailsContent params={params} />
    </Suspense>
  );
}