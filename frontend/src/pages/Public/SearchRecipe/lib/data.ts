import axios, { AxiosError } from "axios";
import { baseUrl } from "../../../Auth/lib/action";

export const searchRecipe = async (searchTerm: string, categoryId: string) => {
  try {
    const url = `${baseUrl}/search/recipes?q=${searchTerm}&categoryId=${categoryId}`;
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
