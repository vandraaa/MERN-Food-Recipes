function SkeletonLoader({ className }: { className?: string }) {
    return <div className={`animate-pulse bg-gray-300 ${className}`}></div>;
  }
  
export default function ProfileSkeleton() {
    return (
      <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen p-4 md:p-8">
        <aside className="md:w-1/4 bg-white rounded-lg shadow-md p-4 mb-4 md:mb-0 md:mr-4">
          <div className="text-center">
            <SkeletonLoader className="w-24 h-24 rounded-full mx-auto mb-4" />
            <SkeletonLoader className="h-5 w-1/2 mx-auto mb-2" />
            <SkeletonLoader className="h-4 w-1/3 mx-auto" />
          </div>
          <nav className="mt-6 space-y-2">
            <SkeletonLoader className="h-10 w-full rounded-lg" />
            <SkeletonLoader className="h-10 w-full rounded-lg" />
            <SkeletonLoader className="h-10 w-full rounded-lg" />
          </nav>
        </aside>
  
        <section className="flex-1 bg-white rounded-lg shadow-md p-4">
          <div className="p-5 max-w-lg">
            <SkeletonLoader className="h-8 w-3/4 mb-6" />
            <SkeletonLoader className="h-10 w-full mb-4" />
            <SkeletonLoader className="h-10 w-full mb-4" />
          </div>
        </section>
      </div>
    );
  }
  