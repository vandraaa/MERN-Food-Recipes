export default function RecipeDetailsSkeleton() {
    return (
      <>
        <div className="flex flex-col md:flex-row gap-x-8 w-full animate-pulse">
          <div className="w-full md:w-[45%]">
            <div className="w-full aspect-square bg-gray-300 rounded-2xl"></div>
          </div>
  
          <div className="w-full md:w-[55%] py-5 px-2.5 md:py-2 lg:px-4 lg:py-4">
            <div className="h-6 w-3/4 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 w-1/2 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 w-full md:w-3/4 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 w-5/6 bg-gray-300 rounded mb-4"></div>
  
            <div className="mt-6 flex flex-col gap-y-2">
              <div className="flex items-center gap-x-3">
                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
              </div>
              <div className="flex items-center gap-x-3">
                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
              </div>
            </div>
  
            <div className="mt-6">
              <div className="h-5 w-1/3 bg-gray-300 rounded mb-3"></div>
              <div className="space-y-2">
                <div className="h-4 w-4/5 bg-gray-300 rounded"></div>
                <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
              </div>
            </div>
  
            <div className="mt-6 flex gap-x-2.5 items-center">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div className="flex flex-col">
                <div className="h-3 w-1/4 bg-gray-300 rounded mb-1"></div>
                <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
  
        <div className="mt-0 hidden md:block lg:hidden px-3 animate-pulse">
          <div className="h-5 w-1/3 bg-gray-300 rounded mb-3"></div>
          <div className="space-y-2">
            <div className="h-4 w-4/5 bg-gray-300 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
          </div>
        </div>
      </>
    );
  }
  