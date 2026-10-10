import { connection } from "next/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { getProductsByCategory } from "../../../lib/api";
function toBengaliNumber(value: number | string) {
  const bengaliDigits = "০১২৩৪৫৬৭৮৯";
  return String(value).replace(/\d/g, (digit) => bengaliDigits[Number(digit)]);
}
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
function formatPrice(value: number) {
  return `${toBengaliNumber(value)} টাকা`;
}
type SortOption = "default" | "low-high" | "high-low";
async function CategoryPageContent({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
}) {
  await connection();
  const { slug } = await params;
  const { sort } = await searchParams;
  const categoryProducts = await getProductsByCategory(slug);
  if (categoryProducts.length === 0) {
  notFound();
}
  const sortOption: SortOption =
    sort === "low-high" || sort === "high-low" ? sort : "default";
  const sortedProducts = [...categoryProducts];
  if (sortOption === "low-high") {
    sortedProducts.sort((a, b) => a.today - b.today);
  } else if (sortOption === "high-low") {
    sortedProducts.sort((a, b) => b.today - a.today);
  }
  const categoryName = categoryProducts[0]?.categoryNameBn;
  const categoryIcon = categoryProducts[0]?.categoryIcon;
  
  if (categoryProducts.length === 0) {
    return (
      <main className="min-h-[65vh] bg-[#f0f5f0] px-4 py-12">
        {" "}
        <div className="mx-auto max-w-6xl rounded-xl border border-[#e2eae2] bg-[#fbfdfb] px-5 py-16 text-center">
          {" "}
          <div className="text-4xl">🛒</div>{" "}
          <h1 className="mt-4 text-xl font-bold text-[#24352a]">
            {" "}
            কোনো পণ্য পাওয়া যায়নি{" "}
          </h1>{" "}
          <p className="mt-2 text-sm text-gray-500">
            {" "}
            এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।{" "}
          </p>{" "}
          <Link
            href="/"
            className="mt-5 inline-flex rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
          >
            {" "}
            হোমে ফিরে যান{" "}
          </Link>{" "}
        </div>{" "}
      </main>
    );
  }
  return (
    <main className="flex min-h-[65vh] flex-col bg-[#f0f5f0]">
      {" "}
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-7">
        {" "}
        {/* Category heading */}{" "}
        <section className="flex min-h-19 items-center gap-3 rounded-2xl border border-[#e1e9e1] bg-[#fbfdfb] px-4 py-4 sm:px-5">
          {" "}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f5ef] text-2xl">
            {" "}
            {categoryIcon || "🛒"}{" "}
          </div>{" "}
          <div>
            {" "}
            <h1 className="text-xl font-bold text-[#26372b] sm:text-2xl">
              {" "}
              {categoryName || slug}{" "}
            </h1>{" "}
            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              {" "}
              {toBengaliNumber(categoryProducts.length)}টি পণ্যের আজকের দাম ও
              পরিবর্তন{" "}
            </p>{" "}
          </div>{" "}
        </section>{" "}
        {/* Sorting bar */}{" "}
        <section className="mt-5 flex min-h-13 items-center justify-between rounded-xl border border-[#e1e9e1] bg-[#fbfdfb] px-4 py-2.5 sm:px-5">
          {" "}
          <p className="hidden text-sm text-gray-500 sm:block">
            {" "}
            পণ্যের দাম তুলনা করুন{" "}
          </p>{" "}
          <form method="GET" className="ml-auto flex items-center gap-2">
            {" "}
            <label
              htmlFor="sort"
              className="text-xs font-medium text-gray-500 sm:text-sm"
            >
              {" "}
              সাজান{" "}
            </label>{" "}
            <select
              id="sort"
              name="sort"
              defaultValue={sortOption}
              className="max-w-47 cursor-pointer rounded-lg border border-[#d9e1d9] bg-white px-3 py-2 text-xs text-gray-700 outline-none transition focus:border-green-600 sm:text-sm"
            >
              {" "}
              <option value="default">ডিফল্ট</option>{" "}
              <option value="low-high">দাম: কম থেকে বেশি</option>{" "}
              <option value="high-low">দাম: বেশি থেকে কম</option>{" "}
            </select>{" "}
            <button
              type="submit"
              className="rounded-lg bg-green-700 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-800 sm:text-sm"
            >
              {" "}
              সাজান{" "}
            </button>{" "}
          </form>{" "}
        </section>{" "}
        {/* Product count */}{" "}
        <p className="mb-3 mt-4 text-xs text-gray-500 sm:text-sm">
          {" "}
          মোট {toBengaliNumber(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে{" "}
        </p>{" "}
        {/* Product cards */}{" "}
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {" "}
          {sortedProducts.map((product) => {
            const direction = product.change.dir;
            const changeStyle =
              direction === "up"
                ? "bg-[#fff0ef] text-red-500"
                : direction === "down"
                  ? "bg-[#edf7ee] text-green-700"
                  : "bg-[#f0f3f0] text-gray-600";
            return (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group rounded-2xl border border-[#e0e8e0] bg-[#fbfdfb] p-3.5 transition duration-200 hover:-translate-y-0.5 hover:border-green-200 hover:shadow-md sm:p-4"
              >
                {" "}
                {/* Product icon and price change */}{" "}
                <div className="flex items-start justify-between gap-3">
                  {" "}
                  <div className="flex min-w-0 items-center gap-2.5">
                    {" "}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f0f5ef] text-2xl">
                      {" "}
                      {product.categoryIcon || product.image || "🛒"}{" "}
                    </div>{" "}
                    <div className="min-w-0">
                      {" "}
                      <h2 className="truncate text-sm font-bold text-[#29382c] group-hover:text-green-800 sm:text-base">
                        {" "}
                        {product.nameBn}{" "}
                      </h2>{" "}
                      <p className="mt-0.5 text-xs text-gray-500">
                        {" "}
                        {formatUnit(product.unit)}{" "}
                      </p>{" "}
                    </div>{" "}
                  </div>{" "}
                  <span
                    className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold sm:text-xs ${changeStyle}`}
                  >
                    {" "}
                    {direction === "up"
                      ? "▲ "
                      : direction === "down"
                        ? "▼ "
                        : "— "}{" "}
                    {toBengaliNumber(product.change.pct)}%{" "}
                  </span>{" "}
                </div>{" "}
                {/* Today's price */}{" "}
                <div className="mt-3 border-t border-[#edf1ed] pt-3">
                  {" "}
                  <p className="text-[11px] text-gray-500 sm:text-xs">
                    {" "}
                    আজকের দাম{" "}
                  </p>{" "}
                  <div className="mt-0.5 flex items-end justify-between gap-2">
                    {" "}
                    <p className="text-lg font-bold text-[#27382b] sm:text-xl">
                      {" "}
                      {formatPrice(product.today)}{" "}
                    </p>{" "}
                    <span className="pb-0.5 text-xs font-medium text-green-700 transition group-hover:text-green-900">
                      {" "}
                      বিস্তারিত →{" "}
                    </span>{" "}
                  </div>{" "}
                </div>{" "}
              </Link>
            );
          })}{" "}
        </section>{" "}
      </div>{" "}
    </main>
  );
}
export default function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
}) {
  return (
    <Suspense
      fallback={
        <main className="min-h-[65vh] bg-[#f0f5f0] px-4 py-12">
          {" "}
          <div className="mx-auto max-w-6xl animate-pulse">
            {" "}
            <div className="h-20 rounded-2xl border border-[#e1e9e1] bg-[#fbfdfb]" />{" "}
            <div className="mt-5 h-14 rounded-xl bg-[#fbfdfb]" />{" "}
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {" "}
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-28 rounded-2xl border border-[#e1e9e1] bg-[#fbfdfb]"
                />
              ))}{" "}
            </div>{" "}
          </div>{" "}
        </main>
      }
    >
      {" "}
      <CategoryPageContent params={params} searchParams={searchParams} />{" "}
    </Suspense>
  );
}
