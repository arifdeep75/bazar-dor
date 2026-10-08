import type { Product } from "../types/product";
import ProductCard from "./ProductCard";

export default function ProductSections({
  products,
}: {
  products: Product[];
}) {
  // Top 6 products whose prices increased
  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  // Top 6 products whose prices decreased
  const fallers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <section className="bg-[#f3f8f3] py-8 sm:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* ================= RISING PRODUCTS ================= */}
        <section>
          <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <span className="text-red-500">▲</span>
            আজ দাম বেড়েছে
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {risers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </section>

        {/* ================= FALLING PRODUCTS ================= */}
        <section className="mt-12">
          <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <span className="text-green-600">▼</span>
            আজ দাম কমেছে
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fallers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </section>

        {/* ================= ALL PRODUCTS ================= */}
        <section
          id="সব-পণ্য"
          className="mt-12 scroll-mt-6"
        >
          <h2 className="text-xl font-bold text-gray-900">
            সব পণ্য
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            বাজারে আজকের সব পণ্যের দাম দেখুন
          </p>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </section>

      </div>
    </section>
  );
}