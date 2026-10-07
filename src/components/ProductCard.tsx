import Link from "next/link";
import type { Product } from "../types/product";

function toBengaliNumber(value: number | string) {
  const bengaliDigits = "০১২৩৪৫৬৭৮৯";

  return String(value).replace(
    /\d/g,
    (digit) => bengaliDigits[Number(digit)]
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const { dir, pct } = product.change;

  const isUp = dir === "up";
  const isDown = dir === "down";
  const isFlat = dir === "flat";

  return (
    <Link href={`/product/${product.slug}`}>
      <article className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-4 transition hover:-translate-y-1 hover:shadow-md">
        
        {/* Product Info */}
        <div className="flex items-start gap-3">
          
          {/* Image / Emoji */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-2xl">
            {product.image || product.categoryIcon}
          </div>

          {/* Name + Unit */}
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-gray-900 group-hover:text-green-600">
              {product.nameBn}
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              {product.unit}
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="mt-6 flex items-end justify-between">
          <div>
            <p className="text-xs text-gray-500">
              আজকের দাম
            </p>

            <p className="mt-1 text-lg font-bold text-gray-900">
              {toBengaliNumber(product.today)} টাকা
            </p>
          </div>

          {/* Change Badge */}
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
              isUp
                ? "bg-red-50 text-red-500"
                : isDown
                ? "bg-green-50 text-green-600"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {isUp && "▲ "}
            {isDown && "▼ "}
            {isFlat && "— "}

            {toBengaliNumber(pct)}%
          </span>
        </div>
      </article>
    </Link>
  );
}