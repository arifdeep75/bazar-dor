export default function CategoryLoading() {
  return (
    <main className="min-h-screen animate-pulse bg-[#f3f8f3] py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Page heading skeleton */}
        <div className="mb-6">
          <div className="h-8 w-48 rounded-lg bg-gray-200" />
          <div className="mt-3 h-4 w-64 max-w-full rounded bg-gray-200" />
        </div>

        {/* Product cards skeleton */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 bg-white p-4"
            >
              <div className="mb-4 h-28 rounded-xl bg-gray-200 sm:h-36" />
              <div className="h-4 w-3/4 rounded bg-gray-200" />
              <div className="mt-3 h-4 w-1/2 rounded bg-gray-200" />
              <div className="mt-5 h-9 rounded-lg bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
