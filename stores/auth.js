import { defineStore } from "pinia";
import axios from "~/plugins/axios";

const $api = axios().provide.api;

export const useAuthStore = defineStore("auth", {
  state: () => ({
    username: "",
    accessToken: "",
    isLoggedIn: false,
  }),
  actions: {
    async login(username, password) {
      await $api
        .post("http://localhost:8000/api/v1/token/", {
          username: username,
          password: password,
        })
        .then(({ data }) => {
          console.log(data);
          localStorage.setItem("@wedding-gallery/token", data.access);
          this.$state.accessToken = data.access;
          this.$state.username = username;
          this.$state.isLoggedIn = true;
        });
      return this.$state.isLoggedIn;
    },

    async logout() {
      this.resetState();
    },

    resetState() {
      this.$state.username = "";
      this.$state.accessToken = "";
      this.$state.isLoggedIn = false;
    },
  },
  persist: true,
});
