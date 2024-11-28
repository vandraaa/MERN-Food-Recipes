import axios, { AxiosError } from "axios";
import { baseUrl } from "../../../Auth/lib/action";

export interface TrendingRecipeType {
  id: string;
  user: {
    image: {
      fileName: string;
      imageUrl: string;
    };
    _id: string;
    name: string;
  };
  title: string;
  description: string;
  image: {
    fileName: string;
    imageUrl: string;
  };
  servings: number;
  cooking_time: number;
  category: {
    _id: string;
    name: string;
  };
}

export const getTrendingRecipe = async () => {
  try {
    const url = `${baseUrl}/trending-recipes`;
    const res = await axios.get(url);
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
