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
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-8 mx-auto"
    style="max-width: 1280px"
  >
    <div
      v-for="picture in pictures"
      :key="picture"
      class="rounded overflow-hidden shadow-lg mx-auto w-full h-80 flex flex-col justify-between"
    >
      <img
        class="min-h-1/2 w-full object-cover h-40"
        :src="picture.image"
        :alt="picture.description"
      />
      <div>
        <div class="px-6 py-4">
          <p class="text-gray-700 text-base">
            {{ picture.description }}
          </p>
        </div>
        <div class="px-6 pt-4 pb-2 flex justify-end mb-2 flex justify-between">
          <button
            v-if="authStore.isLoggedIn"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            @click="() => approve(picture.id)"
          >
            Aprovar
          </button>
          <div>
            <span class="mr-2"> Enviado por </span>
            <span
              class="inline-block whitespace-nowrap rounded-md bg-green-100 px-2 py-1 text-center align-top text-sm font-bold leading-none text-green-700"
            >
              {{ picture.uploaded_by }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ArrowLeftCircleIcon } from "@heroicons/vue/24/solid";
import { useAuthStore } from "~~/stores/auth";

export default {
  components: {
    ArrowLeftCircleIcon,
  },
  data() {
    return {
      pictures: [],
      authStore: useAuthStore(),
    };
  },
  methods: {
    fetchPictures() {
      this.$api
        .get(
          "http://35.168.27.195/wedding-gallery/api/v1/pictures/?approved=false"
        )
        .then(({ data }) => {
          this.pictures = data;
        });
    },
    approve(id) {
      this.$api
        .patch(`http://35.168.27.195/wedding-gallery/api/v1/pictures/${id}/`, {
          approved: true,
        })
        .then((response) => {
          this.pictures = this.pictures.filter((picture) => picture.id !== id);
          console.log(response);
        });
    },
  },
  created() {
    this.fetchPictures();
  },
};
</script>
