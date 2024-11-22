import TitleDashboardContent from "../../../../components/dashboard/TitleDashboardContent";
import DashboardLayout from "../../../../layout/Dashboard";

export default function SkeletonDetailRecipeDashboard() {
  return (
    <DashboardLayout>
      <TitleDashboardContent>Loading Recipe Details...</TitleDashboardContent>
      <div className="mx-2 sm:mx-6 flex flex-col lg:flex-row gap-6 animate-pulse">
        <div className="flex-shrink-0 bg-gray-200 w-full sm:w-[300px] lg:w-[600px] h-[400px] sm:h-[300px] lg:h-[600px] rounded-lg"></div>

        <div className="flex flex-col flex-1 space-y-4">
          <div className="bg-gray-200 h-6 sm:h-8 w-3/4 rounded"></div>
          <div className="bg-gray-200 h-4 sm:h-6 w-1/2 rounded"></div>

          <div className="bg-gray-200 h-4 sm:h-6 w-1/3 rounded mt-4"></div>
          <div className="bg-gray-200 h-4 sm:h-6 w-1/4 rounded"></div>

          <div className="bg-gray-200 h-4 sm:h-6 w-1/3 rounded mt-6"></div>
          <div className="bg-gray-200 h-4 sm:h-6 w-full rounded"></div>
          <div className="bg-gray-200 h-4 sm:h-6 w-4/5 rounded"></div>

          <div className="bg-gray-200 h-4 sm:h-6 w-1/3 rounded mt-6"></div>
          <div className="bg-gray-200 h-4 sm:h-6 w-full rounded"></div>
          <div className="bg-gray-200 h-4 sm:h-6 w-4/5 rounded"></div>

          <div className="bg-gray-200 h-4 sm:h-6 w-1/3 rounded mt-6"></div>
          <div className="flex items-center space-x-4 mt-2">
            <div className="bg-gray-200 w-12 h-12 rounded-full"></div>
            <div className="flex flex-col space-y-2">
              <div className="bg-gray-200 h-4 sm:h-6 w-1/2 rounded"></div>
              <div className="bg-gray-200 h-4 sm:h-6 w-1/3 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
