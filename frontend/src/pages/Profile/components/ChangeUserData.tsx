import { useState } from "react";
import InputWithLabel from "../../../components/form/inputWithLabel";
import { updateUserDataSchema } from "../lib/validation";
import { useToast } from "../../../context/ToastContext";
import { updateUserData } from "../lib/action";
import Swal from "sweetalert2";
import { UserProfileType } from "../lib/type";

interface ChangeUserDataProps {
    formData: {
      email: string | undefined;
      name: string | undefined;
      currentPassword: string;
      newPassword: string;
    };
    setFormData: React.Dispatch<
      React.SetStateAction<{
        email: string | undefined;
        name: string | undefined;
        currentPassword: string;
        newPassword: string;
      }>
    >;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setUserData: React.Dispatch<React.SetStateAction<UserProfileType | null>>
  }

export default function ChangeUserData({ formData, setFormData, handleChange, setUserData }: ChangeUserDataProps) {
    const [loadingUpdate, setloadingUpdate] = useState(false);
    const [errors, setErrors] = useState({ name: "", email: "" });
    const { toastError } = useToast()

  const handleUpdateUserData = async () => {
    const validation = updateUserDataSchema.safeParse(formData);

    if (!validation.success) {
        const newErrors: { [key: string]: string } = {};
        validation.error.errors.forEach((error) => {
          newErrors[error.path[0]] = error.message;
        });
        setErrors(newErrors as { name: string; email: string });
        return;
    }

    setloadingUpdate(true);
    try {
        const newName = formData.name || "";
        const newEmail = formData.email || "";

        const res = await updateUserData(
            newName,
            newEmail,
        )

        if (res && res.status === "success") {
            Swal.fire({
                icon: "success",
                title: "success",
                text: "Update user data successfully",
                timer: 3000
            })            
            setFormData({ ...formData, name: newName, email: newEmail });
            setUserData((prevData) => ({
                ...prevData,
                name: newName,
                email: newEmail,
                role: prevData?.role || '',
                image: prevData?.image || { fileName: '', imageUrl: '' },
              }))
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: res.error.message,
            });
        }
    } catch (e) {
        toastError("Failed to update user data.")
        console.error("Error updating user data:", e)
    } finally {
        setloadingUpdate(false);
    }
  };

  return (
    <div className="p-5 max-w-lg">
      <h3 className="text-2xl font-semibold mb-6">Account Settings</h3>
      <div className="space-y-4">
        <div>
          <InputWithLabel
            labelText="Email"
            inputType="email"
            placeholder="Enter email"
            onChange={handleChange}
            value={formData.email || ""}
            error={errors.email}
            name="email"
          />
        </div>
        <div>
          <InputWithLabel
            labelText="Name"
            inputType="text"
            placeholder="Enter name"
            onChange={handleChange}
            value={formData.name || ""}
            error={errors.name}
            name="name"
          />
        </div>
        <button
          onClick={() => {
            handleUpdateUserData();
          }}
          disabled={loadingUpdate}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          {loadingUpdate ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  );
}
