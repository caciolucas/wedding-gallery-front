import axios from "axios";
export default defineNuxtPlugin((nuxtApp) => {
  let api = axios.create({
    headers: {
      common: {},
    },
  });

  if (process.client) {
    const token = window.localStorage.getItem("@wedding-gallery/token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
  }
  return {
    provide: {
      api: api,
    },
  };
});
