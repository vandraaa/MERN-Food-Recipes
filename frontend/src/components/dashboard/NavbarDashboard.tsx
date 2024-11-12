import { useState, useRef, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Swal from "sweetalert2";
import { useToast } from "../../context/ToastContext";
import { PayloadJWTType, useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { IoPersonCircleSharp } from "react-icons/io5";
import { MdLogout } from "react-icons/md";

interface NavbarDashboardProps {
  user: PayloadJWTType;
  role: string | null;
}

export default function NavbarDashboard({ user, role }: NavbarDashboardProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { toastSuccess } = useToast();
  const { logoutContext } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
        setIsDropdownOpen(false);
        navigate('/sign-in');
        toastSuccess("Logout successfuly");
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="py-4 sm:py-6 w-full bg-white rounded-md px-4 sm:px-8 flex justify-between items-center">
      <div>
        <p className="sm:text-base text-xs font-medium text-gray-800">
          Welcome, {user?.name}
        </p>
        <p className="sm:text-xs text-[9px] font-medium text-gray-500">
          You are logged in as {role?.toUpperCase()}
        </p>
      </div>
      <div className="flex gap-x-3 items-center relative" ref={dropdownRef}>
        <img
          src={user?.profileImage ?? "/default-profile.jpg"}
          alt="profile"
          className="w-8 h-8 rounded-full"
        />
        <p
          className="sm:text-xs text-[10px] font-semibold text-gray-800 cursor-pointer flex items-center gap-x-1"
          onClick={handleDropdownToggle}
        >
          {user?.name}
          <span>{isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
        </p>
        {isDropdownOpen && (
          <div className="absolute right-0 top-8 w-32 bg-white rounded-md shadow-lg z-10">
            <ul className="py-1">
              <li>
                <a
                  href="/profile"
                  className="px-4 font-medium py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 flex gap-x-1.5 items-center"
                >
                  <IoPersonCircleSharp />
                  Profile
                </a>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 font-medium py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 flex gap-x-1.5 items-center"
                >
                  <MdLogout />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
