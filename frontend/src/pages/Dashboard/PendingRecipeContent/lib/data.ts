import axios, { AxiosError } from "axios";
import { baseUrl, getToken } from "../../../Auth/lib/action";


export const getListPendingRecipe = async () => {
    try {
        const url = `${baseUrl}/list-recipe?status=pending`;
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

export const updateStatusRecipe = async (id: string, status: 'approved' | 'rejected' | 'pending') => {
    try {
        const url = `${baseUrl}/update-status-recipe`;
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${getToken()}`
        }
        const body = {
            recipeId: id,
            status
        }

        const res = await axios.post(url, body, { headers }); 
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