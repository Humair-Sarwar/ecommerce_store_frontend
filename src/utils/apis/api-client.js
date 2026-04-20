import axios from "axios";

import nprogress from "nprogress";
import "nprogress/nprogress.css";

nprogress.configure({ showSpinner: false });

// Create axios instance
export const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: false,
});

// Attach token dynamically before every request
apiAuth.interceptors.request.use((config) => {
  nprogress.start();
  const token = localStorage.getItem("token"); // get the latest token
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  nprogress.done();
  return Promise.reject(error);
});


apiAuth.interceptors.response.use((response) => {
  nprogress.done();
  return response;
}, (error) => {
  nprogress.done();
  return Promise.reject(error);
});

export const apiPublic = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
});