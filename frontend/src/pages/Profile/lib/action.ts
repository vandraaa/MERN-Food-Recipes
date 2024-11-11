import axios, { AxiosError } from "axios";
import { baseUrl, getToken } from "../../Auth/lib/action";
import Swal from "sweetalert2";

export const updatePhotoProfileUser = async (file: File) => {
  try {
    const url = `${baseUrl}/changes-photo`;
    const formData = new FormData();
    formData.append("image", file);

    const headers = {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      "Authorization": `Bearer ${getToken()}`
    };

    const res = await axios.patch(url, formData, { headers });
    const response = {
      fileName: res.data.data.image.fileName,
      imageUrl: res.data.data.image.imageUrl
    };
    return response;
  } catch (e) {
    console.error("Error uploading photo:", e);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Error uploading photo",
    })
  }
};

export const updateUserData = async (name: string, email: string, password: string) => {
    try {
        const url = `${baseUrl}/users`;
        const body = {
            name,
            email,
            password
        }
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${getToken()}`
        };

        const res = await axios.patch(url, body, { headers });

        return res;
    } catch (error: AxiosError | any) {
        if (error.response) {
            return error.response.data;
        } else {
            console.log("Unexpected error:", error);
            throw new Error("An unexpected error occurred");
        }
    }
}

export const changesNewPassword = async (oldPassword: string, newPassword: string) => {
    try {
        const url = `${baseUrl}/changes-password`;
        const body = {
            oldPassword,
            newPassword
        };
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${getToken()}`
        };

        const res = await axios.patch(url, body, { headers });

        return res.data
    } catch (error: AxiosError | any) {
        if (error.response) {
            return error.response.data;
        } else {
            console.log("Unexpected error:", error);
            throw new Error("An unexpected error occurred");
        }
    }
};
