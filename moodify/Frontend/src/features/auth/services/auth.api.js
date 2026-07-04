import axios from "axios"

const apiBaseURL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? "http://localhost:3000" : "");

const api = axios.create({
    baseURL: apiBaseURL,
    withCredentials: true
})

export async function register({ email, password, username }) {
    const response = await api.post("/api/auth/register", {
        email, password, username
    })

    return response.data
}

export async function login({ email, username, password }) {
    const response = await api.post("/api/auth/login", {
        email, username, password
    })

    return response.data
}

export async function getMe() {
    const response = await api.get("/api/auth/get-me")
    return response.data
}

export async function logout() {
    const response = await api.get("/api/auth/logout")
    return response.data
}
