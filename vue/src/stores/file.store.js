import { defineStore } from "pinia";
import { fetchWrapper } from "@/helpers";

const baseUrl = 'http://localhost:8000/api/';

export const useFileStore = defineStore("file", {
    state: () => ({
        files: [],
    }),
    actions: {
        async postFiles(formData) {
            return await fetchWrapper.post(baseUrl + 'files/upload', formData);
        }
    }
});