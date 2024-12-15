export const RecipeCommentSkeleton = () => {
  return (
    <div className="mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg md:text-2xl font-semibold text-gray-800">
          Comments
        </h2>
      </div>

      <div className="space-y-4 mt-8">
        {[...Array(3)].map((_, index) => (
          <div className="p-4 border border-gray-300 rounded-lg shadow-md flex items-start gap-4 animate-pulse" key={index}>
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="space-y-3">
                  <div className="h-4 w-32 bg-gray-300 rounded"></div>
                  <div className="flex gap-x-2">
                    <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
                    <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
                    <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
                    <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
                    <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <div className="h-4 w-4/5 bg-gray-300 rounded"></div>
                <div className="h-4 w-3/4 mt-2 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
