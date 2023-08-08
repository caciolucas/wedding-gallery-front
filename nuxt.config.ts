// nuxt.config.{js,ts}
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
  plugins: ["~/plugins/toast.js"],
  build: {
    transpile: ["vue-toastification"],
  },
  app: {
    baseURL: process.env.SUB_PATH || "/",
  },
});
