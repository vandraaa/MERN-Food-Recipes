import { TrendingRecipeType } from "../../Home/lib/type";
import RecipeCardBySearch from "./RecipeCardBySearch";

interface ListSearchRecipeProps {
  data: TrendingRecipeType[];
}

export default function ListSearchRecipe({
  data,
}: ListSearchRecipeProps) {

  return (
    <div className="md:mt-12 mt-8 w-full max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-4 md:gap-x-8 md:gap-y-8 lg:gap-y-0">
      {data.map((recipe) => (
        <RecipeCardBySearch key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
