import axios from "@/utils/axios";
import { create } from "zustand";
import { Post } from "./post";

export interface UserProfile {
  _id: string;
  email: string;
  nickname: string;
  picture?: any;
  degree?: string;
  verified?: boolean;
}

export interface UpdateUserProfile extends Omit<UserProfile, 'email' | 'verified' | '_id'>{}


export interface UserProfileStore {
  user: UserProfile;
  loggedIn: boolean;
  getUserProfile: () => Promise<{
    success: boolean;
    message: string;
  }>;
  updateUserProfile: (UpdatedUser: UpdateUserProfile) => Promise<{
    success: boolean;
    message: string;
    data: UserProfile;
  }>;
  getUserById: (id: string) => Promise<{
    success: boolean;
    data: UserProfile;
    message: string;
  }>;
  getUserPostsById: (id: string) => Promise <{
    success:boolean;
    message: string;
    data: Post[];
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
      if (res.data.success) {
        set(() => ({
          user: res.data.data,
          loggedIn: true,
        }));
      }

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
  updateUserProfile: async (UpdatedUser) => {
    try {
      const formData = new FormData();
      formData.append("nickname", UpdatedUser.nickname);
      formData.append("degree", UpdatedUser.degree || "");
      formData.append("file", UpdatedUser.picture || "");

      const res = await axios.put("/api/users/profile/settings", formData);

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
  },
  getUserPostsById: async (id) => {
    try {
      const res = await axios.get(`/api/users/profile/id/${id}/posts`);

      return res.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return {
          success: false,
          message: err.response?.data?.message || err.request,
        };
      } else {
        return { success: false, message: "Failed to get posts", data: "" };
      }
    } 
  }
}));
