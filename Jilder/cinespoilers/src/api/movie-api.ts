import axios from "axios";
import { API_CONFIG } from "./api-config";

export const movieApi = axios.create({
  baseURL: API_CONFIG.baseUrl,
  params: { api_key: API_CONFIG.apiKey, language: API_CONFIG.language },
  timeout: 12000,
});

movieApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(new Error(error.response?.data?.status_message || "No pudimos conectar con el catálogo.")),
);
