import { CgProfile } from "react-icons/cg";
import { FaKey } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useToast } from "../../../context/ToastContext";
import { useAuth } from "../../../context/AuthContext";
import { UserProfileType } from "../lib/type";

interface MenuProfileProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  setUserData: React.Dispatch<React.SetStateAction<UserProfileType | null>>;
}

export default function MenuProfile({ activeTab, setActiveTab, setUserData }: MenuProfileProps) {
    const navigate = useNavigate();
    const { toastSuccess } = useToast()
    const { logoutContext } = useAuth();

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
            setUserData(null);
            navigate("/sign-in");
            toastSuccess("Logout successfully");
          }
        });
      };

  return (
    <nav className="mt-6">
      <ul>
        <li>
          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full flex gap-x-2 items-center text-sm sm:text-base font-medium text-left px-4 py-2 rounded-lg ${
              activeTab === "profile"
                ? "bg-blue-500 text-white"
                : "text-gray-700"
            }`}
          >
            <CgProfile />
            Profile Details
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab("password")}
            className={`w-full flex gap-x-2 items-center text-sm sm:text-base font-medium text-left px-4 py-2 mt-2 rounded-lg ${
              activeTab === "password"
                ? "bg-blue-500 text-white"
                : "text-gray-700"
            }`}
          >
            <FaKey />
            Change Password
          </button>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="w-full flex gap-x-2 items-center text-sm sm:text-base text-left px-4 py-2 mt-2 rounded-lg text-red-500 font-medium"
          >
            <FiLogOut />
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
