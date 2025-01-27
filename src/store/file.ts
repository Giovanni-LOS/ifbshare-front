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
    downloadFile: (fileId: string) => Promise<{ success: boolean; message: string; data: Blob|null}>;
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
    }, downloadFile : async (fileId: string) => {
        try {
            const response = await axios.get(`/download/${fileId}`, {
                responseType: "blob", // Garante que a resposta é tratada como blob
            });

            // Verifica se a resposta contém um blob válido
            if (!response.data || !(response.data instanceof Blob) || response.data.size === 0) {
                return {success: false, message: "Arquivo vazio ou inválido", data: null};
            }

            return {success: true, message: "", data: response.data}; // Retorna o blob diretamente
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                return {
                    success: false,
                    message: err.response?.data?.message || "Erro ao baixar o arquivo",
                    data: null,
                };
            }
            return {success: false, message: "Erro inesperado", data: null};
        }
    }
   
    }));