import { Link } from "react-router-dom";
import backgroundHome from "../../../../assets/images/bg-home.jpeg";
import { IoSearch } from "react-icons/io5";

export default function HomeContent() {
  return (
    <div
      className="min-h-[85vh] relative"
      style={{
        backgroundImage: `url(${backgroundHome})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 lg:from-black/90 to-transparent"></div>

      <div className="relative z-10 text-white flex flex-col items-start justify-center min-h-[85vh] w-[80%] mx-auto">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold">
          Welcome to
        </h1>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">
          Vandra Kitchen
        </h1>
        <p className="mt-3 sm:mt-4 text-xs md:text-base lg:text-lg ml-1 sm:ml-2">
          Discover the best recipes for your next meal
        </p>
        <Link
          to={"/search"}
          className="mt-6 sm:mt-8 flex items-center bg-red-700 duration-300 ease-in-out hover:bg-red-800 py-2 px-4 lg:py-3 lg:px-8 text-[0.6rem] lg:text-base text-white font-semibold rounded-full"
        >
          <IoSearch className="mr-2 size-4 md:size-5 lg:size-6" />
          Find a Recipe
        </Link>
      </div>
    </div>
  );
}
