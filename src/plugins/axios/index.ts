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

function logoutAndRedirect() {
  sessionStorage.removeItem("authToken");
  localStorage.removeItem("authToken");
  window.location.href = "/login";
}

// Ensures concurrent 401s (multiple in-flight requests all expiring at once)
// share a single refresh call instead of each firing their own.
let refreshPromise: Promise<string | null> | null = null;

function refreshAuthToken(): Promise<string | null> {
  if (!refreshPromise) {
    refreshPromise = $axios
      .post("refresh-token")
      .then((res: any) => {
        const newToken = res?.access_token;
        if (!newToken) return null;

        // Preserve whichever storage was already holding the token.
        if (sessionStorage.getItem("authToken")) sessionStorage.setItem("authToken", newToken);
        if (localStorage.getItem("authToken")) localStorage.setItem("authToken", newToken);
        if (!sessionStorage.getItem("authToken") && !localStorage.getItem("authToken")) {
          sessionStorage.setItem("authToken", newToken);
          localStorage.setItem("authToken", newToken);
        }

        return newToken;
      })
      .catch(() => null)
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

$axios.interceptors.response.use(
  function (config: AxiosResponse) {
    // Change the data
    return config.data;
  },
  async function (error: AxiosError) {
    const code = error.response?.status as number;
    const data = error.response?.data as any;
    const originalRequest = error.config as (typeof error.config & { _retry?: boolean }) | undefined;

    if (code === 503) {
      return Promise.reject(error);
    }

    const isRefreshCall = originalRequest?.url?.includes("refresh-token");
    const onLoginPage = window.location.pathname.includes("/login");

    if (code === 401 && !onLoginPage) {
      // A 401 on the refresh call itself, or on a request we already retried
      // once after refreshing, means the token genuinely can't be salvaged —
      // fall back to a full re-auth instead of looping.
      if (isRefreshCall || originalRequest?._retry) {
        logoutAndRedirect();
        return Promise.reject(error);
      }

      if (originalRequest) {
        originalRequest._retry = true;
        const newToken = await refreshAuthToken();

        if (newToken) {
          return $axios(originalRequest);
        }
      }

      logoutAndRedirect();
      return Promise.reject(error);
    }

    if ([301, 302].includes(code) && data && typeof data === "object" && "redirect_url" in data) {
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
