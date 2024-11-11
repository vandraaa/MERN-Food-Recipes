import { useEffect, useState } from "react";
import { UserProfileType } from "./lib/type";
import InputWithLabel from "../../components/form/inputWithLabel";
import { changesNewPassword, updatePhotoProfileUser } from "./lib/action";
import { CgProfile } from "react-icons/cg";
import { FaKey } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import Swal from "sweetalert2";
import ProfileSkeleton from "./skeleton/ProfileSkeleton";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../Auth/lib/action";
import { TbCameraPlus } from "react-icons/tb";
import { changePasswordSchema } from "./lib/validation";

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserProfileType | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [uploading, setUploading] = useState(false); 
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    email: userData?.email,
    name: userData?.name,
    currentPassword: "",
    newPassword: ""
  });
  const [errors, setErrors] = useState<{ name?: string, email?: string, currentPassword?: string, newPassword?: string }>({});
  const navigate = useNavigate();
  const { logoutContext } = useAuth();
  const { toastSuccess, toastError } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getUserData();
        setUserData(data);
        setFormData({
          email: data.email,
          name: data.name,
          currentPassword: "",
          newPassword: "",
        });
      } catch (error) {
        console.log("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const handleChangePassword = async () => {
    const validation = changePasswordSchema.safeParse(formData);

    if (!validation.success) {
      const newErrors: { [key: string]: string } = {};
      validation.error.errors.forEach(error => {
        newErrors[error.path[0]] = error.message;
      });
      setErrors(newErrors);
      return;
    }

    setLoadingPassword(true);
    try {
      const res = await changesNewPassword(formData.currentPassword, formData.newPassword);
      if (res && res.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res.message,
          timer: 3000
        })
        setFormData({ ...formData, currentPassword: "", newPassword: "" });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: res.error.message,
        })
      }
    } catch (error) {
      toastError("Failed to update password.");
      console.error("Error updating password:", error);
    } finally {
      setLoadingPassword(false);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        const image = await updatePhotoProfileUser(file);
        if (image) {
          setUserData((prevData) => ({
            ...prevData,
            image: { imageUrl: image.imageUrl, fileName: image.fileName },
            name: prevData?.name || "",
            email: prevData?.email || "",
            role: prevData?.role || "",
          }));
        }
      } catch (error) {
        console.log("Error uploading photo:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  if (loading) return <ProfileSkeleton />;

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen p-4 md:p-8">
      <aside className="md:w-1/4 bg-white rounded-lg shadow-md p-4 mb-4 md:mb-0 md:mr-4">
        <div className="relative text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            {uploading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-300 bg-opacity-75 rounded-full">
                <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-8 h-8 animate-spin"></div>
              </div>
            ) : (
              <img
                src={userData?.image ? userData.image.imageUrl : "/default-profile.jpg"}
                alt={userData?.name}
                className="w-24 h-24 rounded-full mx-auto"
              />
            )}
            <label
              htmlFor="photo-upload"
              className="absolute bottom-1 right-1 bg-black text-white p-1 rounded-full cursor-pointer"
            >
              <TbCameraPlus />
            </label>
            <input
              type="file"
              id="photo-upload"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </div>
          <h2 className="text-xl font-semibold">{userData?.name}</h2>
          <p className="text-gray-500">{userData?.role && userData.role.toUpperCase()}</p>
        </div>
        <nav className="mt-6">
          <ul>
            <li>
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex gap-x-2 items-center text-sm sm:text-base font-medium text-left px-4 py-2 rounded-lg ${
                  activeTab === "profile" ? "bg-blue-500 text-white" : "text-gray-700"
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
                  activeTab === "password" ? "bg-blue-500 text-white" : "text-gray-700"
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
      </aside>

      <section className="flex-1 bg-white rounded-lg shadow-md p-4">
        {activeTab === "profile" && (
          <div className="p-5 max-w-lg">
            <h3 className="text-2xl font-semibold mb-6">Account Settings</h3>
            <div className="space-y-4">
              <div>
                <InputWithLabel
                  labelText="Email"
                  inputType="email"
                  placeholder="Enter email"
                  value={formData.email || ""}
                  name="email"
                />
              </div>
              <div>
                <InputWithLabel
                  labelText="Name"
                  inputType="text"
                  placeholder="Enter name"
                  value={formData.name || ""}
                  name="name"
                />
              </div>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                Update Profile
              </button>
            </div>
          </div>
        )}

        {activeTab === "password" && (
          <div className="max-w-lg p-5">
            <h3 className="text-2xl font-semibold mb-6">Change Password</h3>
            <div className="space-y-4">
              <div>
                <InputWithLabel
                  labelText="Current Password"
                  inputType="password"
                  placeholder="Enter current password"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  error={errors.currentPassword}
                  name="currentPassword"
                />
              </div>
              <div>
                <InputWithLabel
                  labelText="New Password"
                  inputType="password"
                  placeholder="Enter new password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  error={errors.newPassword}
                  name="newPassword"
                />
              </div>
              <button
                onClick={handleChangePassword}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                disabled={loadingPassword}
              >
                {loadingPassword ? "Updating..." : "Update Password"}
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
