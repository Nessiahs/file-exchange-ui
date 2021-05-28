import { navigate } from "@reach/router";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const key = process.env.REACT_APP_STORAGE_KEY ?? "exchange";
let token: string | null = sessionStorage.getItem(key);

axios.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    config.baseURL = process.env.REACT_APP_API_URI ?? "/";
    config.headers = {
      ...config.headers,
      "x-jwt-token": token,
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    token = response.headers["x-jwt-token"];
    if (token) {
      sessionStorage.setItem(key, token);
    } else {
      sessionStorage.removeItem(key);
    }
    return response;
  },
  function (error) {
    sessionStorage.removeItem(key);

    if (error.response.data.installed === false) {
      navigate("/install/");
    }

    return Promise.reject(error);
  }
);
