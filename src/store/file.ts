import axios from "@/utils/axios";
import { create } from "zustand";

export interface FileCustomMetaData {
  _id: string;
  name: string;
  size: string;
  contentType: string;
  createAt: string;
}

export interface FileCustom extends FileCustomMetaData {
  url: string;
}

interface FileCustomStore {
  getFilesMetaData: (postId: string) => Promise<{
    success: boolean;
    message: string;
    data: FileCustomMetaData[];
  }>;
  downloadFile: (fileId: string) => Promise<{
    success: boolean;
    message: string;
    data: Blob | null;
  }>;
  postFile: (postId: string, files: File[]) => Promise<{
    success: boolean;
    message: string;
  }>;
  deleteFile: (postId: string, fileId: string) => Promise<{
    success: boolean;
    message: string;
  }>;
}

export const useFileStore = create<FileCustomStore>(() => ({
  getFilesMetaData: async (postId: string) => {
    try {
      const res = await axios.get(`/api/files/${postId}`);
      return res.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return {
          success: false,
          message: err.response?.data?.message || err.request,
        };
      } else {
        return { success: false, message: "Failed to fetch files", data: [] };
      }
    }
  },

  downloadFile: async (fileId: string) => {
    try {
      const response = await axios.get(`/api/files/download/${fileId}`, {
        responseType: "blob",
      });
      return { success: true, message: "File downloaded", data: response.data };
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return {
          success: false,
          message: err.response?.data?.message || "Error downloading file",
          data: null,
        };
      }
      return { success: false, message: "Unexpected error", data: null };
    }
  },

  postFile: async (postId: string, files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });

    try {
      const res = await axios.post(`/api/files/${postId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return {
        success: res.data.success,
        message: res.data.message,
      };
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return {
          success: false,
          message: err.response?.data?.message || "Error uploading files",
          data: [],
        };
      }
      return { success: false, message: "Unexpected error uploading files", data: [] };
    }
  },

  deleteFile: async (postId: string, fileId: string) => {
    try {
      const res = await axios.delete(`/api/files/${postId}/${fileId}`);
      return {
        success: res.data.success,
        message: res.data.message,
      };
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return {
          success: false,
          message: err.response?.data?.message || "Error deleting file",
        };
      }
      return { success: false, message: "Unexpected error deleting file" };
    }
  },
}));
