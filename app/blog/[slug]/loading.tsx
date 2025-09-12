export default function Loading() {
  return (
    <div className="bg-foundation-color min-h-screen animate-pulse">
      <div className="container mx-auto pt-24">
        {/* Breadcrumb skeleton */}
        <div className="mb-6 flex items-center space-x-1">
          <div className="h-4 w-20 rounded bg-gray-700"></div>
          <span className="text-gray-600">›</span>
          <div className="h-4 w-32 rounded bg-gray-700"></div>
        </div>

        {/* Featured image skeleton */}
        <div className="mb-5 h-64 w-full rounded-lg bg-gray-800 md:h-96 lg:mb-10"></div>

        {/* Main content area with flexbox layout */}
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
          {/* Left column - Header and Content */}
          <div className="flex-1">
            {/* Header skeleton */}
            <header className="mb-8">
              <div className="mb-6 h-8 w-3/4 rounded bg-gray-700 lg:h-12"></div>
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-2">
                  <div className="h-4 w-24 rounded bg-gray-700"></div>
                  <div className="h-4 w-32 rounded bg-gray-700"></div>
                </div>
                <div className="h-12 w-32 rounded-full bg-gray-700"></div>
              </div>
            </header>

            {/* Main content skeleton */}
            <div className="mb-8 space-y-4">
              <div className="h-4 w-full rounded bg-gray-700"></div>
              <div className="h-4 w-5/6 rounded bg-gray-700"></div>
              <div className="h-4 w-4/5 rounded bg-gray-700"></div>
              <div className="h-4 w-full rounded bg-gray-700"></div>
              <div className="h-4 w-3/4 rounded bg-gray-700"></div>
            </div>
          </div>

          {/* Right column - Sidebar skeleton */}
          <div className="lg:w-80 lg:flex-shrink-0">
            <div className="h-64 w-full rounded-lg bg-gray-800"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
