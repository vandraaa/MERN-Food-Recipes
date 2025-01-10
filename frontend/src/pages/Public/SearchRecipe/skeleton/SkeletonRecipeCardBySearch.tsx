export default function SkeletonRecipeCardBySearch() {
  return (
    <>
    {[...Array(5)].map((_, index) => (
      <div
        key={index}
        className="w-[10.5rem] h-[14rem] lg:w-[20rem] md:w-[12rem] sm:w-[14rem] lg:h-[25rem] md:h-[18rem] sm:h-[22rem] px-2.5 md:px-0 lg:px-3 lg:mb-0 mb-7 flex-shrink-0 flex flex-col"
      >
        <div className="w-full h-[12rem] bg-gray-200 rounded-lg animate-pulse"></div>

        <div className="flex flex-col flex-1 px-1.5 py-2.5 gap-3">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-3 w-2/3 bg-gray-200 rounded animate-pulse"></div>

          <div className="flex justify-between items-center text-[0.65rem] sm:text-sm text-gray-600">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="w-16 h-3 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="w-12 h-3 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
  );
}