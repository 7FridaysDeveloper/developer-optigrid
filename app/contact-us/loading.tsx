export default function Loading() {
  return (
    <div className="bg-foundation-color min-h-screen animate-pulse py-20">
      <div className="container mx-auto px-4">
        {/* Hero section skeleton */}
        <div className="mb-20 text-center">
          <div className="mx-auto mb-6 h-12 w-64 rounded bg-gray-700"></div>
          <div className="mx-auto max-w-2xl space-y-4">
            <div className="h-4 w-full rounded bg-gray-700"></div>
            <div className="mx-auto h-4 w-5/6 rounded bg-gray-700"></div>
          </div>
        </div>

        {/* Contact form skeleton */}
        <div className="mx-auto max-w-2xl">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <div className="h-4 w-16 rounded bg-gray-700"></div>
                <div className="h-12 w-full rounded bg-gray-800"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-20 rounded bg-gray-700"></div>
                <div className="h-12 w-full rounded bg-gray-800"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-24 rounded bg-gray-700"></div>
              <div className="h-12 w-full rounded bg-gray-800"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-32 rounded bg-gray-700"></div>
              <div className="h-32 w-full rounded bg-gray-800"></div>
            </div>
            <div className="h-12 w-32 rounded bg-gray-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
