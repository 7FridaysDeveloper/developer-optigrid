import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="bg-foundation-color min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Hero section skeleton */}
        <div className="mb-20 text-center">
          <Skeleton className="mx-auto mb-6 h-12 w-64" />
          <div className="mx-auto max-w-2xl space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="mx-auto h-4 w-5/6" />
            <Skeleton className="mx-auto h-4 w-4/5" />
          </div>
        </div>

        {/* Content sections skeleton */}
        <div className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <Skeleton className="h-96 w-full rounded-lg" />
          <div className="space-y-6">
            <Skeleton className="h-8 w-48" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        </div>

        {/* Team section skeleton */}
        <div className="mb-20">
          <Skeleton className="mx-auto mb-12 h-8 w-48" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-4 text-center">
                <Skeleton className="mx-auto h-48 w-48 rounded-full" />
                <Skeleton className="mx-auto h-6 w-32" />
                <Skeleton className="mx-auto h-4 w-24" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
