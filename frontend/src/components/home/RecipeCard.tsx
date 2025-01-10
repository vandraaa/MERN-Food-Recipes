import { MdOutlineRestaurantMenu } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

type RecipeCardProps = {
  recipe: {
    id: string;
    title: string;
    category: { name: string };
    servings: number;
    cooking_time: number;
    image: { imageUrl: string };
    user: { name: string; image: { imageUrl: string } };
  };
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="w-[12rem] h-[18rem] lg:w-[20rem] md:w-[16rem] sm:w-[16rem] lg:h-[25rem] md:h-[23rem] sm:h-[22rem] px-3 flex-shrink-0 flex flex-col">
      <Link to={`/detail-recipe/${recipe.id}`} className="w-full h-[12rem] relative">
        {!isImageLoaded && (
          <div className="absolute top-0 left-0 w-full h-full bg-gray-200 rounded-lg animate-pulse"></div>
        )}
        <img
          src={recipe.image.imageUrl}
          alt={recipe.title}
          className={`w-full h-full object-cover rounded-lg aspect-square transition-opacity duration-300 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsImageLoaded(true)}
        />
      </Link>

      <div className="flex flex-col flex-1 px-1.5 py-2.5 gap-3">
        <Link to={`/detail-recipe/${recipe.id}`}>
          <h2 className="text-xs sm:text-base lg:text-lg font-semibold">{recipe.title}</h2>
          <p className="text-[0.60rem] sm:text-xs lg:text-sm text-gray-500">{recipe.category.name}</p>
        </Link>
        <div className="flex justify-between items-center text-[0.65rem] sm:text-sm text-gray-600">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <MdOutlineRestaurantMenu className="text-gray-700" />
              <span>{recipe.servings} servings</span>
            </div>
            <div className="flex items-center gap-1">
              <FaClock className="text-gray-700" />
              <span>{recipe.cooking_time} m</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-auto">
          <img
            src={recipe.user.image.imageUrl || "/default-profile.jpg"}
            alt={recipe.user.name}
            className="size-6 sm:size-8 lg:size-10 rounded-full object-cover"
          />
          <p className="text-[0.5rem] sm:text-sm font-medium text-gray-700">{recipe.user.name}</p>
        </div>
      </div>
    </div>
  );
}
