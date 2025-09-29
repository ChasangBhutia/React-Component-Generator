import axios from "axios";

const BASE_URL =
    import.meta.env.MODE === "production"
        ? import.meta.env.NEXT_PUBLIC_API_URL_PROD
        : import.meta.env.NEXT_PUBLIC_API_URL_DEV;

const api = axios.create({
    baseURL:`${BASE_URL}/api`,
    withCredentials:true,
})

export default api;