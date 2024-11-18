import axios, { AxiosError } from "axios";
import { baseUrl, getToken } from "../../../Auth/lib/action";


export const getListApprovedRecipe = async () => {
    try {
        const url = `${baseUrl}/list-recipe?status=approved`;
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${getToken()}`
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

export const deleteRecipe = async (id: string) => {
    try {
        const url = `${baseUrl}/recipes/${id}`;
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${getToken()}`
        }

        const res = await axios.delete(url, { headers }); 
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