import axios, { AxiosError } from "axios";

export const baseUrl = 'http://localhost:5000/api';

export const signInUser = async (email: string, password: string) => {
    try {
        const url = `${baseUrl}/auth/login`;
        const body = {
            email,
            password
        }
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        }

        const res = await axios.post(url, body, { headers })
        return res
    } catch (error: AxiosError | any) {
        if (error.response) {
            return error.response.data;
        } else {
            console.log("Unexpected error:", error);
            throw new Error("An unexpected error occurred");
        }
    }
}

export const signUpUser = async (name: string, email: string, password: string) => {
    try {
        const url = `${baseUrl}/auth/register`;
        const body = {
            name,
            email,
            password
        }
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        }

        const res = await axios.post(url, body, { headers })
        return res
    } catch (error: AxiosError | any) {
        if (error.response) {
            return error.response.data;
        } else {
            console.log("Unexpected error:", error);
            throw new Error("An unexpected error occurred");
        }
    }
}

export const saveToken = (token: string, storageType: "local" | "session" = "local") => {
    if (storageType === "local") {
        localStorage.setItem("authToken", token);
    } else if (storageType === "session") {
        sessionStorage.setItem("authToken", token);
    }
};

export const getToken = () => {
    return localStorage.getItem("authToken");
}

export const getUserData = async () => {
    try {
        const url = `${baseUrl}/users-detail`;
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${getToken()}`
        }

        const res = await axios.get(url, { headers });

        return res.data.data;
    } catch (error: AxiosError | any) {
        if (error.response) {
            return error.response.data;
        } else {
            console.log("Unexpected error:", error);
            throw new Error("An unexpected error occurred");
        }
    }
}
