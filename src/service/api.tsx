import axios from "axios";
import TokenService from "./token.service";

const { VITE_API_BASE_URL } = import.meta.env;

const instance = axios.create({
    baseURL: VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    (config) => {
        const token = TokenService.getLocalAccessToken();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// DEV NOTE: response interceptor is in AuthProvider's useEffect

export default instance;
