import { useEffect, useRef, useState } from "react";
import Container from "../../../../components/container/Container";
import { TrendingRecipeType, getTrendingRecipe } from "../lib/data";
import TrendingRecipeSkeleton from "../skeleton/TrendingRecipeSkeleton";
import TrendingRecipeCard from "../../../../components/home/TrendingRecipeCard";
import ChevronButton from "../../../../components/button/ChevronButton";

export default function TrendingRecipe() {
  const [recipes, setRecipes] = useState<TrendingRecipeType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  useEffect(() => {
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
            className="flex gap-x-3 overflow-x-auto my-5 scrollbar-hide"
            onScroll={handleScrollPosition}
          >
            {isLoading ? (
              <TrendingRecipeSkeleton />
            ) : (
              recipes.map((recipe) => <TrendingRecipeCard recipe={recipe} />)
            )}
          </div>

          <ChevronButton direction={"right"} onClick={() => handleScroll("right")} isVisible={canScrollRight && !isLoading} />
        </div>
      </Container>
    </div>
  );
}
