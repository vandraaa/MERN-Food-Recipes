import { useState } from "react";
import { TbCameraPlus } from "react-icons/tb";
import { updatePhotoProfileUser } from "../lib/action";
import { UserProfileType } from "../lib/type";
import { saveToken } from "../../Auth/lib/action";

interface PhotoProfileProps {
    userData: UserProfileType | null;
    setUserData: React.Dispatch<React.SetStateAction<UserProfileType | null>>;
}

export default function PhotoProfile({ userData, setUserData }: PhotoProfileProps) {
    const [uploading, setUploading] = useState(false); 

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
          saveToken(image.token, 'local');
        }
      } catch (error) {
        console.log("Error uploading photo:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="relative w-24 h-24 mx-auto mb-4">
      {uploading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-300 bg-opacity-75 rounded-full">
          <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-8 h-8 animate-spin"></div>
        </div>
      ) : (
        <img
          src={
            userData?.image ? userData.image.imageUrl : "/default-profile.jpg"
          }
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
  );
}
