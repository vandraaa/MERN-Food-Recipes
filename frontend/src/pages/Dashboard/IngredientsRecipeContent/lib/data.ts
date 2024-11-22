import axios, { AxiosError } from "axios";
import { baseUrl, getToken } from "../../../Auth/lib/action";

export const createIngredients = async (id: string, name: string, quantity: string) => {
    try {
        const url = `${baseUrl}/recipes/ingredients/${id}`;
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${getToken()}`
        }

        const body = {
            name,
            quantity
        }

        const res = await axios.post(url, body, { headers });
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

export const updateIngredients = async (id: string, name: string, quantity: string) => {
    try {
        const url = `${baseUrl}/recipes/ingredients/${id}`;
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${getToken()}`
        }

        const body = {
            name,
            quantity,
        }

        const res = await axios.patch(url, body, { headers });
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

export const getIngredients = async (id: string) => {
    try {
        const url = `${baseUrl}/recipes/ingredients/${id}`;
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

export const deleteIngredients = async (id: string) => {
    try {
        const url = `${baseUrl}/recipes/ingredients/${id}`;
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