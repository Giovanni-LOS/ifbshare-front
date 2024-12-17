import axios from "axios";
import { create } from "zustand"

interface User {
    email: string;
    nickname?: string;
    password?: string;
    confirmPassword?: string;
}

interface AuthStore {
    register: (user: User) => Promise<{ success: boolean, message: string }>;
    login: (user: User) => Promise<{ success: boolean, message: string }>;
    logout: (user: User) => Promise<{ success: boolean, message: string }>;
}

export const useAuthStore = create<AuthStore>(() => ({
        register: async (user) => {
            try {
                const res = await axios.post("/api/auth/register", user)

                return res.data
            } catch (err: unknown) {
                if(axios.isAxiosError(err)) {
                    return { success: false, message: err.response?.data?.message || err.request }
                } else {
                    return { success: false, message: 'Registration failed' }
                }
            }
        },

        login: async (user) => {             
            try {
                const res = await axios.post("/api/auth/login", user)

                return res.data
            } catch (err: unknown) {
                if(axios.isAxiosError(err)) {
                    return { success: false, message: err.response?.data?.message || err.request }
                } else {
                    return { success: false, message: 'Registration failed' }
                }
            } 
        },
        logout: async () => {
            try {
                const res = await axios.get("/api/auth/logout")

                return res.data
            } catch (err: unknown) {
                if(axios.isAxiosError(err)) {
                    return { success: false, message: err.response?.data?.message || err.request }
                } else {
                    return { success: false, message: 'Registration failed' }
                }
            } 
        }
    })
);
