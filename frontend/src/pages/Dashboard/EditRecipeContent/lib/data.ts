import axios, { AxiosError } from "axios";
import { baseUrl, getToken } from "../../../Auth/lib/action";

export interface FormDataEditRecipe {
  title: string;
  category: {
    _id: string;
    name: string;
  };
  description: string;
  servings: number | string;
  cooking_time: number | string;
  image: File | null;
}

export const updateRecipe = async (id: string, data: FormDataEditRecipe) => {
  try {
    const url = `${baseUrl}/recipes/${id}`;
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Authorization": `Bearer ${getToken()}`,
      "Content-Type": "multipart/form-data",
    };

    const payload = {
      title: data.title,
      description: data.description,
      servings: data.servings,
      cookingTime: data.cooking_time,
      categoryId: data.category._id,
      image: data.image,
    };

    const res = await axios.patch(url, payload, { headers });
    return res.data;
  } catch (error: AxiosError | any) {
    if (error.response) {
      return error.response.data;
    } else {
      console.log("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};
