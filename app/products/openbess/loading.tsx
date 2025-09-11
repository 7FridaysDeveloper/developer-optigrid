export default function Loading() {
  return (
    <div className="bg-foundation-color min-h-screen animate-pulse py-20">
      {/* Hero section skeleton */}
      <div className="container mx-auto px-4">
        <div className="mb-20 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="h-12 w-48 rounded bg-gray-700"></div>
            <div className="space-y-4">
              <div className="h-4 w-full rounded bg-gray-700"></div>
              <div className="h-4 w-5/6 rounded bg-gray-700"></div>
              <div className="h-4 w-4/5 rounded bg-gray-700"></div>
            </div>
            <div className="h-12 w-32 rounded bg-gray-700"></div>
          </div>
          <div className="h-80 w-full rounded-lg bg-gray-800"></div>
        </div>

        {/* Features section skeleton */}
        <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-4">
              <div className="h-8 w-32 rounded bg-gray-700"></div>
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-gray-700"></div>
                <div className="h-4 w-3/4 rounded bg-gray-700"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Content section skeleton */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="h-96 w-full rounded-lg bg-gray-800"></div>
          <div className="space-y-6">
            <div className="h-8 w-48 rounded bg-gray-700"></div>
            <div className="space-y-4">
              <div className="h-4 w-full rounded bg-gray-700"></div>
              <div className="h-4 w-5/6 rounded bg-gray-700"></div>
              <div className="h-4 w-4/5 rounded bg-gray-700"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
