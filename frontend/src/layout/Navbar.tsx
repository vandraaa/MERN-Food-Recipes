import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Container from "../components/container/Container";
import { MdLogout, MdSpaceDashboard } from "react-icons/md";
import { IoPersonCircleSharp } from "react-icons/io5";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import { useToast } from "../context/ToastContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { logoutContext, role, user, setUser } = useAuth();
  const { toastSuccess } = useToast();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        logoutContext();
        setUser("");
        setMenuOpen(false);
        toastSuccess("Logout successfuly");    
      }
    })
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

          <div className="relative" ref={menuRef}>
            {user ? (
              <div
                className="flex items-center gap-x-2 cursor-pointer"
                onClick={toggleMenu}
              >
                <div className="flex flex-col text-right">
                  <span className="text-[8px] sm:text-xs text-gray-600">
                    Welcome back
                  </span>
                  <span className="text-[10px] sm:text-sm font-semibold">
                    {user.name}
                  </span>
                </div>
                <img
                  src={
                    user.profileImage
                      ? user.profileImage
                      : "/default-profile.jpg"
                  }
                  alt="Profile"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                />
              </div>
            ) : (
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
            )}

            {menuOpen && user && (
              <div className="absolute right-0 mt-2 w-32 md:w-40 bg-white rounded-lg shadow-lg py-2">
                <Link
                  to="/profile"
                  className="block text-xs sm:text-sm px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="flex items-center gap-x-2">
                    <IoPersonCircleSharp /> Profile
                  </div>
                </Link>
                {role !== "user" && (
                  <Link
                    to="/dashboard"
                    className="block text-xs sm:text-sm px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="flex items-center gap-x-2">
                      <MdSpaceDashboard /> Dashboard
                    </div>
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block text-xs sm:text-sm w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <div className="flex items-center gap-x-2">
                    <MdLogout /> Logout
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
