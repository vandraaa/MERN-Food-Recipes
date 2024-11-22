import axios, { AxiosError } from "axios";
import { baseUrl } from "../../../Auth/lib/action";


export const getDetailRecipe = async (id: string) => {
    try {
        const url = `${baseUrl}/recipes/${id}`;
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        }

        const res = await axios.get(url, { headers });
        return res.data
    } catch (error: AxiosError | any) {
        if (error.response) {
            return error.response.data;
        } else {
            console.log("Unexpected error:", error);
            throw new Error("An unexpected error occurred");
        } 
    }
}