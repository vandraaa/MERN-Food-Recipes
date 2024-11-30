import { Link } from "react-router-dom";

interface BreadcrumbProps {
  category: { name: string; _id: string };
  recipeTitle: string;
}

export default function Breadcrumb({ category, recipeTitle }: BreadcrumbProps) {
  return (
    <nav className="text-sm text-gray-500 mb-4 md:mb-6 lg:mb-8 px-2.5 lg:px-4">
      <ul className="flex items-center space-x-2 lg:space-x-4 text-[9px] md:text-xs lg:text-xl">
        <li>
          <Link to="/" className="hover:text-gray-800 duration-300 ease-linear font-medium">Home</Link>
        </li>
        <li>/</li>
        <li>
          <Link to="/search" className="hover:text-gray-800 duration-300 ease-linear font-medium">Search</Link>
        </li>
        <li>/</li>
        <li>
          <Link to={`/search?category=${category._id}`} className="hover:text-gray-800 duration-300 ease-linear font-medium">
            {category.name}
          </Link>
        </li>
        <li>/</li>
        <li className="text-gray-800 font-semibold">
          {recipeTitle}
        </li>
      </ul>
    </nav>
  );
}
