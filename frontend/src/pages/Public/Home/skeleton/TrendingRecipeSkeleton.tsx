export default function TrendingRecipeSkeleton() {
  return Array(4)
    .fill(0)
    .map((_, index) => (
      <div
        key={index}
        className="w-[14rem] h-[18rem] lg:w-[20rem] md:w-[16rem] sm:w-[16rem] lg:h-[25rem] md:h-[23rem] sm:h-[22rem] px-3 mb-6 flex-shrink-0 flex flex-col animate-pulse"
      >
        <div className="w-full h-[12rem] bg-gray-200 rounded-lg" />

        <div className="flex flex-col flex-1 px-1.5 py-2.5 gap-3">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2 mt-1" />

          <div className="mt-4 w-full">
            <div className="h-3 bg-gray-200 rounded w-1/4" />
            <div className="h-3 bg-gray-200 rounded w-1/3 mt-2" />
          </div>

          <div className="flex items-center gap-2 mt-auto">
            <div className="w-10 h-10 rounded-full bg-gray-200" />
            <div className="h-3 bg-gray-200 rounded w-1/3" />
          </div>
        </div>
      </div>
    ));
}
