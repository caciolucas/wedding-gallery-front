// nuxt.config.{js,ts}
export default defineNuxtConfig({
  experimental: {
    payloadExtraction: false,
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  plugins: ["~/plugins/toast.js"],
  build: {
    transpile: ["vue-toastification"],
  },
  app: {
    baseURL: process.env.SUB_PATH || "/",
  },
});
