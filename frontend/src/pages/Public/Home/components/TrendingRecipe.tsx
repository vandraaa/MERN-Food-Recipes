import { useEffect, useRef, useState } from "react";
import Container from "../../../../components/container/Container";
import { getTrendingRecipe } from "../lib/data";
import TrendingRecipeSkeleton from "../skeleton/TrendingRecipeSkeleton";
import RecipeCard from "../../../../components/home/RecipeCard";
import ChevronButton from "../../../../components/button/ChevronButton";
import { TrendingRecipeType } from "../lib/type";
import { FiRotateCcw } from "react-icons/fi";

export default function TrendingRecipe() {
  const [recipes, setRecipes] = useState<TrendingRecipeType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await getTrendingRecipe();
      setRecipes(res.data);
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.children[0].getBoundingClientRect().width;
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleScrollPosition = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const scrollWidth = scrollRef.current.scrollWidth;
      const clientWidth = scrollRef.current.clientWidth;

      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    handleScrollPosition();
    window.addEventListener("resize", handleScrollPosition);

    return () => {
      window.removeEventListener("resize", handleScrollPosition);
    };
  }, [recipes]);

  return (
    <div className="bg-white py-4 sm:py-6 relative">
      <Container>
        <h1 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-4 sm:mb-6">
          Trending Recipes
        </h1>
        <div className="relative">
          <ChevronButton direction={"left"} onClick={() => handleScroll("left")} isVisible={canScrollLeft && !isLoading} />

          <div
            ref={scrollRef}
            className="flex gap-x-0 md:gap-x-3 overflow-x-auto my-5 scrollbar-hide"
            onScroll={handleScrollPosition}
          >
            {isLoading ? (
              <TrendingRecipeSkeleton />
            ) : recipes.length > 0 ? (
              recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
            ) : (
              <div className="flex flex-col justify-center items-center mx-auto my-8">
                <p className="text-base font-medium">Recipes not available.</p>
                <button
                  className="flex items-center justify-center gap-2 px-4 py-2 mt-2.5 lg:mt-4 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                  onClick={fetchData}
                >
                  <FiRotateCcw className="size-4" />
                  Try Again
                </button>
              </div>
            )}
          </div>

          <ChevronButton direction={"right"} onClick={() => handleScroll("right")} isVisible={canScrollRight && !isLoading && !recipes} />
        </div>
      </Container>
    </div>
  );
}
