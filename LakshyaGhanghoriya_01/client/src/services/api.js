import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api",
  withCredentials: true,
});

// REQUEST INTERCEPTOR

api.interceptors.request.use(
  (config) => {

    const token =
      localStorage.getItem("token");

    if (
      token &&
      token !== "undefined" &&
      token !== "null"
    ) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;

  },

  (error) => {
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR

api.interceptors.response.use(

  (response) => response,

  (error) => {

    const status =
      error?.response?.status;

    // TOKEN EXPIRED / INVALID

    if (status === 401) {

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );

      // prevent redirect loop

      if (
        window.location.pathname !==
        "/login"
      ) {

        window.location.href =
          "/login";

      }

    }

    // FORBIDDEN ACCESS

    if (status === 403) {

      console.log(
        "Access forbidden."
      );

    }

    // SERVER ERROR

    if (status === 500) {

      console.log(
        "Internal server error."
      );

    }

    return Promise.reject(error);

  }
);

export default api;