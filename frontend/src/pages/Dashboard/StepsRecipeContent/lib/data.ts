import axios, { AxiosError } from "axios";
import { baseUrl, getToken } from "../../../Auth/lib/action";

export const createSteps = async (id: string, instruction: string) => {
    try {
        const url = `${baseUrl}/recipe/steps/${id}`;
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${getToken()}`
        }

        const body = {
            instruction
        };

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

export const updateSteps = async (id: string, instruction: string) => {
    try {
        const url = `${baseUrl}/recipe/steps/${id}`;
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${getToken()}`
        }

        const body = {
            instruction
        };

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

export const getAllSteps = async (id: string) => {
    try {
        const url = `${baseUrl}/recipe/steps/${id}`;
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

export const deleteSteps = async (id: string) => {
    try {
        const url = `${baseUrl}/recipe/steps/${id}`;
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${getToken()}`
        }

        const res = await axios.delete(url, { headers });
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