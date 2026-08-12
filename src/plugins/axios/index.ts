import axios, { AxiosError, type AxiosResponse } from "axios";

export const $axios = axios.create({
  // Base URL
  baseURL: import.meta.env.VITE_SQL_API_BASE_URL,

  // Custom Headers
  headers: {
    "Content-Type": "application/json",
  },
});

$axios.interceptors.request.use(
  function (config) {
    // Access token
    const auth = sessionStorage.getItem("authToken") || localStorage.getItem("authToken");
    if (auth) {
      config.headers.Authorization = "Bearer " + auth;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

$axios.interceptors.response.use(
  function (config: AxiosResponse) {
    // Change the data
    return config.data;
  },
  function (error: AxiosError) {
    const code = error.response?.status as number;
    const data = error.response?.data as any;

    if (code === 503) {
      return Promise.reject(error);
    }

    if ([401].includes(code) && !window.location.pathname.includes("/login")) {
      sessionStorage.clear();
      window.location.href = "/login";
    }

    if ([301, 302].includes(code) && "redirect_url" in data) {
      const a: any = document.createElement("a");
      a.target = data.target || "_blank";
      a.href = data.redirect_url;
      a.click();
    }

    if (error.code === "ERR_CANCELED") {
      // When we manually cancel a request
      return Promise.resolve({ status: 499 });
    }

    return Promise.reject(error);
  }
);
