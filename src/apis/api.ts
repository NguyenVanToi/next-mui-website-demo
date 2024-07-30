import axios from "axios";

import { IError } from "@/interfaces/http.interface";
import { LocalStorageKey } from "@/interfaces/storage.interface";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`, // Set this in your .env file
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LocalStorageKey.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log("error :>> ", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log("error response :>> ", error.response);
    return Promise.reject({
      statusCode: error.response.status,
      message:
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!",
    } as IError);
  }
);

export default api;
