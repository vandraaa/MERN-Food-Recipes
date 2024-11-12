import { useState } from "react";
import InputWithLabel from "../../../components/form/inputWithLabel";
import { useToast } from "../../../context/ToastContext";
import { changePasswordSchema } from "../lib/validation";
import { changesNewPassword } from "../lib/action";
import Swal from "sweetalert2";

interface ChangePasswordUserProps {
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
  }
  

export default function ChangePasswordUser({ formData, setFormData, handleChange }: ChangePasswordUserProps) {
    const { toastError } = useToast();
    const [errors, setErrors] = useState({ currentPassword: "", newPassword: "" });
    const [loadingPassword, setLoadingPassword] = useState(false);

  const handleChangePassword = async () => {
    const validation = changePasswordSchema.safeParse(formData);

    if (!validation.success) {
      const newErrors: { [key: string]: string } = {};
      validation.error.errors.forEach((error) => {
        newErrors[error.path[0]] = error.message;
      });
      setErrors(newErrors as { currentPassword: string; newPassword: string });
      return;
    }

    setLoadingPassword(true);
    try {
      const res = await changesNewPassword(
        formData.currentPassword,
        formData.newPassword
      );
      if (res && res.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res.message,
          timer: 3000,
        });
        setFormData({ ...formData, currentPassword: "", newPassword: "" });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: res.error.message,
        });
      }
    } catch (error) {
      toastError("Failed to update password.");
      console.error("Error updating password:", error);
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
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
  );
}
