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
    downloadFile: (fileId: string) => Promise<{ success: boolean; message: string; data: Blob }>;
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
            return { success: false, message: "Failed to fetch files", data: "" };
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
            message: err.response?.data?.message || err.request,
            data: new Blob(),
            };
        } else {
            return { success: false, message: "Failed to download file", data: new Blob() };
        }
        }
    },
   
    }));