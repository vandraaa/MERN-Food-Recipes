export default function RecipeStepsSkeleton() {
    return (
      <div className="mt-8 px-2.5 lg:px-4">
        <h2 className="text-3xl md:text-2xl lg:text-4xl font-semibold text-gray-800 mb-6">Method</h2>
        <div className="space-y-6 w-full md:w-[85%] lg:w-[70%]">
          {[...Array(4)].map((_, index) => (
            <div key={index}>
              <div className="flex items-start gap-y-1.5 space-x-4">
                <div className="w-24 h-5 bg-gray-300 rounded-lg animate-pulse"></div>
              </div>
              <div className="mt-2 w-[90%] h-4 bg-gray-300 rounded-lg animate-pulse"></div>
              <div className="mt-2 w-[70%] h-4 bg-gray-300 rounded-lg animate-pulse"></div>
              {index < 3 && (
                <div className="border-b border-gray-300 mt-4 border-[0.1rem]"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
  