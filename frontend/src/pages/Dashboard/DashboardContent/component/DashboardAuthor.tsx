import { useEffect, useState } from "react";
import { statisticAuthorDashboard } from "./lib/data";

interface statisticAuthorType {
  total_recipes: number;
  total_pending_recipes: number;
  total_approve_recipes: number;
}

export default function DashboardAuthor() {
  const [isLoading, setIsLoading] = useState(false);
  const [statisticData, setStatisticData] = useState<statisticAuthorType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await statisticAuthorDashboard();
        setStatisticData(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const SkeletonLoader = () => (
    <div className="animate-pulse flex flex-col items-start mt-2">
      <div className="w-1/3 h-8 bg-gray-300 rounded mb-4"></div>
      <div className="w-3/4 h-3 bg-gray-300 rounded"></div>
    </div>
  );

  return (
    <>
      <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
        <div className="bg-slate-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
          <h2 className="sm:text-lg text-base font-semibold text-gray-700">My Recipes</h2>
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <>
              <p className="sm:text-2xl text-xl font-bold text-blue-600 sm:mt-4 mt-2">
                {statisticData?.total_recipes}
              </p>
              <p className="sm:text-sm text-xs text-gray-500 mt-2">Recipes you have submitted</p>
            </>
          )}
        </div>
      </div>

      <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
        <div className="bg-slate-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
          <h2 className="sm:text-lg text-base font-semibold text-gray-700">Pending Recipes</h2>
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <>
              <p className="sm:text-2xl text-xl font-bold text-yellow-600 sm:mt-4 mt-2">
                {statisticData?.total_pending_recipes}
              </p>
              <p className="sm:text-sm text-xs text-gray-500 mt-2">Recipes waiting for approval</p>
            </>
          )}
        </div>
      </div>

      <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
        <div className="bg-slate-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
          <h2 className="sm:text-lg text-base font-semibold text-gray-700">Approved Recipes</h2>
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <>
              <p className="sm:text-2xl text-xl font-bold text-green-600 sm:mt-4 mt-2">
                {statisticData?.total_approve_recipes}
              </p>
              <p className="sm:text-sm text-xs text-gray-500 mt-2">Recipes successfully published</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
