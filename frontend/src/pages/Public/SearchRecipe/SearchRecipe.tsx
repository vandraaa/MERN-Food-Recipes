import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../../../layout/Footer";
import Navbar from "../../../layout/Navbar";
import Container from "../../../components/container/Container";
import InputSearchRecipe from "./component/InputSearchRecipe";
import CategoryButtons from "./component/CategoryButton";
import { TrendingRecipeType } from "../Home/lib/type";
import { searchRecipe } from "./lib/data";
import ListSearchRecipe from "./component/ListSearchRecipe";
import SkeletonRecipeCardBySearch from "./skeleton/SkeletonRecipeCardBySearch";
import { FiAlertCircle, FiRotateCcw } from "react-icons/fi";

export default function SearchRecipe() {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [data, setData] = useState<TrendingRecipeType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category") || "all";
    const search = params.get("query") || "";
    setSelectedCategory(category);
    setSearchTerm(search);
  }, [location]);

  const handleCategoryClick = (id: string) => {
    setSelectedCategory(id);
    navigate(`?query=${searchTerm}&category=${id}`);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      navigate(`?query=${searchTerm}&category=${selectedCategory}`);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, selectedCategory, navigate]);

  const fetchData = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const res = await searchRecipe(debouncedSearchTerm, selectedCategory);
      if (res.status === "success") {
        setData(res.data);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
      setErrorMessage("Failed to load recipes. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [debouncedSearchTerm, selectedCategory]);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <Container>
        <div className="pt-20 md:pt-28 lg:pt-40 pb-12">
          <h2 className="text-xl md:text-2xl lg:text-4xl font-semibold text-gray-800 text-left md:text-center">
            Search Recipe
          </h2>
          <p className="text-xs md:text-sm mt-2 text-left md:text-center text-gray-600 max-w-[80%] md:max-w-md md:mx-auto">
            Search for your favorite recipes, discover new ones, and share your
            own recipes with the world.
          </p>

          <InputSearchRecipe
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          <CategoryButtons
            selectedCategory={selectedCategory}
            handleCategoryClick={handleCategoryClick}
          />

          {isLoading ? (
            <div className="md:mt-12 mt-8 w-full max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-4 md:gap-x-8 md:gap-y-8 lg:gap-y-0">
              <SkeletonRecipeCardBySearch />
            </div>
          ) : data.length === 0 && !errorMessage ? (
            <div className="text-center text-gray-500 my-24 lg:my-12">
              <img
                src="/not-found.jpg"
                alt="notfound"
                className="mx-auto w-1/2 lg:w-1/4"
              />
              No Recipes found. Try searching with a different keyword.
            </div>
          ) : errorMessage ? (
            <div className="text-center text-gray-500 my-24 lg:my-12">
              <div className="flex flex-col items-center">
                <FiAlertCircle className="w-16 h-16 text-red-500 mb-4" />
                <p className="text-base font-medium">Recipes not available.</p>
                <button onClick={fetchData} className="flex items-center justify-center gap-2 px-4 py-2 mt-2.5 lg:mt-4 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500">
                  <FiRotateCcw className="w-5 h-5" />
                  Try Again
                </button>
              </div>
            </div>
          ) : (
            <ListSearchRecipe data={data} />
          )}
        </div>
      </Container>
      <Footer />
    </div>
  );
}
