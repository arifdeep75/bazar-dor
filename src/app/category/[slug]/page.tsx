import { connection } from "next/server";
import { Suspense } from "react";
import Link from "next/link";

import { getProductsByCategory } from "../../../lib/api";

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

async function CategoryPageContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await connection();

  const { slug } = await params;

  const categoryProducts = await getProductsByCategory(slug);

  // No products found
  if (categoryProducts.length === 0) {
    return (
      <main className="min-h-screen bg-[#f3f8f3] py-12">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            কোনো পণ্য পাওয়া যায়নি
          </h1>

          <p className="mt-2 text-gray-500">
            এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।
          </p>

          <Link
            href="/"
            className="mt-5 inline-block rounded-lg bg-green-600 px-5 py-2.5 font-semibold text-white hover:bg-green-700"
          >
            হোমে ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  const categoryName = categoryProducts[0].categoryNameBn;
  const categoryIcon = categoryProducts[0].categoryIcon;

  return (
    <main className="min-h-screen bg-[#f3f8f3] py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* Header */}
        <div className="mb-6">

          {/* Breadcrumb */}
          <div className="mb-3 text-sm text-gray-500">
            <Link
              href="/"
              className="hover:text-green-600"
            >
              হোম
            </Link>

            <span className="mx-2">›</span>

            <span>{categoryName}</span>
          </div>

          {/* Category Title */}
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">
              {categoryIcon}
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {categoryName}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                {toBengaliNumber(categoryProducts.length)}টি পণ্য
              </p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categoryProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              {/* Product Icon + Price Change */}
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-50 text-3xl">
                  {product.categoryIcon || product.image}
                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
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

              {/* Product Info */}
              <div className="mt-4">
                <h2 className="text-lg font-bold text-gray-900">
                  {product.nameBn}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {formatUnit(product.unit)}
                </p>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-xs text-gray-500">
                    আজকের দাম
                  </p>

                  <p className="mt-1 text-xl font-bold text-gray-900">
                    {formatPrice(product.today)}
                  </p>
                </div>

                <span className="text-sm font-medium text-green-600">
                  বিস্তারিত →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#f3f8f3] py-12">
          <div className="mx-auto max-w-6xl px-4 text-center text-gray-500">
            লোড হচ্ছে...
          </div>
        </main>
      }
    >
      <CategoryPageContent params={params} />
    </Suspense>
  );
}