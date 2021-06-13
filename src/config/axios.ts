import { navigate } from "@reach/router";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { STORAGE_KEY } from "./storage";

const statusUnauthorized = 401;
axios.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token: string | null = sessionStorage.getItem(STORAGE_KEY);
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
    let token: string | null;
    token = response.headers["x-jwt-token"];
    if (token) {
      sessionStorage.setItem(STORAGE_KEY, token);
    } else {
      sessionStorage.clear();
    }
    return response;
  },
  function (error) {
    if (error.response.data.installed === false) {
      navigate("/install/");
    } else if (error.response.statusCode === statusUnauthorized) {
      sessionStorage.clear();
      window.location.reload();
      return;
    }

    return Promise.reject(error);
  }
);
