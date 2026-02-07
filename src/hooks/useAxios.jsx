import axios from 'axios';
import React from 'react';

const getBaseURL = () => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }

  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return "http://localhost:3000";
    }
  }

  return "https://zap-shift-server-hazel-beta.vercel.app";
};

const axiosInstance = axios.create({
  baseURL: getBaseURL(),
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;