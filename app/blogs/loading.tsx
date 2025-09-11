export default function Loading() {
  return (
    <div className="bg-foundation-color min-h-screen animate-pulse py-20">
      <div className="container mx-auto px-4">
        {/* Header skeleton */}
        <div className="mb-20 text-center">
          <div className="mx-auto mb-6 h-12 w-64 rounded bg-gray-700"></div>
          <div className="mx-auto max-w-2xl space-y-4">
            <div className="h-4 w-full rounded bg-gray-700"></div>
            <div className="mx-auto h-4 w-5/6 rounded bg-gray-700"></div>
          </div>
        </div>

        {/* Blog posts grid skeleton */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-4">
              <div className="h-48 w-full rounded-lg bg-gray-800"></div>
              <div className="space-y-2">
                <div className="h-6 w-3/4 rounded bg-gray-700"></div>
                <div className="h-4 w-full rounded bg-gray-700"></div>
                <div className="h-4 w-5/6 rounded bg-gray-700"></div>
                <div className="h-4 w-1/2 rounded bg-gray-700"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
