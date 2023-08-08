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
            v-if="authenticated"
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

<script setup>
import { ArrowLeftCircleIcon } from "@heroicons/vue/24/solid";
import { computed } from "vue";

// Fetch the pictures from the API

const { data: pictures } =
  typeof window !== "undefined"
    ? await useFetch(
        "http://35.168.27.195/wedding-gallery/api/v1/pictures/?approved=false",
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              "@wedding-gallery/token"
            )}`,
          },
        }
      )
    : { data: [] };

// Export the components for template usage
const components = {
  ArrowLeftCircleIcon,
};

const authenticated = computed(() => {
  if (typeof window !== "undefined") {
    return !!window.localStorage.getItem("@wedding-gallery/token");
  }
  return false;
});
const approve = async (id) => {
  const { data } = await useFetch(
    `http://35.168.27.195/wedding-gallery/api/v1/pictures/${id}/`,
    {
      method: "PATCH",
      body: JSON.stringify({
        approved: true,
      }),
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem(
          "@wedding-gallery/token"
        )}`,
      },
    }
  );
  if (data) {
    pictures.value = pictures.value.filter((picture) => picture.id !== id);
  }
};
</script>
