// nuxt.config.{js,ts}
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
  plugins: ["~/plugins/toast.js"],
  build: {
    transpile: ["vue-toastification"],
  },
});
