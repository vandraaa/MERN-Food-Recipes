export default function BreadcrumbSkeleton() {
    return (
      <nav className="text-sm text-gray-500 mb-4 md:mb-6 lg:mb-8 px-2.5 lg:px-4">
        <ul className="flex items-center space-x-2 lg:space-x-4 text-[9px] md:text-xs lg:text-xl">
          <li className="animate-pulse">
            <div className="bg-gray-300 h-3 w-10 rounded-md md:h-4 md:w-16 lg:h-6 lg:w-24"></div>
          </li>
          <li>/</li>
          <li className="animate-pulse">
            <div className="bg-gray-300 h-3 w-12 rounded-md md:h-4 md:w-20 lg:h-6 lg:w-28"></div>
          </li>
          <li>/</li>
          <li className="animate-pulse">
            <div className="bg-gray-300 h-3 w-14 rounded-md md:h-4 md:w-24 lg:h-6 lg:w-32"></div>
          </li>
          <li>/</li>
          <li className="animate-pulse">
            <div className="bg-gray-300 h-3 w-16 rounded-md md:h-4 md:w-28 lg:h-6 lg:w-40"></div>
          </li>
        </ul>
      </nav>
    );
  }
  