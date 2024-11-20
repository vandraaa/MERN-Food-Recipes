import axios, { AxiosError } from "axios";
import { baseUrl, getToken } from "../../../Auth/lib/action";

export interface formDataCreateRecipe {
    title: string;
    categoryId: string; 
    description: string;
    servings: Number | string;
    cookingTime: Number | string;
    image: File | null;
  }

export const createNewRecipe = async (formData: formDataCreateRecipe) => {
    try {
        const url = `${baseUrl}/recipes`;
        const headers = {
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${getToken()}`,
            "Content-Type": "multipart/form-data",
        }
        const res = await axios.post(url, formData, { headers });
        return res.data;
    } catch (error: AxiosError | any) {
        if (error.response) {
            return error.response.data;
        } else {
            console.log("Unexpected error:", error);
            throw new Error("An unexpected error occurred");
        }
    }
}