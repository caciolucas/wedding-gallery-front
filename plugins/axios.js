import axios from "axios";
export default defineNuxtPlugin((nuxtApp) => {
  let api = axios.create({
    headers: {
      common: {},
    },
  });

  api.interceptors.request.use((config) => {
    const token = window.localStorage.getItem("@wedding-gallery/token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return {
    provide: {
      api: api,
    },
  };
});
