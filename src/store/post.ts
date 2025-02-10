import axios from "@/utils/axios";
import { create } from "zustand";

export interface Post {
    _id: string;
    title: string;
    content?: string;
    tags?: string[];
    createdAt: string;
    updatedAt: string;
    author: string;
}

export interface PostCreated extends Omit<Post, "_id" | "createdAt" | "updatedAt"> {
    files?: File[];
}
export interface PostUpdated extends Omit<Post, "createdAt" | "updatedAt"> {
    files?: File[];
}


export interface PostStore {
    createPost: (post: PostCreated) => Promise<{
        success: boolean;
        message: string;
        data: PostCreated;
    }>;
    getPosts: () => Promise<{
        success: boolean;
        message: string;
        data: Post[];
    }>;
}

export const usePostStore = create<PostStore>(() => ({
        createPost: async (post) => {
          const formData = new FormData();
          formData.append("title", post.title);
          formData.append("content", post.content || "");
          formData.append("author", post.author);
          post.tags?.forEach((tag) => {
            formData.append("tags", tag);
          });
          post.files?.forEach((file) => {
            formData.append("file", file);
          });
            try {
                const res = await axios.post("/api/posts/", formData);

                return res.data;
              } catch (err: unknown) {
                if (axios.isAxiosError(err)) {
                  return {
                    success: false,
                    message: err.response?.data?.message || err.request,
                  };
                } else {
                  return { success: false, message: "Failed to create post", data: "" };
                }
              } 
        },
        getPosts: async () => {
            try {
                const res = await axios.get("/api/posts/");

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
