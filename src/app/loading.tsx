export default function HomeLoading() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f3f8f3]">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Hero Skeleton */}
        <section className="relative overflow-hidden rounded-3xl border border-green-100 bg-linear-to-br from-green-100 via-emerald-50 to-lime-50 p-6 sm:p-10 lg:p-14">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <div className="skeleton h-7 w-36 rounded-full" />

              <div className="space-y-3">
                <div className="skeleton h-9 w-full max-w-md rounded-xl sm:h-12" />
                <div className="skeleton h-9 w-4/5 max-w-sm rounded-xl sm:h-12" />
              </div>

              <div className="space-y-2 pt-1">
                <div className="skeleton h-4 w-full max-w-lg rounded-md" />
                <div className="skeleton h-4 w-4/5 max-w-md rounded-md" />
              </div>

              <div className="skeleton mt-3 h-12 w-40 rounded-xl" />
            </div>

            <div className="hidden justify-center md:flex">
              <div className="skeleton flex h-56 w-56 items-center justify-center rounded-full lg:h-64 lg:w-64">
                <div className="h-40 w-40 rounded-full border-8 border-white/40 bg-white/30 lg:h-48 lg:w-48" />
              </div>
            </div>
          </div>
        </section>

        {/* Search Skeleton */}
        <div className="mx-auto max-w-3xl px-2 pt-7">
          <div className="flex h-14 items-center gap-3 rounded-2xl border border-gray-200/80 bg-white px-4 shadow-sm">
            <div className="skeleton h-5 w-5 rounded-full" />
            <div className="skeleton h-4 flex-1 rounded-md" />
            <div className="skeleton h-9 w-16 rounded-xl" />
          </div>
        </div>

        {/* Categories Skeleton */}
        <section className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <div className="skeleton h-7 w-44 rounded-lg" />
            <div className="skeleton h-4 w-20 rounded-md" />
          </div>

          <div className="flex gap-3 overflow-hidden pb-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex min-w-24 flex-col items-center rounded-2xl border border-green-100/80 bg-white p-4 shadow-sm sm:min-w-28"
              >
                <div className="skeleton h-12 w-12 rounded-full" />
                <div className="skeleton mt-3 h-3 w-16 rounded-md" />
              </div>
            ))}
          </div>
        </section>

        {/* Product Sections Skeleton */}
        {[1, 2].map((section) => (
          <section key={section} className="mt-10">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="skeleton h-7 w-44 rounded-lg" />
                <div className="skeleton h-3 w-56 max-w-full rounded-md" />
              </div>

              <div className="skeleton h-9 w-24 rounded-xl" />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-green-100/80 bg-white p-3 shadow-sm sm:p-4"
                >
                  {/* Product Image */}
                  <div className="skeleton h-28 rounded-xl sm:h-40" />

                  {/* Category */}
                  <div className="skeleton mt-4 h-3 w-16 rounded-md" />

                  {/* Product Name */}
                  <div className="skeleton mt-3 h-4 w-4/5 rounded-md" />
                  <div className="skeleton mt-2 h-4 w-1/2 rounded-md" />

                  {/* Price */}
                  <div className="skeleton mt-4 h-6 w-2/3 rounded-md" />

                  {/* Button */}
                  <div className="skeleton mt-4 h-10 rounded-xl" />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}