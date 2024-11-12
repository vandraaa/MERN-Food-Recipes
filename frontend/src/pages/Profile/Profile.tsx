import { useEffect, useState } from "react";
import { UserProfileType } from "./lib/type";
import ProfileSkeleton from "./skeleton/ProfileSkeleton";
import { getUserData } from "../Auth/lib/action";
import MenuProfile from "./components/MenuProfile";
import PhotoProfile from "./components/PhotoProfile";
import ChangePasswordUser from "./components/ChangePasswordUser";
import ChangeUserData from "./components/ChangeUserData";

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserProfileType | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    email: userData?.email,
    name: userData?.name,
    currentPassword: "",
    newPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  if (loading) return <ProfileSkeleton />;

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen p-4 md:p-8">
      <aside className="md:w-1/4 bg-white rounded-lg shadow-md p-4 mb-4 md:mb-0 md:mr-4">
        <div className="relative text-center">
          <PhotoProfile userData={userData} setUserData={setUserData} />
          <h2 className="text-xl font-semibold">{userData?.name}</h2>
          <p className="text-gray-500 font-medium text-sm">{userData?.role !== "user" && userData?.role.toUpperCase()}</p>
        </div>
        <MenuProfile activeTab={activeTab} setActiveTab={setActiveTab} setUserData={setUserData} />
      </aside>

      <section className="flex-1 bg-white rounded-lg shadow-md p-4">
        {activeTab === "profile" && (
          <ChangeUserData formData={formData} setFormData={setFormData} handleChange={handleChange} setUserData={setUserData} />
        )}

        {activeTab === "password" && (
          <ChangePasswordUser formData={formData} setFormData={setFormData} handleChange={handleChange} />
        )}
      </section>
    </div>
  );
}
