import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
    withCredentials: true
})

export async function getSong({ mood }) {
    const response = await api.get("/api/songs", {
        params: { mood }
    })

    return response.data
}
