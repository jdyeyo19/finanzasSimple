import axios from "axios";
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from "../../services/authservice";


//instanci de axios
export const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/financial",
}
)
//Request interceptor
axiosInstance.interceptors.request.use(

    (config) => {

        const access = getAccessToken();

        if (access) {

            config.headers.Authorization =
                `Bearer ${access}`;
        }

        return config;
    },

    (error) => Promise.reject(error)
);
//Response interceptor
axiosInstance.interceptors.response.use(
    // success
    (response) => response,
    // error
    async (error) => {

        const originalRequest = error.config;
        // access token expirado
        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {

            originalRequest._retry = true;

            try {

                const refresh = getRefreshToken();

                const response = await axios.post(
                    "http://127.0.0.1:8000/api/financial/token/refresh",
                    {
                        refresh,
                    }
                );

                const newAccess = response.data.access;

                setTokens(newAccess, refresh);

                originalRequest.headers.Authorization =
                    `Bearer ${newAccess}`;

                return axiosInstance(originalRequest);

            } catch (err) {

                clearTokens();

                window.location.href = "/login";

                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);