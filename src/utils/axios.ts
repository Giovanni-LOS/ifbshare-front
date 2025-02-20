import axios from "axios";
import { globalRouter } from "./globalRouter";
import { toaster } from "@/components/ui/toaster";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

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