export default function ProductDetailsLoading() {
  return (
    <main className="min-h-screen bg-[#f3f8f3] py-8">
      <div className="mx-auto max-w-6xl animate-pulse px-4 sm:px-6">
        {/* Breadcrumb skeleton */}
        <div className="mb-5 flex gap-2">
          <div className="h-4 w-12 rounded bg-gray-200" />
          <div className="h-4 w-3 rounded bg-gray-200" />
          <div className="h-4 w-24 rounded bg-gray-200" />
        </div>

        {/* Product details skeleton */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
            <div>
              <div className="flex items-start gap-4">
                <div className="h-20 w-20 shrink-0 rounded-2xl bg-green-100" />

                <div className="flex-1 space-y-3">
                  <div className="h-5 w-28 rounded-full bg-green-100" />
                  <div className="h-8 w-44 max-w-full rounded bg-gray-200" />
                  <div className="h-4 w-full max-w-md rounded bg-gray-100" />
                  <div className="h-4 w-3/4 max-w-sm rounded bg-gray-100" />
                </div>
              </div>

              {/* Price change */}
              <div className="mt-6 rounded-xl bg-gray-50 p-4">
                <div className="h-4 w-32 rounded bg-gray-200" />
                <div className="mt-3 h-6 w-40 rounded bg-gray-200" />
              </div>
            </div>

            {/* Today's price */}
            <div className="rounded-2xl bg-green-50 p-6">
              <div className="h-4 w-24 rounded bg-green-100" />
              <div className="mt-4 h-12 w-36 rounded bg-green-100" />
              <div className="mt-3 h-4 w-28 rounded bg-green-100" />
              <div className="mt-5 h-7 w-20 rounded-full bg-green-100" />
            </div>
          </div>
        </section>

        {/* Price summary cards */}
        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-gray-200 bg-white p-5"
            >
              <div className="h-4 w-24 rounded bg-gray-200" />
              <div className="mt-4 h-8 w-36 max-w-full rounded bg-gray-100" />
            </div>
          ))}
        </section>

        {/* Market price table */}
        <section className="mt-8">
          <div className="mb-4">
            <div className="h-7 w-48 rounded bg-gray-200" />
            <div className="mt-2 h-4 w-64 max-w-full rounded bg-gray-100" />
          </div>

          {/* Desktop table skeleton */}
          <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white md:block">
            <div className="grid grid-cols-4 gap-4 bg-gray-50 p-5">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="h-4 rounded bg-gray-200" />
              ))}
            </div>

            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="grid grid-cols-4 gap-4 border-t border-gray-100 p-5"
              >
                <div className="h-4 rounded bg-gray-100" />
                <div className="h-4 rounded bg-gray-100" />
                <div className="h-4 rounded bg-green-50" />
                <div className="h-4 rounded bg-red-50" />
              </div>
            ))}
          </div>

          {/* Mobile market cards */}
          <div className="space-y-3 md:hidden">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-gray-200 bg-white p-4"
              >
                <div className="h-5 w-32 rounded bg-gray-200" />
                <div className="mt-2 h-3 w-24 rounded bg-gray-100" />
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="h-16 rounded-lg bg-green-50" />
                  <div className="h-16 rounded-lg bg-red-50" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Back button skeleton */}
        <div className="mt-8 h-10 w-44 rounded-lg bg-gray-200" />
      </div>
    </main>
  );
}