import axios from "@/utils/axios";
import { create } from "zustand";

export interface UserProfile {
  _id: string;
  email: string;
  nickname: string;
  picture?: File;
  degree?: string;
  verified?: boolean;
}


export interface UserProfileStore {
  user: UserProfile;
  loggedIn: boolean;
  getUserProfile: () => Promise<{
    success: boolean;
    message: string;
  }>;
  updateUserProfile: (user: Omit<UserProfile, 'email'>) => Promise<{
    success: boolean;
    message: string;
    data: UserProfile;
  }>;
  getUserById: (id: string) => Promise<{
    success: boolean;
    data: UserProfile;
    message: string;
  }>;
}

export const useUserProfileStore = create<UserProfileStore>((set) => ({
  user: {
    _id: "",
    email: "",
    nickname: "",
    picture: undefined,
    degree: "",
    verified: false,
  },
  loggedIn: false,
  getUserProfile: async () => {
    try {
      const res = await axios.get("/api/users/profile");

      set((state) => ({ 
        user: { ...state.user, ...res.data.data },
        loggedIn: true,
       }));


      return { success: res.data.success, message: res.data.message };
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return {
          success: false,
          message: err.response?.data?.message || err.request,
        };
      } else {
        return { success: false, message: "Failed to fetch user profile", data: "" };
      }
    }
  },
  updateUserProfile: async (user) => {
    try {
      const res = await axios.put("/api/users/profile/settings", user);

      set((state) => ({
        user: { ...state.user, ...res.data.data },
      }));

      return res.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return {
          success: false,
          message: err.response?.data?.message || err.request,
        };
      } else {
        return { success: false, message: "Failed to update user profile", data: "" };
      }
    }
  },
  getUserById: async (id) => {
    try {
      const res = await axios.get(`/api/users/profile/id/${id}`);
      return res.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return {
          success: false,
          message: err.response?.data?.message || err.request,
        };
      } else {
        return { success: false, message: "Failed to fetch user", data: "" };
      }
    }
  }
}));
