import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          // const tokenByMe =
          //   user.accessToken || user.stsTokenManager.accessToken;
          const tokenByGPT = await user.getIdToken(true);
          config.headers.Authorization = `Bearer ${tokenByGPT}`;
        }
        return config;
      }
    );

    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log("Axios error:", error);

        const statusCode = error.response?.status || error.status;
        console.log("Status code:", statusCode);

        if (statusCode === 401 || statusCode === 403) {
          console.log("Unauthorized/Forbidden - logging out");
          logOutUser().then(() => {
            navigate("/login");
          });
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOutUser, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
