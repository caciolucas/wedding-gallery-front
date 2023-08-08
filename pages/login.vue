<template>
  <div class="min-w-full p-4 flex justify-end mb-8">
    <NuxtLink
      as="a"
      class="bg-green-500 text-white hover:bg-green-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium hover:transition-all flex"
      href="/"
    >
      <ArrowLeftCircleIcon class="h-6 w-6 mr-2" aria-hidden="true" />
      Voltar para galeria
    </NuxtLink>
  </div>
  <div class="mt-10 flex flex-col min-w-full items-center">
    <div>
      <label
        for="username"
        class="block text-sm font-medium leading-6 text-gray-900"
      >
        Usuário
      </label>
      <div class="mt-2">
        <div
          class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
        >
          <input
            type="text"
            name="username"
            id="username"
            autocomplete="username"
            class="block flex-1 border-0 bg-transparent py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            v-model="username"
          />
        </div>
      </div>
    </div>
    <div>
      <label
        for="password"
        class="block text-sm font-medium leading-6 text-gray-900 mt-4"
      >
        Senha
      </label>
      <div class="mt-2">
        <div
          class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
        >
          <input
            type="password"
            name="password"
            id="password"
            autocomplete="password"
            class="block flex-1 border-0 bg-transparent py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            v-model="password"
          />
        </div>
      </div>
    </div>
    <div class="mt-2">
      <span class="text-red-700">{{ message }}</span>
    </div>
    <div>
      <button
        class="block rounded-md px-3 py-2 text-base font-medium hover:transition-all flex mt-8"
        :class="{
          'bg-green-500 text-white hover:bg-green-700 hover:text-white':
            enabled,
          'bg-gray-500 text-white cursor-default': !enabled,
        }"
        :disable="!enabled"
        @click="login"
      >
        <ArrowRightOnRectangleIcon class="h-6 w-6 mr-2" aria-hidden="true" />
        Entrar
      </button>
    </div>
  </div>
</template>

<script>
import {
  ArrowLeftCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/vue/24/solid";
import { useToast } from "vue-toastification";

export default {
  components: {
    ArrowLeftCircleIcon,
    ArrowRightOnRectangleIcon,
  },
  data() {
    return {
      username: "",
      password: "",
      toast: useToast(),
    };
  },
  computed: {
    enabled() {
      return !!this.username && !!this.password;
    },
  },
  methods: {
    async login() {
      this.$api
        .post("http://35.168.27.195/wedding-gallery/api/v1/token/", {
          username: this.username,
          password: this.password,
        })
        .then(({ data }) => {
          window.localStorage.setItem("@wedding-gallery/token", data.access);
          this.toast.success("Login realizado com sucesso.", {
            position: "bottom-center",
            timeout: 5000,
            pauseOnFocusLoss: true,
            showCloseButtonOnHover: false,
          });
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
          this.toast.error("Usuário ou senha inválidos.");
        });
    },
  },
};
</script>
