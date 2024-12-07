import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function RecipeNotFound() {
  const navigate = useNavigate();

  return (
    <div className="text-center min-h-screen flex flex-col items-center justify-center text-gray-700">
      <img
        src="/not-found.jpg"
        alt="notfound"
        className="mx-auto w-2/3 md:w-1/2 lg:w-1/4"
      />
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 lg:mb-6">
        Recipe Not Found
      </h1>
      <p className="text-gray-500 text-xs md:text-sm lg:text-lg">
        We couldn't find the recipe you're looking for.
      </p>
      <p className="text-gray-500 text-xs md:text-sm lg:text-lg mb-6 lg:mb-8">
        Maybe try searching for something else?
      </p>
      <button
        onClick={() => navigate("/search")}
        className="lg:text-base text-xs md:text-sm bg-gray-800 hover:bg-black flex justify-center items-center mx-auto gap-x-1.5 text-white font-medium py-2 px-4 lg:py-3 lg:px-6 rounded-lg transition duration-300"
      >
        <IoSearch />
        <span>Browse Recipes</span>
      </button>
    </div>
  );
}

export default RecipeNotFound;
