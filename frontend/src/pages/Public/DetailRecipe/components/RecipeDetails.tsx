import { IoPerson, IoTime } from "react-icons/io5";
import { RecipeDetailType } from "../../../Dashboard/DetailRecipeContent/lib/type";
import { useState } from "react";

interface RecipeDetailsProps {
  data: RecipeDetailType;
}

export default function RecipeDetails({ data }: RecipeDetailsProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <div className="mb-8 lg:mb-12">
      <div className="flex flex-col md:flex-row gap-x-8 w-full">
        <div className="w-full md:w-[45%]">
          {isImageLoading && (
            <div className="w-full aspect-square bg-gray-300 rounded-2xl animate-pulse"></div>
          )}
          <img
            src={data?.image.imageUrl}
            alt={data?.title}
            className={`w-full h-auto object-cover shadow-2xl rounded-2xl transition-opacity duration-300 ${
              !isImageLoading ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setIsImageLoading(false)}
          />
        </div>

        <div className="w-full md:w-[55%] py-5 px-2.5 md:py-2 lg:px-4 lg:py-4">
          <h1 className="text-xl md:text-lg lg:text-2xl font-semibold text-gray-800">
            {data?.title}
          </h1>
          <p className="text-gray-500 text-sm lg:text-base font-semibold">
            {data?.category.name}
          </p>
          <p className="text-gray-600 text-sm md:text-xs lg:text-sm leading-relaxed w-[90%] lg:w-2/3">
            {data?.description} This recipe serves {data?.servings}, takes just{" "}
            {data?.cooking_time} minutes to cook, and uses only{" "}
            {data?.ingredients.length} ingredients and {data?.steps.length} easy
            steps
          </p>

          <div className="mt-6 flex flex-col gap-y-2 text-sm md:text-xs lg:text-base">
            <div className="flex items-center gap-x-3">
              <IoPerson />
              <p className="text-gray-700 font-medium">
                {data?.servings} Servings
              </p>
            </div>
            <div className="flex items-center gap-x-3">
              <IoTime />
              <p className="text-gray-700 font-medium">
                {data?.cooking_time} Minutes
              </p>
            </div>
          </div>

          <div className="mt-6 gap-x-2.5 lg:gap-x-3 items-center hidden md:flex lg:hidden">
            <img
              src={data?.user.image.imageUrl}
              alt={data?.user.name}
              className="size-8 lg:size-14 rounded-full"
            />
            <div className="flex flex-col">
              <p className="text-gray-700 font-medium text-[8.5px] md:text-[7.5px] lg:text-[10px]">
                Author
              </p>
              <p className="text-gray-700 font-semibold text-xs md:text-[10px] lg:text-base">
                {data?.user.name}
              </p>
            </div>
          </div>

          <div className="mt-6 md:hidden lg:block">
            <h2 className="text-base lg:text-lg font-semibold text-gray-800">
              Ingredients
            </h2>
            <ul className="mt-2 text-gray-700 font-medium text-xs lg:text-sm leading-relaxed">
              {data?.ingredients.map((item) => (
                <li key={item._id}>
                  {item.name}{" "}
                  <span className="text-gray-500 font-semibold">( {item.quantity} )</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex gap-x-2.5 lg:gap-x-3 items-center md:hidden lg:flex">
            <img
              src={data?.user.image.imageUrl}
              alt={data?.user.name}
              className="size-10 lg:size-14 rounded-full"
            />
            <div className="flex flex-col">
              <p className="text-gray-700 font-medium text-[8.5px] lg:text-[10px]">
                Author
              </p>
              <p className="text-gray-700 font-semibold text-xs lg:text-base">
                {data?.user.name}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 hidden md:block lg:hidden px-3">
        <h2 className="text-base lg:text-lg font-semibold text-gray-800">
          Ingredients
        </h2>
        <ul className="mt-2 text-gray-700 font-medium text-xs lg:text-sm leading-relaxed">
          {data?.ingredients.map((item) => (
            <li key={item._id}>
              {item.name}{" "}
              <span className="text-gray-500 font-semibold">( {item.quantity} )</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
