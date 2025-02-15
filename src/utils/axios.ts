import axios from "axios";
import { globalRouter } from "./globalRouter";
import { toaster } from "@/components/ui/toaster";

// Define se as requisições devem enviar credenciais
axios.defaults.withCredentials = true;

// Configura o baseURL usando a variável de ambiente ou fallback para localhost
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
axios.defaults.baseURL = API_URL;

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { status } = error.response;

            if (status === 401 || status === 403) {
                toaster.create({ description: error.response?.message, title: 'Error', type: "error" });
                globalRouter.navigate?.("/login");
            }
        }
        return Promise.reject(error);
    }
);

export default axios;
