import { Link } from "react-router-dom";
import Container from "../components/container/Container";

export default function Navbar() {
  return (
    <Container className="fixed top-0 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white w-full py-2 px-4 md:px-8 rounded-full shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <Link to={"/"}>
              <img
                src="/logo-transparent.png"
                alt="logo"
                className="size-8 sm:size-12 xl:size-20"
              />
            </Link>
            <div className="flex flex-col">
              <h1 className="text-xs sm:text-sm xl:text-xl font-semibold leading-4 md:leading-5">
                Vandra Kitchen
              </h1>
              <p className="text-[8px] xl:text-xs font-medium text-gray-700">
                Discover New Deliciousness
              </p>
            </div>
          </div>
          <div>
            <div className="bg-[#85C226] px-3 py-2 sm:px-4 md:px-5 lg:px-8 lg:py-2 xl:py-3 rounded-full">
              <Link
                to={"/sign-in"}
                className="text-white font-semibold text-[10px] sm:text-xs lg:text-base flex items-center gap-x-2 lg:gap-x-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-log-in size-4 sm:size-5 lg:size-6"
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" x2="3" y1="12" y2="12" />
                </svg>
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
