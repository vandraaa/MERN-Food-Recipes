import { Link } from "react-router-dom";
import Container from "../../components/container/Container";

export default function PageNotFound() {
  return (
    <div className="w-full min-h-screen bg-slate-200 flex justify-center items-center">
      <Container className="flex flex-col items-center">
        <h1 className="text-xl md:text-2xl lg:text-4xl font-semibold text-gray-400">Ooops....</h1>
        <p className="mt-2 text-2xl lg:text-5xl font-bold text-gray-800">
          404 - Page not found
        </p>
        <p className="mt-2 mb-6 lg:mt-6 lg:mb-12 text-xs sm:text-base lg:text-xl w-full sm:w-[80%] lg:w-[55%] font-semibold text-slate-500 text-center">
          This page you are looking for doesn't exit or an other error occured,
          go back to home page
        </p>
        <Link
          to={"/"}
          className="bg-black py-2 px-3 lg:py-3 lg:px-6 text-xs lg:text-base text-white font-semibold rounded-lg"
        >
          Go Back
        </Link>
      </Container>
    </div>
  );
}
