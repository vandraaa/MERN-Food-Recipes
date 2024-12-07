import axios, { AxiosError } from "axios";
import { baseUrl, getToken } from "../../../Auth/lib/action";

export const getCommentByRecipeId = async (id: string) => {
    try {
        const url = `${baseUrl}/recipes/feedback/${id}`;
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



export const createNewComment = async ({ recipeId, rating, comment }: { recipeId: string, rating: number, comment: string }) => {
    try {
        const url = `${baseUrl}/recipes/feedback`;
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${getToken()}`
        }
        const body = {
            recipeId,
            rating,
            comment
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

export const deleteComment = async (id: string) => {
    try {
        const url = `${baseUrl}/recipes/feedback/${id}`;;
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